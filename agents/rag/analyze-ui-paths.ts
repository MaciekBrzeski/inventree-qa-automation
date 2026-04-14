import { promises as fs } from 'node:fs';
import { resolve, relative, basename } from 'node:path';

const HERE = new URL('.', import.meta.url).pathname;
const PROJECT = resolve(HERE, '../../..');
const UI_TESTS_DIR = resolve(PROJECT, 'submission/automation/ui/tests');
const CORRELATION_PATH = resolve(PROJECT, 'submission/data/ui-explore/click-to-api.jsonl');
const RECORDER_PATH = resolve(PROJECT, 'submission/data/api-ui-gap/per-test-requests.json');
const OPENAPI_PATH = resolve(PROJECT, 'submission/data/openapi-parts.filtered.json');
const OUT_DIR = resolve(PROJECT, 'docs/qa/ui-paths');
const TREE_PATH = resolve(OUT_DIR, 'tree.md');
const BY_ENDPOINT_PATH = resolve(OUT_DIR, 'by-endpoint.md');
const PRIMITIVES_PATH = resolve(OUT_DIR, 'primitives.md');
const INDEX_PATH = resolve(OUT_DIR, 'index.md');

type Step =
  | { kind: 'goto'; url: string }
  | { kind: 'click-label'; label: string }
  | { kind: 'click-role-name'; role: string; name: string }
  | { kind: 'click-role'; role: string }
  | { kind: 'fill-label'; label: string; value?: string }
  | { kind: 'fill-locator'; selector: string; value?: string };

type TestPath = {
  file: string;
  title: string;
  caseId: string;
  steps: Step[];
  endpoints: Set<string>; // endpoints this test's chain hits (from recorder)
};

function normalisePath(method: string, url: string): string {
  try {
    const u = new URL(url, 'http://x');
    let p = u.pathname.replace(/\/\d+(?=\/|$)/g, '/{id}');
    if (!p.endsWith('/')) p += '/';
    return `${method.toUpperCase()} ${p}`;
  } catch {
    return `${method.toUpperCase()} ${url}`;
  }
}

function extractCaseId(title: string): string {
  const m = /\b([A-Z]+-[A-Z]+-[A-Z0-9]+-\d+|[A-Z]+-[A-Z]+-\d+)\b/.exec(title);
  return m?.[1] ?? '';
}

