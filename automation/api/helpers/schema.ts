import Ajv, { type ErrorObject } from 'ajv';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SCHEMA_PATH = resolve(__dirname, '../../../data/openapi-parts.filtered.json');

type OpenAPIDoc = {
  components?: { schemas?: Record<string, unknown> };
  paths: Record<
    string,
    Record<string, { responses?: Record<string, { content?: Record<string, { schema?: unknown }> }> }>
  >;
};

const doc = JSON.parse(readFileSync(SCHEMA_PATH, 'utf8')) as OpenAPIDoc;

const ajv = new Ajv({
  strict: false,
  allErrors: true,
  validateFormats: false,
});
ajv.addKeyword('example');
ajv.addKeyword('xml');

if (doc.components?.schemas) {
  for (const [name, schema] of Object.entries(doc.components.schemas)) {
    try {
      ajv.addSchema(schema as object, `#/components/schemas/${name}`);
    } catch {
      /* ignore dup */
    }
  }
}

function normalizePath(path: string): string {
  // Playwright gives real URLs — the schema uses /api/part/{id}/. Match by regex.
  return path;
}

function templateToRegex(template: string): RegExp {
  const escaped = template.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\{[^}]+\\\}/g, '[^/]+');
  return new RegExp('^' + escaped + '$');
}

function resolveTemplate(actualPath: string): string | null {
  // Strip query string.
  const clean = actualPath.split('?')[0];
  if (!clean) return null;
  for (const tpl of Object.keys(doc.paths)) {
    if (tpl === clean) return tpl;
    if (templateToRegex(tpl).test(clean)) return tpl;
  }
  return null;
}

export type ValidateResult = {
  ok: boolean;
  tpl?: string;
  errors?: ErrorObject[];
};

export function validateResponse(
  path: string,
  method: string,
  status: number,
  body: unknown,
): ValidateResult {
  const tpl = resolveTemplate(normalizePath(path));
  if (!tpl) return { ok: true }; // no template = skip
  const op = doc.paths[tpl]?.[method.toLowerCase()];
  if (!op) return { ok: true };
  const response = op.responses?.[String(status)] ?? op.responses?.['default'];
  const schema = response?.content?.['application/json']?.schema;
  if (!schema) return { ok: true, tpl };
  const validate = ajv.compile(schema as object);
  const ok = validate(body);
  return { ok, tpl, errors: ok ? undefined : validate.errors ?? undefined };
}
