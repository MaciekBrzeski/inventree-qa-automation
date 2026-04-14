import { promises as fs } from 'node:fs';
import { dirname, resolve } from 'node:path';

const HERE = new URL('.', import.meta.url).pathname;
const SCHEMA_PATH = resolve(HERE, '../../data/openapi-parts.filtered.json');
const OUT_DIR = resolve(HERE, '../../../docs/inventree/api');

type OpenAPIParam = {
  name: string;
  in: string;
  required?: boolean;
  schema?: { type?: string; enum?: string[] };
  description?: string;
};

type OpenAPIOperation = {
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: OpenAPIParam[];
  requestBody?: {
    required?: boolean;
    content?: Record<string, { schema?: unknown }>;
  };
  responses?: Record<string, { description?: string; content?: Record<string, { schema?: unknown }> }>;
  tags?: string[];
};

type OpenAPIPath = Record<string, OpenAPIOperation>;
type OpenAPIDoc = {
  info?: { title?: string; version?: string };
  paths: Record<string, OpenAPIPath>;
};

const METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;

function slugify(path: string, method: string): string {
  const clean = path
    .replace(/^\//, '')
    .replace(/[{}]/g, '')
    .replace(/\//g, '-')
    .replace(/-$/g, '');
  return `${method}-${clean}`;
}

function schemaRefName(ref: unknown): string | null {
  if (typeof ref !== 'object' || ref === null) return null;
  const r = ref as Record<string, unknown>;
  if (typeof r['$ref'] === 'string') {
    const s = r['$ref'] as string;
    return s.replace('#/components/schemas/', '');
  }
  if (r['type'] === 'array' && r['items']) return schemaRefName(r['items']) + '[]';
  return null;
}

function describeSchema(schema: unknown): string {
  if (typeof schema !== 'object' || schema === null) return 'unknown';
  const s = schema as Record<string, unknown>;
  if (typeof s['$ref'] === 'string') {
    return (s['$ref'] as string).replace('#/components/schemas/', '');
  }
  if (s['type'] === 'array') return `${describeSchema(s['items'])}[]`;
  if (typeof s['type'] === 'string') return s['type'];
  return 'object';
}

function formatParams(params?: OpenAPIParam[]): string {
  if (!params || params.length === 0) return '_(none)_';
  const rows = ['| name | in | required | type | description |', '|---|---|---|---|---|'];
  for (const p of params) {
    const type = p.schema?.enum ? `enum(${p.schema.enum.join('|')})` : p.schema?.type ?? '';
    const desc = (p.description ?? '').replace(/\n/g, ' ');
    rows.push(`| \`${p.name}\` | ${p.in} | ${p.required ? 'yes' : 'no'} | ${type} | ${desc} |`);
  }
  return rows.join('\n');
}

function formatRequestBody(rb?: OpenAPIOperation['requestBody']): string {
  if (!rb) return '_(none)_';
  const lines: string[] = [];
  lines.push(`Required: ${rb.required ? 'yes' : 'no'}`);
  if (rb.content) {
    for (const [mime, info] of Object.entries(rb.content)) {
      lines.push(`- \`${mime}\`: \`${describeSchema(info.schema)}\``);
    }
  }
  return lines.join('\n');
}

function formatResponses(responses?: OpenAPIOperation['responses']): string {
  if (!responses || Object.keys(responses).length === 0) return '_(none)_';
  const lines = ['| status | type | description |', '|---|---|---|'];
  for (const [status, r] of Object.entries(responses)) {
    const type =
      r.content && r.content['application/json']
        ? describeSchema(r.content['application/json'].schema)
        : '';
    const desc = (r.description ?? '').replace(/\n/g, ' ');
    lines.push(`| ${status} | \`${type}\` | ${desc} |`);
  }
  return lines.join('\n');
}

async function main() {
  const raw = await fs.readFile(SCHEMA_PATH, 'utf8');
  const doc = JSON.parse(raw) as OpenAPIDoc;
  await fs.mkdir(OUT_DIR, { recursive: true });

  let written = 0;
  for (const [path, ops] of Object.entries(doc.paths)) {
    for (const method of METHODS) {
      const op = ops[method];
      if (!op) continue;
      const slug = slugify(path, method);
      const fileName = `${slug}.md`;
      const tags = ['inventree', 'api', 'openapi', ...(op.tags ?? [])];
      const title = op.summary ?? op.operationId ?? `${method.toUpperCase()} ${path}`;
      const bodyLines: string[] = [];
      bodyLines.push('---');
      bodyLines.push(`title: "${title.replace(/"/g, '\\"')}"`);
      bodyLines.push(`operation-id: ${op.operationId ?? ''}`);
      bodyLines.push(`method: ${method.toUpperCase()}`);
      bodyLines.push(`path: ${path}`);
      bodyLines.push(`tags: [${tags.join(', ')}]`);
      bodyLines.push(`generated-at: ${new Date().toISOString()}`);
      bodyLines.push('---');
      bodyLines.push('');
      bodyLines.push(`# ${method.toUpperCase()} \`${path}\``);
      bodyLines.push('');
      if (op.summary) {
        bodyLines.push(`**Summary**: ${op.summary}`);
        bodyLines.push('');
      }
      if (op.description) {
        bodyLines.push(op.description);
        bodyLines.push('');
      }
      bodyLines.push('## Parameters');
      bodyLines.push('');
      bodyLines.push(formatParams(op.parameters));
      bodyLines.push('');
      bodyLines.push('## Request body');
      bodyLines.push('');
      bodyLines.push(formatRequestBody(op.requestBody));
      bodyLines.push('');
      bodyLines.push('## Responses');
      bodyLines.push('');
      bodyLines.push(formatResponses(op.responses));
      bodyLines.push('');
      const out = resolve(OUT_DIR, fileName);
      await fs.mkdir(dirname(out), { recursive: true });
      await fs.writeFile(out, bodyLines.join('\n'), 'utf8');
      written += 1;
    }
  }
  console.error(`[openapi-to-md] wrote ${written} endpoint notes → ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
