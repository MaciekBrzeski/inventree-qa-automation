import { promises as fs } from 'node:fs';
import { join, resolve } from 'node:path';

const HERE = new URL('.', import.meta.url).pathname;
const VAULT_QA = resolve(HERE, '../../../docs/qa');
const JOURNAL_PATH = resolve(VAULT_QA, 'prompts-journal.md');
const CHUNKS_JSONL = resolve(HERE, 'chunks.jsonl');
const SUBMISSION_ROOT = resolve(HERE, '../..');
const LOGS_DIR = resolve(SUBMISSION_ROOT, 'agents/logs');

// Cloud LLM reference prices (USD per 1M tokens), 2026-04.
// Used only to estimate the cloud cost that would have been incurred.
const CLOUD_RATES = {
  'claude-opus-4-6': { input: 15.0, output: 75.0 },
  'claude-sonnet-4-6': { input: 3.0, output: 15.0 },
  'gpt-4o': { input: 2.5, output: 10.0 },
};

type Entry = {
  timestamp: string;
  task: string;
  durationMs?: number;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  model?: string;
  responseChars: number;
  retrievedCount: number;
};

function parseJournal(md: string): Entry[] {
  const entries: Entry[] = [];
  const parts = md.split(/^## /m).slice(1);
  for (const part of parts) {
    const header = part.split('\n')[0] ?? '';
    const [timestamp, taskPart] = header.split(' — ');
    const rawTask = (taskPart ?? '').trim();
    // Journal header format: "phase / task-name"
    const slashIdx = rawTask.lastIndexOf(' / ');
    const task = slashIdx >= 0 ? rawTask.slice(slashIdx + 3) : rawTask;
    if (!timestamp || !task) continue;

    const metricsLine = /^- metrics: (.+)$/m.exec(part);
    const metrics: Record<string, string> = {};
    if (metricsLine && metricsLine[1] && metricsLine[1] !== '(none)') {
      for (const kv of metricsLine[1].split(/\s+/)) {
        const [k, v] = kv.split('=');
        if (k && v) metrics[k] = v;
      }
    }

    const retrievedSection = /### Retrieved\n([\s\S]*?)\n###/.exec(part);
    const retrievedCount = retrievedSection
      ? (retrievedSection[1] ?? '').split('\n').filter((l) => l.trim().startsWith('- [')).length
      : 0;

    const responseBlock = /### Response\n```\n([\s\S]*?)\n```/.exec(part);
    const responseChars = responseBlock && responseBlock[1] ? responseBlock[1].length : 0;

    entries.push({
      timestamp: timestamp.trim(),
      task,
      durationMs: metrics.duration_ms ? parseInt(metrics.duration_ms, 10) : undefined,
      promptTokens: metrics.prompt_tokens ? parseInt(metrics.prompt_tokens, 10) : undefined,
      completionTokens: metrics.completion_tokens
        ? parseInt(metrics.completion_tokens, 10)
        : undefined,
      totalTokens: metrics.total_tokens ? parseInt(metrics.total_tokens, 10) : undefined,
      model: metrics.model,
      responseChars,
      retrievedCount,
    });
  }
  return entries;
}

function approxTokens(chars: number): number {
  return Math.ceil(chars / 4);
}

function fmtNumber(n: number): string {
  return n.toLocaleString('en-US');
}

function fmtCurrency(n: number): string {
  return `$${n.toFixed(n < 1 ? 4 : 2)}`;
}

async function countCases(): Promise<{ byFile: Record<string, number>; total: number }> {
  const byFile: Record<string, number> = {};
  try {
    const files = (await fs.readdir(VAULT_QA)).filter(
      (f) => f.startsWith('phase1-ui-') && f.endsWith('.md'),
    );
    for (const f of files) {
      const content = await fs.readFile(join(VAULT_QA, f), 'utf8');
      const matches = content.match(/^\| UI-PARTS-\d{3}/gm) ?? [];
      byFile[f] = matches.length;
    }
  } catch {
    /* none yet */
  }
  const total = Object.values(byFile).reduce((a, b) => a + b, 0);
  return { byFile, total };
}

async function main() {
  const journal = await fs.readFile(JOURNAL_PATH, 'utf8').catch(() => '');
  const entries = parseJournal(journal);
  const chunksJsonl = await fs.readFile(CHUNKS_JSONL, 'utf8').catch(() => '');
  const chunkLines = chunksJsonl.split('\n').filter(Boolean);
  const indexTokens = chunkLines.reduce((acc, line) => {
    try {
      return acc + (JSON.parse(line).tokens ?? 0);
    } catch {
      return acc;
    }
  }, 0);

  const cases = await countCases();

  const genEntries = entries.filter((e) => e.task.startsWith('phase1-'));
  const durationSumMs = genEntries
    .map((e) => e.durationMs ?? 0)
    .reduce((a, b) => a + b, 0);
  const totalCompletionTokens = genEntries.reduce(
    (a, e) => a + (e.completionTokens ?? approxTokens(e.responseChars)),
    0,
  );
  const totalPromptTokens = genEntries.reduce(
    (a, e) => a + (e.promptTokens ?? 0),
    0,
  );
  const totalTokens = genEntries.reduce(
    (a, e) => a + (e.totalTokens ?? (e.promptTokens ?? 0) + (e.completionTokens ?? approxTokens(e.responseChars))),
    0,
  );

  const costAvoided: Record<string, number> = {};
  for (const [name, rate] of Object.entries(CLOUD_RATES)) {
    const cost =
      (totalPromptTokens / 1_000_000) * rate.input +
      (totalCompletionTokens / 1_000_000) * rate.output;
    costAvoided[name] = cost;
  }

  const generatedLines: string[] = [];
  generatedLines.push('# Generation stats');
  generatedLines.push('');
  generatedLines.push(`Generated: ${new Date().toISOString()}`);
  generatedLines.push('');
  generatedLines.push('## RAG index');
  generatedLines.push('');
  generatedLines.push(`- Chunks indexed: ${fmtNumber(chunkLines.length)}`);
  generatedLines.push(`- Approx tokens in index: ${fmtNumber(indexTokens)}`);
  generatedLines.push('');
  generatedLines.push('## Journal entries');
  generatedLines.push('');
  generatedLines.push(`- Total journal entries: ${entries.length}`);
  generatedLines.push(`- Phase 1 generation entries: ${genEntries.length}`);
  generatedLines.push('');
  if (genEntries.length > 0) {
    generatedLines.push('| task | duration_s | prompt_tok | completion_tok | response_chars | chunks |');
    generatedLines.push('|---|---:|---:|---:|---:|---:|');
    for (const e of genEntries) {
      generatedLines.push(
        `| ${e.task} | ${e.durationMs ? (e.durationMs / 1000).toFixed(1) : '—'} | ${e.promptTokens ?? '—'} | ${e.completionTokens ?? '—'} | ${fmtNumber(e.responseChars)} | ${e.retrievedCount} |`,
      );
    }
    generatedLines.push('');
  }
  generatedLines.push('## Aggregates (phase1-* only)');
  generatedLines.push('');
  generatedLines.push(`- Total wall-clock generation: **${(durationSumMs / 1000).toFixed(1)} s**${durationSumMs ? ` (${(durationSumMs / 60000).toFixed(2)} min)` : ''}`);
  generatedLines.push(`- Total prompt tokens sent: ${fmtNumber(totalPromptTokens)}`);
  generatedLines.push(`- Total completion tokens generated: ${fmtNumber(totalCompletionTokens)}`);
  generatedLines.push(`- Total tokens: ${fmtNumber(totalTokens)}`);
  generatedLines.push('');
  generatedLines.push('## Test cases generated');
  generatedLines.push('');
  generatedLines.push(`- Total UI cases (UI-PARTS-###): **${cases.total}**`);
  if (cases.total > 0) {
    for (const [f, n] of Object.entries(cases.byFile)) {
      generatedLines.push(`  - ${f}: ${n}`);
    }
  }
  generatedLines.push('');
  generatedLines.push('## Cloud cost avoided (hypothetical)');
  generatedLines.push('');
  generatedLines.push('What the same token volume would have cost on commercial APIs (2026-04 list prices, USD per 1M tokens):');
  generatedLines.push('');
  generatedLines.push('| Model | input $/1M | output $/1M | this run |');
  generatedLines.push('|---|---:|---:|---:|');
  for (const [name, rate] of Object.entries(CLOUD_RATES)) {
    generatedLines.push(`| ${name} | ${rate.input.toFixed(2)} | ${rate.output.toFixed(2)} | ${fmtCurrency(costAvoided[name] ?? 0)} |`);
  }
  generatedLines.push('');
  generatedLines.push('Local generation via Ollama: **$0.00** in API charges. GPU electricity only.');
  generatedLines.push('');
  if (cases.total > 0 && durationSumMs > 0) {
    const casesPerMin = (cases.total / (durationSumMs / 60000));
    generatedLines.push(`## Throughput\n\n- ~${casesPerMin.toFixed(1)} test cases / minute wall-clock (generation only)`);
    generatedLines.push('');
  }
  generatedLines.push('> Note: entries from runs that predate the metrics instrumentation do not have `duration_ms` / token counts.');
  generatedLines.push('> For those, response length is approximated at 4 chars/token, and durations are marked as —.');
  generatedLines.push('');

  const report = generatedLines.join('\n');
  await fs.mkdir(LOGS_DIR, { recursive: true });
  await fs.writeFile(resolve(LOGS_DIR, 'stats.md'), report, 'utf8');
  process.stdout.write(report);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
