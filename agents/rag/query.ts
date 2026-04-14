import { Command } from 'commander';
import { promises as fs } from 'node:fs';
import { dirname, resolve } from 'node:path';
import Database from 'better-sqlite3';
import * as sqliteVec from 'sqlite-vec';
import { chat, embed, journalAppend, type ChatMessage } from './gemma-client.js';

const HERE = new URL('.', import.meta.url).pathname;
const VAULT_ROOT = resolve(HERE, '../../../docs');
const DB_PATH = resolve(HERE, 'vectors.db');

type Retrieved = { id: number; path: string; heading: string; content: string; score: number };

function openDb(): Database.Database {
  const db = new Database(DB_PATH, { readonly: true });
  sqliteVec.load(db);
  return db;
}

function retrieve(queryVec: number[], topK: number): Retrieved[] {
  const db = openDb();
  const vecBuf = Buffer.from(new Float32Array(queryVec).buffer);
  const rows = db
    .prepare(
      `SELECT chunks.rowid AS id, distance, chunk_meta.path AS path, chunk_meta.heading AS heading, chunk_meta.content AS content
       FROM chunks
       JOIN chunk_meta ON chunks.rowid = chunk_meta.id
       WHERE embedding MATCH ? AND k = ?
       ORDER BY distance`,
    )
    .all(vecBuf, topK) as Array<{
    id: number;
    distance: number;
    path: string;
    heading: string;
    content: string;
  }>;
  db.close();
  return rows.map((r) => ({
    id: r.id,
    path: r.path,
    heading: r.heading,
    content: r.content,
    score: 1 - r.distance,
  }));
}

async function gatherFull(areaGlob: string): Promise<Retrieved[]> {
  const db = openDb();
  const pattern = `%${areaGlob.replace(/\*/g, '')}%`;
  const rows = db
    .prepare(
      `SELECT id, path, heading, content FROM chunk_meta WHERE path LIKE ? ORDER BY path, id`,
    )
    .all(pattern) as Array<{ id: number; path: string; heading: string; content: string }>;
  db.close();
  return rows.map((r) => ({ ...r, score: 1.0 }));
}

function formatContext(chunks: Retrieved[]): string {
  return chunks
    .map(
      (c) =>
        `### [${c.id}] ${c.heading}\n_source: ${c.path}_\n\n${c.content}`,
    )
    .join('\n\n---\n\n');
}

async function main() {
  const program = new Command()
    .requiredOption('--task <name>', 'task label for journal + output routing')
    .option('--system <path>', 'path to system instructions md')
    .option('--prompt <text>', 'inline prompt')
    .option('--prompt-file <path>', 'prompt file path')
    .option('--context-mode <mode>', 'full | retrieve', 'retrieve')
    .option('--area <glob>', 'path substring for full mode or retrieve filter')
    .option('--top-k <n>', 'retrieve top-k', '8')
    .option('--out <path>', 'write response to this path')
    .option('--input <path>', 'optional extra context file')
    .option('--temperature <n>', 'override temperature', '0.3')
    .parse(process.argv);

  const opts = program.opts<{
    task: string;
    system?: string;
    prompt?: string;
    promptFile?: string;
    contextMode: 'full' | 'retrieve';
    area?: string;
    topK: string;
    out?: string;
    input?: string;
    temperature: string;
  }>();

  let userPrompt = opts.prompt ?? '';
  if (opts.promptFile) {
    userPrompt = await fs.readFile(opts.promptFile, 'utf8');
  }
  if (!userPrompt.trim()) {
    throw new Error('need --prompt or --prompt-file');
  }

  let extraInput = '';
  if (opts.input) {
    extraInput = await fs.readFile(opts.input, 'utf8');
  }

  let systemText = '';
  if (opts.system) {
    systemText = await fs.readFile(opts.system, 'utf8');
  }

  let retrieved: Retrieved[] = [];
  const topK = parseInt(opts.topK, 10);
  if (opts.contextMode === 'full') {
    if (!opts.area) throw new Error('--context-mode full requires --area');
    retrieved = await gatherFull(opts.area);
  } else {
    const queryVec = await embed(userPrompt);
    retrieved = retrieve(queryVec, topK);
  }

  const contextBlock = retrieved.length
    ? `# Retrieved context\n\n${formatContext(retrieved)}`
    : '# Retrieved context\n\n(none)';

  const messages: ChatMessage[] = [];
  if (systemText) messages.push({ role: 'system', content: systemText });
  messages.push({ role: 'user', content: `${contextBlock}\n\n---\n\n# Task\n\n${userPrompt}${extraInput ? `\n\n---\n\n# Extra input\n\n${extraInput}` : ''}` });

  console.error(`[query] task=${opts.task} mode=${opts.contextMode} chunks=${retrieved.length}`);
  console.error(`[query] chunk ids: ${retrieved.map((r) => r.id).join(', ')}`);

  const result = await chat(messages, {
    temperature: parseFloat(opts.temperature),
  });

  console.error(
    `[query] done in ${(result.durationMs / 1000).toFixed(1)}s` +
      (result.totalTokens !== undefined ? ` tokens=${result.totalTokens}` : '') +
      (result.completionTokens !== undefined ? ` out=${result.completionTokens}` : ''),
  );

  if (opts.out) {
    await fs.mkdir(dirname(resolve(opts.out)), { recursive: true });
    await fs.writeFile(opts.out, result.text, 'utf8');
    console.error(`[query] wrote ${opts.out}`);
  } else {
    process.stdout.write(result.text + '\n');
  }

  await journalAppend({
    phase: opts.task.split('-')[0] ?? 'unknown',
    task: opts.task,
    systemPath: opts.system,
    promptPath: opts.promptFile,
    promptPreview: userPrompt,
    retrieved: retrieved.map((r) => ({
      id: r.id,
      path: r.path,
      heading: r.heading,
      score: r.score,
    })),
    response: result.text,
    durationMs: result.durationMs,
    promptTokens: result.promptTokens,
    completionTokens: result.completionTokens,
    totalTokens: result.totalTokens,
    model: result.model,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
