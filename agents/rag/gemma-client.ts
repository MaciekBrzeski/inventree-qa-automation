import OpenAI from 'openai';
import { promises as fs } from 'node:fs';
import { dirname, resolve } from 'node:path';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434/v1';
const CHAT_MODEL = process.env.QA_CHAT_MODEL ?? 'qa-gemma';
const EMBED_MODEL = process.env.QA_EMBED_MODEL ?? 'nomic-embed-text';

const client = new OpenAI({
  baseURL: OLLAMA_BASE_URL,
  apiKey: 'ollama-local',
});

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type ChatOptions = {
  model?: string;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
};

export type ChatResult = {
  text: string;
  durationMs: number;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  model: string;
};

export async function chat(messages: ChatMessage[], opts: ChatOptions = {}): Promise<ChatResult> {
  const model = opts.model ?? CHAT_MODEL;
  const start = Date.now();
  const response = await client.chat.completions.create({
    model,
    messages,
    temperature: opts.temperature ?? 0.3,
    top_p: opts.topP ?? 0.95,
    max_tokens: opts.maxTokens,
    stream: false,
  });
  const durationMs = Date.now() - start;
  const content = response.choices[0]?.message.content;
  if (!content) {
    throw new Error('qa-gemma returned empty response');
  }
  return {
    text: content,
    durationMs,
    promptTokens: response.usage?.prompt_tokens,
    completionTokens: response.usage?.completion_tokens,
    totalTokens: response.usage?.total_tokens,
    model,
  };
}

export async function embed(text: string): Promise<number[]> {
  const response = await fetch(`${OLLAMA_BASE_URL.replace(/\/v1$/, '')}/api/embeddings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: EMBED_MODEL, prompt: text }),
  });
  if (!response.ok) {
    throw new Error(`embed failed: ${response.status} ${await response.text()}`);
  }
  const body = (await response.json()) as { embedding?: number[] };
  if (!body.embedding) {
    throw new Error('embed response missing embedding field');
  }
  return body.embedding;
}

export type JournalEntry = {
  phase: string;
  task: string;
  systemPath?: string;
  promptPath?: string;
  promptPreview: string;
  retrieved: Array<{ id: number; path: string; heading: string; score: number }>;
  response: string;
  durationMs?: number;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  model?: string;
};

const JOURNAL_PATH = resolve(
  process.env.QA_JOURNAL_PATH ??
    resolve(new URL('.', import.meta.url).pathname, '../../../docs/qa/prompts-journal.md'),
);

export async function journalAppend(entry: JournalEntry): Promise<void> {
  await fs.mkdir(dirname(JOURNAL_PATH), { recursive: true });
  const timestamp = new Date().toISOString();
  const retrieved = entry.retrieved.length
    ? entry.retrieved
        .map((r) => `  - [${r.id}] ${r.path} :: ${r.heading} (score ${r.score.toFixed(3)})`)
        .join('\n')
    : '  - (none)';
  const metrics = [
    entry.durationMs !== undefined ? `duration_ms=${entry.durationMs}` : null,
    entry.model ? `model=${entry.model}` : null,
    entry.promptTokens !== undefined ? `prompt_tokens=${entry.promptTokens}` : null,
    entry.completionTokens !== undefined ? `completion_tokens=${entry.completionTokens}` : null,
    entry.totalTokens !== undefined ? `total_tokens=${entry.totalTokens}` : null,
  ]
    .filter((x): x is string => x !== null)
    .join(' ');
  const block = [
    `## ${timestamp} — ${entry.phase} / ${entry.task}`,
    '',
    `- system: ${entry.systemPath ?? '(none)'}`,
    `- prompt-file: ${entry.promptPath ?? '(inline)'}`,
    metrics ? `- metrics: ${metrics}` : '- metrics: (none)',
    '',
    '### Retrieved',
    retrieved,
    '',
    '### Prompt preview',
    '```',
    entry.promptPreview.slice(0, 2000),
    '```',
    '',
    '### Response',
    '```',
    entry.response.slice(0, 8000),
    '```',
    '',
    '---',
    '',
  ].join('\n');
  await fs.appendFile(JOURNAL_PATH, block, 'utf8');
}
