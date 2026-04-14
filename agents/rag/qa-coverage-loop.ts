/**
 * qa-coverage-loop — driver for the unified QA workflow.
 *
 * One command runs the full loop's automation steps (analyze + document) and prints
 * a recommended next target. The spec-writing step is left to a human/Claude (interactive)
 * because the right choice depends on probing the UI.
 *
 * Phases:
 *   1. Sanity: count spec files, read last gap report
 *   2. Regenerate all three doc trees (gap / graph / paths / coverage)
 *   3. Read back the fresh gap report + graph
 *   4. Rank uncovered clusters by size (excluding the "stay api-only" classes)
 *   5. Print a recommended next target with the probe-spec stub path to create
 */

import { promises as fs } from 'node:fs';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const HERE = new URL('.', import.meta.url).pathname;
const PROJECT = resolve(HERE, '../../..');
const GAP_DIR = resolve(PROJECT, 'submission/data/api-ui-gap');
const UI_TESTS = resolve(PROJECT, 'submission/automation/ui/tests');
const API_TESTS = resolve(PROJECT, 'submission/automation/api/tests');

type ClusterRank = { cluster: string; count: number; sample: string[] };

function run(cmd: string, args: string[], cwd: string): Promise<{ code: number; out: string }> {
  return new Promise((resolvePromise) => {
    const child = spawn(cmd, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    child.stdout.on('data', (d) => (out += d.toString()));
    child.stderr.on('data', (d) => (out += d.toString()));
    child.on('close', (code) => resolvePromise({ code: code ?? 0, out }));
  });
}

async function countSpecs(dir: string): Promise<number> {
  try {
    const files = await fs.readdir(dir);
    return files.filter((f) => f.endsWith('.spec.ts') && !f.startsWith('_')).length;
  } catch {
    return 0;
  }
}

function rankClusters(uncovered: string[]): ClusterRank[] {
  const groups = new Map<string, string[]>();
  for (const line of uncovered) {
    const m = line.trim().match(/^(\w+) (\/api\/[^/]+(?:\/[^/]+)?)/);
    if (!m) continue;
    const [, , path] = m;
    if (!path) continue;
    // Normalise: trim trailing numeric or templated segments.
    const key = path.replace(/\/\{id\}.*$/, '/{id}/').replace(/\/$/, '') || path;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(line);
  }
  return Array.from(groups.entries())
    .map(([cluster, lines]) => ({ cluster, count: lines.length, sample: lines.slice(0, 3) }))
    .sort((a, b) => b.count - a.count);
}

const STAY_API_ONLY_BY_DESIGN = [
  'PUT ', // SPA uses PATCH, not PUT
];

function isLikelyReachableByUi(endpointLine: string): boolean {
  for (const prefix of STAY_API_ONLY_BY_DESIGN) {
    if (endpointLine.startsWith(prefix)) return false;
  }
  if (endpointLine.startsWith('PATCH ') && /\/(category|part)\/?$/.test(endpointLine)) return false; // bulk
  if (/thumbs/.test(endpointLine)) return false; // image upload
  if (/stocktake/.test(endpointLine)) return false; // INV-PARTS-005 blocked
  return true;
}

async function main(): Promise<void> {
  console.log('=== qa-coverage-loop ===\n');

  // Phase 1 — sanity
  const uiCount = await countSpecs(UI_TESTS);
  const apiCount = await countSpecs(API_TESTS);
  console.log(`UI spec files:  ${uiCount}`);
  console.log(`API spec files: ${apiCount}`);
  console.log('');

  // Phase 2 — regenerate docs
  console.log('[phase 2] regenerating docs...');
  for (const script of [
    'api-ui-gap.ts',
    'build-test-graph.ts',
    'analyze-ui-paths.ts',
    'build-coverage-docs.ts',
  ]) {
    console.log(`  npx tsx ${script}`);
    const res = await run('npx', ['tsx', script], HERE);
    if (res.code !== 0) {
      console.error(`  ${script} failed:\n${res.out}`);
      process.exit(res.code);
    }
    const lastLine = res.out.trim().split('\n').pop() ?? '';
    console.log(`    ${lastLine}`);
  }
  console.log('');

  // Phase 3 — read gap report
  const uncoveredLines = (await fs.readFile(resolve(GAP_DIR, 'uncovered.txt'), 'utf8'))
    .split('\n')
    .filter(Boolean);
  const coveredLines = (await fs.readFile(resolve(GAP_DIR, 'covered.txt'), 'utf8'))
    .split('\n')
    .filter(Boolean);
  const total = uncoveredLines.length + coveredLines.length;
  const ratio = total > 0 ? ((coveredLines.length / total) * 100).toFixed(1) : '0';
  console.log('[phase 3] coverage state');
  console.log(`  covered:   ${coveredLines.length}`);
  console.log(`  uncovered: ${uncoveredLines.length}`);
  console.log(`  ratio:     ${ratio}%`);
  console.log('');

  // Phase 4 — rank clusters
  const reachable = uncoveredLines.filter(isLikelyReachableByUi);
  const blocked = uncoveredLines.filter((l) => !isLikelyReachableByUi(l));
  console.log('[phase 4] reachable uncovered clusters (excluding PUT/bulk/stocktake/thumbs)');
  const ranked = rankClusters(reachable);
  for (const c of ranked.slice(0, 10)) {
    console.log(`  ${String(c.count).padStart(3)}  ${c.cluster}`);
    for (const s of c.sample) console.log(`        · ${s}`);
  }
  console.log('');
  console.log(`  ${blocked.length} uncovered endpoints are blocked by design or bug (skipped)`);
  console.log('');

  // Phase 5 — recommendation
  console.log('[phase 5] recommendation');
  if (ranked.length === 0) {
    console.log('  All reachable clusters are covered. Consider:');
    console.log('    - widening the OpenAPI filter (submission/data/openapi-parts.filtered.json)');
    console.log('    - tackling a blocked cluster (e.g. file upload for thumbs)');
    console.log('    - fixing INV-PARTS-005 upstream to unblock stocktake writes');
    return;
  }
  const top = ranked[0]!;
  console.log(`  Top target: ${top.cluster} (${top.count} endpoints)`);
  console.log('  Suggested next step:');
  console.log('    1. Write a throwaway probe spec at:');
  console.log(
    `       submission/automation/ui/tests/_probe-${top.cluster.replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)/g, '')}.spec.ts`,
  );
  console.log('    2. Use the probe template in .claude/skills/qa-coverage-loop/SKILL.md phase 3.');
  console.log('    3. Dump action-button / action-menu labels on the relevant panel.');
  console.log('    4. Draft the real spec using primitives from submission/automation/ui/paths/.');
  console.log('    5. Rerun this loop to confirm the cluster count dropped.');
  console.log('');

  // Phase 6 — print doc entry points
  console.log('[phase 6] docs to review');
  console.log('  docs/qa/coverage/coverage-index.md');
  console.log('  docs/qa/graph/index.md');
  console.log('  docs/qa/ui-paths/index.md');
  console.log('  submission/data/api-ui-gap/coverage.md');
  console.log('');
  console.log('Loop iteration complete. 🎯');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
