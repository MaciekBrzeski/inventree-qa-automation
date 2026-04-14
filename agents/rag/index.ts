import { promises as fs } from 'node:fs';
import { basename, join, relative, resolve } from 'node:path';
import matter from 'gray-matter';
import Database from 'better-sqlite3';
import * as sqliteVec from 'sqlite-vec';
import { createHash } from 'node:crypto';
import { embed } from './gemma-client.js';

const HERE = new URL('.', import.meta.url).pathname;
const VAULT_ROOT = resolve(HERE, '../../../docs');
const DB_PATH = resolve(HERE, 'vectors.db');
const CHUNKS_JSONL = resolve(HERE, 'chunks.jsonl');
const EMBED_DIM = 768;
const CHUNK_SOFT_MAX = 2000;

type Chunk = {
  path: string;
  heading: string;
  content: string;
  tokens: number;
  sha256: string;
};

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walk(p)));
    } else if (e.isFile() && e.name.endsWith('.md')) {
      out.push(p);
    }
  }
  return out;
}

function chunkMarkdown(body: string, filePath: string): Array<{ heading: string; content: string }> {
  const lines = body.split(/\r?\n/);
  const chunks: Array<{ heading: string; content: string }> = [];
  let currentHeading = basename(filePath, '.md');
  let buf: string[] = [];

  const flush = () => {
    const content = buf.join('\n').trim();
    if (content) chunks.push({ heading: currentHeading, content });
    buf = [];
  };

  for (const line of lines) {
    const h2 = /^##\s+(.+)/.exec(line);
    if (h2 && h2[1]) {
      flush();
      currentHeading = h2[1].trim();
      continue;
    }
    buf.push(line);
  }
  flush();

  const refined: Array<{ heading: string; content: string }> = [];
  for (const c of chunks) {
    if (c.content.length <= CHUNK_SOFT_MAX) {
      refined.push(c);
      continue;
    }
    const paragraphs = c.content.split(/\n\n+/);
    let acc: string[] = [];
    let accLen = 0;
    for (const p of paragraphs) {
      if (accLen + p.length > CHUNK_SOFT_MAX && acc.length) {
        refined.push({ heading: c.heading, content: acc.join('\n\n') });
        acc = [];
        accLen = 0;
      }
      acc.push(p);
      accLen += p.length + 2;
    }
    if (acc.length) refined.push({ heading: c.heading, content: acc.join('\n\n') });
  }
  return refined;
}

function sha(text: string): string {
  return createHash('sha256').update(text).digest('hex');
}

function approxTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

async function main() {
  console.error(`[index] vault: ${VAULT_ROOT}`);
  console.error(`[index] db:    ${DB_PATH}`);

  const files = await walk(VAULT_ROOT);
  console.error(`[index] found ${files.length} markdown files`);

  const db = new Database(DB_PATH);
  sqliteVec.load(db);
  db.exec('DROP TABLE IF EXISTS chunks');
  db.exec('DROP TABLE IF EXISTS chunk_meta');
  db.exec(`CREATE VIRTUAL TABLE chunks USING vec0(
    embedding FLOAT[${EMBED_DIM}]
  )`);
  db.exec(`CREATE TABLE chunk_meta(
    id INTEGER PRIMARY KEY,
    path TEXT NOT NULL,
    heading TEXT NOT NULL,
    content TEXT NOT NULL,
    tokens INTEGER NOT NULL,
    sha256 TEXT NOT NULL
  )`);

  const insertVec = db.prepare('INSERT INTO chunks(rowid, embedding) VALUES (?, ?)');
  const insertMeta = db.prepare(
    'INSERT INTO chunk_meta(id, path, heading, content, tokens, sha256) VALUES (?, ?, ?, ?, ?, ?)',
  );

  const jsonlLines: string[] = [];
  let id = 0;

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const parsed = matter(raw);
    const chunks = chunkMarkdown(parsed.content, file);
    const rel = relative(VAULT_ROOT, file);
    for (const c of chunks) {
      id += 1;
      const chunk: Chunk = {
        path: rel,
        heading: c.heading,
        content: c.content,
        tokens: approxTokens(c.content),
        sha256: sha(c.content),
      };
      try {
        const vec = await embed(`${chunk.heading}\n\n${chunk.content}`);
        if (vec.length !== EMBED_DIM) {
          throw new Error(`embed dim mismatch ${vec.length} != ${EMBED_DIM}`);
        }
        const vecBuf = Buffer.from(new Float32Array(vec).buffer);
        insertVec.run(BigInt(id), vecBuf);
        insertMeta.run(id, chunk.path, chunk.heading, chunk.content, chunk.tokens, chunk.sha256);
        jsonlLines.push(
          JSON.stringify({
            id,
            path: chunk.path,
            heading: chunk.heading,
            tokens: chunk.tokens,
            sha256: chunk.sha256,
          }),
        );
        if (id % 25 === 0) console.error(`[index] ${id} chunks indexed`);
      } catch (err) {
        console.error(`[index] skip ${rel} :: ${chunk.heading} — ${(err as Error).message}`);
      }
    }
  }

  await fs.writeFile(CHUNKS_JSONL, jsonlLines.join('\n') + '\n', 'utf8');
  console.error(`[index] done: ${id} chunks → ${DB_PATH}`);
  console.error(`[index] audit: ${CHUNKS_JSONL}`);
  db.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