/** Naive parser: walks a spec file, splits by `test(` blocks, extracts steps per block. */
async function parseSpecFile(filePath: string): Promise<TestPath[]> {
  const src = await fs.readFile(filePath, 'utf8');
  const rel = relative(PROJECT, filePath);
  const out: TestPath[] = [];
  const testStartRe = /test\(\s*['"`]([^'"`]+)['"`]/g;
  const matches: Array<{ title: string; start: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = testStartRe.exec(src)) !== null) {
    matches.push({ title: m[1] ?? '', start: m.index });
  }
  for (let i = 0; i < matches.length; i += 1) {
    const { title, start } = matches[i]!;
    const end = matches[i + 1]?.start ?? src.length;
    const block = src.slice(start, end);
    const steps: Step[] = [];

    const gotoRe = /page\.goto\(\s*[`'"]([^`'"]*)[`'"]/g;
    let gm: RegExpExecArray | null;
    while ((gm = gotoRe.exec(block)) !== null) {
      const url = (gm[1] ?? '').replace(/\$\{[^}]+\}/g, '{var}');
      steps.push({ kind: 'goto', url });
    }

    const labelClickRe = /getByLabel\(\s*[`'"]([^`'"]+)[`'"]\)[^\n;]*\.click\(/g;
    while ((gm = labelClickRe.exec(block)) !== null) {
      steps.push({ kind: 'click-label', label: gm[1] ?? '' });
    }

    const roleNameClickRe = /getByRole\(\s*[`'"]([^`'"]+)[`'"]\s*,\s*\{\s*name\s*:\s*[`'"]([^`'"]+)[`'"]/g;
    while ((gm = roleNameClickRe.exec(block)) !== null) {
      steps.push({ kind: 'click-role-name', role: gm[1] ?? '', name: gm[2] ?? '' });
    }

    const fillLabelRe = /getByLabel\(\s*[`'"]([^`'"]+)[`'"]\)[^\n;]*\.fill\(/g;
    while ((gm = fillLabelRe.exec(block)) !== null) {
      steps.push({ kind: 'fill-label', label: gm[1] ?? '' });
    }

    const fillLocatorRe = /locator\(\s*[`'"]([^`'"]+)[`'"]\)[^\n;]*\.fill\(/g;
    while ((gm = fillLocatorRe.exec(block)) !== null) {
      steps.push({ kind: 'fill-locator', selector: gm[1] ?? '' });
    }

    out.push({ file: rel, title, caseId: extractCaseId(title), steps, endpoints: new Set() });
  }
  return out;
}

function stepSig(s: Step): string {
  switch (s.kind) {
    case 'goto':
      return `goto ${s.url}`;
    case 'click-label':
      return `click label:${s.label}`;
    case 'click-role-name':
      return `click role:${s.role}:"${s.name}"`;
    case 'click-role':
      return `click role:${s.role}`;
    case 'fill-label':
      return `fill label:${s.label}`;
    case 'fill-locator':
      return `fill sel:${s.selector}`;
  }
}

/** Generalise a step signature so templated paths collapse. */
function generaliseStep(s: Step): string {
  if (s.kind === 'goto') {
    const u = s.url.replace(/\/\d+(?=\/|$)/g, '/{id}').replace(/\{var\}/g, '{id}');
    return `goto ${u}`;
  }
  return stepSig(s);
}

type TreeNode = {
  step: string;
  count: number;
  endpoints: Set<string>;
  children: Map<string, TreeNode>;
};

function makeNode(step: string): TreeNode {
  return { step, count: 0, endpoints: new Set(), children: new Map() };
}

function insertPath(root: TreeNode, steps: string[], endpoints: Set<string>): void {
  let node = root;
  for (const s of steps) {
    const existing = node.children.get(s);
    const next = existing ?? makeNode(s);
    if (!existing) node.children.set(s, next);
    next.count += 1;
    for (const e of endpoints) next.endpoints.add(e);
    node = next;
  }
}

function renderTree(node: TreeNode, depth = 0): string[] {
  const out: string[] = [];
  const indent = '  '.repeat(depth);
  const epList = Array.from(node.endpoints).sort();
  const suffix = epList.length > 0 ? ` → {${epList.join(', ')}} ×${node.count}` : ` ×${node.count}`;
  if (depth > 0) out.push(`${indent}- \`${node.step}\`${suffix}`);
  const sorted = Array.from(node.children.values()).sort((a, b) => b.count - a.count);
  for (const child of sorted) out.push(...renderTree(child, depth + 1));
  return out;
}

async function main(): Promise<void> {
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  // Load recorder to attribute endpoints per UI test title.
  type TestLog = {
    test: string;
    requests: Array<{ method: string; url: string; status: number | null }>;
  };
  let recorder: TestLog[] = [];
  try {
    recorder = JSON.parse(await fs.readFile(RECORDER_PATH, 'utf8'));
  } catch {
    /* ok */
  }
  const titleToEndpoints = new Map<string, Set<string>>();
  for (const log of recorder) {
    const [, title] = log.test.split('::', 2);
    if (!title) continue;
    const hits = new Set<string>();
    for (const r of log.requests) {
      if (r.method.toUpperCase() === 'OPTIONS') continue;
      const key = normalisePath(r.method, r.url);
      hits.add(key);
    }
    titleToEndpoints.set(title, hits);
  }

  // Parse OpenAPI to know which endpoints are in scope.
  const openapi = JSON.parse(await fs.readFile(OPENAPI_PATH, 'utf8')) as {
    paths: Record<string, Record<string, unknown>>;
  };
  const schemaKeys = new Set<string>();
  for (const [p, ops] of Object.entries(openapi.paths)) {
    for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
      if (ops[method]) schemaKeys.add(`${method.toUpperCase()} ${p}/`.replace(/\/+/g, '/'));
    }
  }

  // Walk UI test files.
  const testPaths: TestPath[] = [];
  for (const file of await fs.readdir(UI_TESTS_DIR)) {
    if (!file.endsWith('.spec.ts')) continue;
    if (file.startsWith('_')) continue;
    const parsed = await parseSpecFile(resolve(UI_TESTS_DIR, file));
    for (const p of parsed) {
      const eps = titleToEndpoints.get(p.title) ?? new Set<string>();
      for (const e of eps) if (schemaKeys.has(e)) p.endpoints.add(e);
      testPaths.push(p);
    }
  }

  // Build the global tree (all tests merged).
  const globalTree = makeNode('ROOT');
  globalTree.count = testPaths.length;
  for (const tp of testPaths) {
    const sig = tp.steps.map(generaliseStep);
    insertPath(globalTree, sig, tp.endpoints);
  }

  // Build by-endpoint reverse index.
  const byEndpoint = new Map<string, TestPath[]>();
  for (const tp of testPaths) {
    for (const e of tp.endpoints) {
      if (!byEndpoint.has(e)) byEndpoint.set(e, []);
      byEndpoint.get(e)!.push(tp);
    }
  }

  // Render tree.
  const treeLines: string[] = [];
  treeLines.push('---');
  treeLines.push('title: "UI path tree — all automated UI tests"');
  treeLines.push('tags: [qa, ui-paths, tree, coverage]');
  treeLines.push(`generated: ${new Date().toISOString()}`);
  treeLines.push('---');
  treeLines.push('');
  treeLines.push('# UI path tree');
  treeLines.push('');
  treeLines.push('Every automated UI test is a sequence of steps (goto / click-by-label / click-by-role / fill). This tree merges all test sequences so shared prefixes collapse. Leaves show which API endpoints each path reaches (from the page-level recorder capture).');
  treeLines.push('');
  treeLines.push('Each node shows `step ×count → {endpoints}`. Branching points are where different tests diverge — those are the natural decision points a shared path library should expose as alternative methods.');
  treeLines.push('');
  treeLines.push('## Tree');
  treeLines.push('');
  treeLines.push(...renderTree(globalTree));
  treeLines.push('');
  await fs.writeFile(TREE_PATH, treeLines.join('\n'));

  // Render by-endpoint.
  const byEpLines: string[] = [];
  byEpLines.push('---');
  byEpLines.push('title: "UI paths by endpoint"');
  byEpLines.push('tags: [qa, ui-paths, endpoint-recipes]');
  byEpLines.push(`generated: ${new Date().toISOString()}`);
  byEpLines.push('---');
  byEpLines.push('');
  byEpLines.push('# UI paths by endpoint');
  byEpLines.push('');
  byEpLines.push('Reverse index: for each API endpoint captured by the recorder, the UI tests + exact step sequence that reach it. A recipe appearing under multiple tests = a reusable path. A recipe appearing once = the only known way to hit that endpoint via UI.');
  byEpLines.push('');
  const endpointsSorted = Array.from(byEndpoint.keys()).sort();
  for (const ep of endpointsSorted) {
    const epSlug = ep
      .toLowerCase()
      .replace(/[{}]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    byEpLines.push(`## [[../graph/endpoints/${epSlug}|${ep}]]`);
    byEpLines.push('');
    byEpLines.push(`Reached by ${byEndpoint.get(ep)!.length} UI test(s):`);
    byEpLines.push('');
    for (const tp of byEndpoint.get(ep)!) {
      const caseId = tp.caseId || tp.title;
      byEpLines.push(`- [[../graph/ui-tests/${caseId}|${caseId}]] (\`${tp.file}\`)`);
      if (tp.steps.length > 0) {
        byEpLines.push('  ```');
        for (const s of tp.steps) byEpLines.push(`  ${stepSig(s)}`);
        byEpLines.push('  ```');
      }
    }
    byEpLines.push('');
  }
  await fs.writeFile(BY_ENDPOINT_PATH, byEpLines.join('\n'));

  // Render primitives — count of each step across all tests.
  const primitiveCount = new Map<string, number>();
  const primitiveEndpoints = new Map<string, Set<string>>();
  for (const tp of testPaths) {
    for (const s of tp.steps) {
      const sig = generaliseStep(s);
      primitiveCount.set(sig, (primitiveCount.get(sig) ?? 0) + 1);
      if (!primitiveEndpoints.has(sig)) primitiveEndpoints.set(sig, new Set());
      for (const e of tp.endpoints) primitiveEndpoints.get(sig)!.add(e);
    }
  }
  const primitiveLines: string[] = [];
  primitiveLines.push('---');
  primitiveLines.push('title: "UI path primitives — most-used steps"');
  primitiveLines.push('tags: [qa, ui-paths, primitives]');
  primitiveLines.push(`generated: ${new Date().toISOString()}`);
  primitiveLines.push('---');
  primitiveLines.push('');
  primitiveLines.push('# UI path primitives');
  primitiveLines.push('');
  primitiveLines.push('Every UI step (goto / click-label / click-role / fill), counted across all automated tests. Sorted by frequency — the top entries are candidates for extraction into a shared path library at `submission/automation/ui/paths/`.');
  primitiveLines.push('');
  primitiveLines.push('| count | step | endpoints reached downstream |');
  primitiveLines.push('|---:|---|---|');
  const primitivesSorted = Array.from(primitiveCount.entries()).sort((a, b) => b[1] - a[1]);
  for (const [sig, count] of primitivesSorted) {
    const eps = Array.from(primitiveEndpoints.get(sig) ?? []).sort();
    const epCell = eps.length === 0 ? '_(none)_' : eps.length > 3 ? `${eps.slice(0, 3).join(', ')} +${eps.length - 3}` : eps.join(', ');
    primitiveLines.push(`| ${count} | \`${sig}\` | ${epCell} |`);
  }
  primitiveLines.push('');
  await fs.writeFile(PRIMITIVES_PATH, primitiveLines.join('\n'));

  // Index
  const indexLines: string[] = [];
  indexLines.push('---');
  indexLines.push('title: "UI paths — analysis and reusable navigation tree"');
  indexLines.push('tags: [qa, ui-paths, index]');
  indexLines.push(`generated: ${new Date().toISOString()}`);
  indexLines.push('---');
  indexLines.push('');
  indexLines.push('# UI paths — analysis and reusable navigation tree');
  indexLines.push('');
  indexLines.push('Generated by `submission/agents/rag/analyze-ui-paths.ts`. Turns the automated UI test suite into a structural view: every step → every downstream endpoint, merged into one tree so shared prefixes are visible and branching points are explicit.');
  indexLines.push('');
  indexLines.push('## Artefacts');
  indexLines.push('');
  indexLines.push('- [[tree]] — the merged global path tree. Top-level branches = distinct entry points. Child nodes = shared prefixes. Leaves show reached endpoints.');
  indexLines.push('- [[by-endpoint]] — reverse index. For each endpoint, the list of UI tests + exact step sequences that reach it. Same endpoint covered by multiple paths = redundancy; single path = fragile.');
  indexLines.push('- [[primitives]] — frequency count of every distinct step. The top entries are the natural candidates for extraction into reusable functions.');
  indexLines.push('');
  indexLines.push('## Counts');
  indexLines.push('');
  indexLines.push(`- UI test files parsed: **${new Set(testPaths.map((t) => t.file)).size}**`);
  indexLines.push(`- Total test cases: **${testPaths.length}**`);
  indexLines.push(`- Distinct endpoints reached: **${byEndpoint.size}**`);
  indexLines.push(`- Distinct primitive steps: **${primitiveCount.size}**`);
  indexLines.push(`- Root tree branching factor: **${globalTree.children.size}**`);
  indexLines.push('');
  indexLines.push('## How to use');
  indexLines.push('');
  indexLines.push('1. Open [[tree]]. Look for heavy branches — those are the well-traveled UI flows.');
  indexLines.push('2. Open [[primitives]]. Any step with count ≥ 5 is a reusable primitive — move it into a helper function.');
  indexLines.push('3. Open [[by-endpoint]]. Any endpoint with exactly one path = single point of failure. Endpoints with zero paths = the gap.');
  indexLines.push('4. Regenerate: `cd submission/agents/rag && npx tsx analyze-ui-paths.ts`');
  indexLines.push('');
  await fs.writeFile(INDEX_PATH, indexLines.join('\n'));

  console.log(`[ui-paths] tests=${testPaths.length} endpoints=${byEndpoint.size} primitives=${primitiveCount.size}`);
  console.log(`[ui-paths] wrote ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
