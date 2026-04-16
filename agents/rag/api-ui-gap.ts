import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';

const HERE = new URL('.', import.meta.url).pathname;
const SCHEMA_PATH = resolve(HERE, '../../data/openapi-parts.filtered.json');
const RECORDER_PATH = resolve(HERE, '../../data/api-ui-gap/per-test-requests.json');
const OUT_DIR = resolve(HERE, '../../data/api-ui-gap');

type OpenAPIDoc = {
  paths: Record<string, Record<string, unknown>>;
};

type RecordedRequest = { method: string; url: string; status: number | null };
type TestLog = { test: string; requests: RecordedRequest[] };

const METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;

function normaliseUrl(url: string): string {
  try {
    const u = new URL(url);
    let path = u.pathname;
    // Collapse any numeric id segment to {id}.
    path = path.replace(/\/\d+(?=\/|$)/g, '/{id}');
    // Collapse trailing slash to non-trailing if the schema uses that form.
    return path.endsWith('/') ? path : `${path}/`;
  } catch {
    return url;
  }
}

function endpointKey(method: string, path: string): string {
  return `${method.toUpperCase()} ${path}`;
}

function suggestSeed(path: string): string {
  if (path.startsWith('/api/bom/')) return '/web/part/<assembly-pk> → BOM tab';
  if (path.startsWith('/api/part/category/')) return '/web/partcategory/<pk>';
  if (path.startsWith('/api/part/parameter/')) return '/web/part/<pk> → Parameters tab';
  if (path.startsWith('/api/part/stocktake/')) return '/web/part/<pk> → Stock → Stocktake';
  if (path.startsWith('/api/part/test-template/')) return '/web/part/<pk> → Test templates tab';
  if (path.startsWith('/api/part/thumbs/')) return '/web/part/<pk> → image upload';
  if (path.startsWith('/api/part/related/')) return '/web/part/<pk> → Related Parts tab';
  if (path.startsWith('/api/part/internal-price/')) return '/web/part/<pk> → Part Pricing tab';
  if (path.startsWith('/api/part/sale-price/')) return '/web/part/<pk> → Part Pricing tab';
  if (path.startsWith('/api/part/')) return '/web/part or /web/part/<pk>';
  return '(no heuristic)';
}

async function main() {
  const schema = JSON.parse(await fs.readFile(SCHEMA_PATH, 'utf8')) as OpenAPIDoc;
  const logs = JSON.parse(await fs.readFile(RECORDER_PATH, 'utf8')) as TestLog[];

  const schemaSet = new Set<string>();
  for (const [p, ops] of Object.entries(schema.paths)) {
    for (const method of METHODS) {
      if (ops[method]) schemaSet.add(endpointKey(method, p));
    }
  }

  const coveredBy = new Map<string, Set<string>>();
  const dead = new Map<string, Set<string>>();

  for (const log of logs) {
    for (const req of log.requests) {
      // Skip CORS preflights — they are not semantic API calls.
      if (req.method.toUpperCase() === 'OPTIONS') continue;
      const path = normaliseUrl(req.url);
      if (!path.startsWith('/api/')) continue;
      const key = endpointKey(req.method, path);
      if (schemaSet.has(key)) {
        if (!coveredBy.has(key)) coveredBy.set(key, new Set());
        coveredBy.get(key)!.add(log.test);
      } else {
        if (!dead.has(key)) dead.set(key, new Set());
        dead.get(key)!.add(log.test);
      }
    }
  }

  const covered = Array.from(coveredBy.keys()).sort();
  const uncovered = Array.from(schemaSet).filter((k) => !coveredBy.has(k)).sort();
  const deadList = Array.from(dead.keys()).sort();

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(resolve(OUT_DIR, 'covered.txt'), covered.join('\n') + '\n');
  await fs.writeFile(resolve(OUT_DIR, 'uncovered.txt'), uncovered.join('\n') + '\n');
  await fs.writeFile(resolve(OUT_DIR, 'dead.txt'), deadList.join('\n') + '\n');

  const seeds = uncovered.map((k) => {
    const [, path] = k.split(' ', 2);
    return { endpoint: k, seed: suggestSeed(path!), rationale: 'heuristic match on path prefix' };
  });
  await fs.writeFile(resolve(OUT_DIR, 'seeds.json'), JSON.stringify(seeds, null, 2));

  // Machine-readable summary consumed by the CI coverage-timeline step and
  // by any dashboard script downstream. Keep the shape minimal.
  const summary = {
    generated: new Date().toISOString(),
    total: schemaSet.size,
    covered: covered.length,
    uncovered: uncovered.length,
    dead: deadList.length,
    ratio: Number(((covered.length / schemaSet.size) * 100).toFixed(2)),
  };
  await fs.writeFile(resolve(OUT_DIR, 'coverage-summary.json'), JSON.stringify(summary, null, 2));

  const lines: string[] = [];
  lines.push('# api-ui-gap coverage report');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`- OpenAPI endpoints in scope: **${schemaSet.size}**`);
  lines.push(`- Covered by at least one UI test: **${covered.length}**`);
  lines.push(`- Uncovered: **${uncovered.length}**`);
  lines.push(`- Dead (requests observed but not in OpenAPI): **${deadList.length}**`);
  lines.push(`- Coverage ratio: **${((covered.length / schemaSet.size) * 100).toFixed(1)}%**`);
  lines.push('');
  lines.push('## Covered endpoints');
  lines.push('');
  if (covered.length === 0) {
    lines.push('_(none yet — run the UI suite first)_');
  } else {
    lines.push('| endpoint | hitting tests |');
    lines.push('|---|---|');
    for (const k of covered) {
      const tests = Array.from(coveredBy.get(k) ?? []).sort();
      lines.push(`| \`${k}\` | ${tests.length} |`);
    }
  }
  lines.push('');
  lines.push('## Uncovered endpoints + suggested seeds');
  lines.push('');
  if (uncovered.length === 0) {
    lines.push('_All endpoints covered. 🎉_');
  } else {
    lines.push('| endpoint | suggested ui-explore seed |');
    lines.push('|---|---|');
    for (const k of uncovered) {
      const [, path] = k.split(' ', 2);
      lines.push(`| \`${k}\` | ${suggestSeed(path!)} |`);
    }
  }
  lines.push('');
  lines.push('## Dead endpoints (observed in UI traffic but not in OpenAPI)');
  lines.push('');
  if (deadList.length === 0) {
    lines.push('_(none)_');
  } else {
    lines.push('These are candidates for bug report: the OpenAPI schema is out of date.');
    lines.push('');
    for (const k of deadList) lines.push(`- \`${k}\``);
  }
  lines.push('');

  await fs.writeFile(resolve(OUT_DIR, 'coverage.md'), lines.join('\n'));
  console.log(
    `[api-ui-gap] schema=${schemaSet.size} covered=${covered.length} uncovered=${uncovered.length} dead=${deadList.length}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
