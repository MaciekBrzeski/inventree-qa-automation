// build-diff-report.ts — walk the baseline tree looking for `.actual.*` files
// left behind by a failing CHECKPOINT_MODE=compare run and emit a single
// self-contained HTML report with side-by-side PNGs + unified HTML/requests
// diffs for every detected regression.
//
// Usage:
//   npx tsx scripts/build-diff-report.ts
//   xdg-open automation/ui/baseline/report.html
//
// No dependencies — pure Node + the diff algorithm inlined below.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const HERE = new URL('.', import.meta.url).pathname;
const BASELINE = path.resolve(HERE, '..', 'baseline');
const OUT = path.join(BASELINE, 'report.html');
const ALL_MODE = process.argv.includes('--all');
const REPORTS_DIR = path.join(BASELINE, 'reports');

type Diff = {
  defect: string | null; // null for single-defect runs
  checkpoint: string; // "<test-slug>/<step-slug>"
  pngBase: string | null;
  pngActual: string | null;
  pngDiff: string | null;
  htmlBase: string | null;
  htmlActual: string | null;
  reqBase: string | null;
  reqActual: string | null;
};

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  async function rec(d: string): Promise<void> {
    for (const e of await fs.readdir(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) await rec(p);
      else out.push(p);
    }
  }
  await rec(dir);
  return out;
}

async function readOrNull(p: string | null): Promise<string | null> {
  if (!p) return null;
  try {
    return await fs.readFile(p, 'utf8');
  } catch {
    return null;
  }
}

async function readB64OrNull(p: string | null): Promise<string | null> {
  if (!p) return null;
  try {
    const buf = await fs.readFile(p);
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch {
    return null;
  }
}

// Classic Myers-ish LCS-based unified diff, line-granularity.
function unifiedDiff(a: string, b: string): Array<{ tag: 'eq' | 'add' | 'del'; line: string }> {
  const al = a.split('\n');
  const bl = b.split('\n');
  // Build LCS table — O(n*m), fine for our sizes (< 500 lines typical after masking).
  const n = al.length;
  const m = bl.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      if (al[i] === bl[j]) dp[i]![j] = dp[i + 1]![j + 1]! + 1;
      else dp[i]![j] = Math.max(dp[i + 1]![j]!, dp[i]![j + 1]!);
    }
  }
  const ops: Array<{ tag: 'eq' | 'add' | 'del'; line: string }> = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (al[i] === bl[j]) {
      ops.push({ tag: 'eq', line: al[i]! });
      i += 1;
      j += 1;
    } else if (dp[i + 1]![j]! >= dp[i]![j + 1]!) {
      ops.push({ tag: 'del', line: al[i]! });
      i += 1;
    } else {
      ops.push({ tag: 'add', line: bl[j]! });
      j += 1;
    }
  }
  while (i < n) {
    ops.push({ tag: 'del', line: al[i]! });
    i += 1;
  }
  while (j < m) {
    ops.push({ tag: 'add', line: bl[j]! });
    j += 1;
  }
  return ops;
}

// Collapse long runs of equal lines into `@@` hunks with CTX lines of
// surrounding context — keeps the report readable when the HTML is 2000 lines.
const CTX = 3;
function renderDiff(ops: ReturnType<typeof unifiedDiff>): string {
  if (!ops.some((o) => o.tag !== 'eq')) {
    return '<div class="hunk eq">(no differences)</div>';
  }
  const parts: string[] = [];
  let hunk: string[] = [];
  let hunkHead: number | null = null;
  const flush = (lineNo: number): void => {
    if (hunk.length === 0) return;
    const header = `@@ line ${hunkHead} → ${lineNo} @@`;
    parts.push(`<div class="hunk"><div class="hunk-hdr">${escapeHtml(header)}</div>${hunk.join('')}</div>`);
    hunk = [];
    hunkHead = null;
  };
  let eqBuffer: Array<{ line: string; lineNo: number }> = [];
  let lineNo = 0;
  for (const op of ops) {
    if (op.tag === 'eq') {
      lineNo += 1;
      eqBuffer.push({ line: op.line, lineNo });
      if (eqBuffer.length > CTX * 2 + 10 && hunk.length > 0) {
        // Close the current hunk with trailing context, then start fresh.
        for (let k = 0; k < CTX && k < eqBuffer.length; k += 1) {
          hunk.push(renderRow('eq', eqBuffer[k]!.line));
        }
        flush(eqBuffer[CTX - 1]?.lineNo ?? lineNo);
        eqBuffer = eqBuffer.slice(-CTX);
      }
    } else {
      if (hunk.length === 0) {
        // Opening a new hunk — prepend CTX lines of leading context.
        hunkHead = eqBuffer.length > 0 ? eqBuffer[Math.max(0, eqBuffer.length - CTX)]!.lineNo : lineNo;
        for (const e of eqBuffer.slice(-CTX)) {
          hunk.push(renderRow('eq', e.line));
        }
      } else {
        for (const e of eqBuffer) hunk.push(renderRow('eq', e.line));
      }
      eqBuffer = [];
      if (op.tag === 'del') lineNo += 1;
      hunk.push(renderRow(op.tag, op.line));
    }
  }
  // Flush whatever is left.
  if (hunk.length > 0) {
    for (const e of eqBuffer.slice(0, CTX)) hunk.push(renderRow('eq', e.line));
    flush(lineNo);
  }
  return parts.join('\n');
}

function renderRow(tag: 'eq' | 'add' | 'del', line: string): string {
  const prefix = tag === 'eq' ? ' ' : tag === 'add' ? '+' : '-';
  return `<div class="row ${tag}"><span class="pfx">${prefix}</span>${escapeHtml(line)}</div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Known-defect markers — when one of these appears in an added line we draw
// attention to it because it's almost certainly the root cause rather than
// a noisy re-render.
const DEFECT_TOKENS = [
  /\bmagenta\b/i,
  /display:\s*none/i,
  /padding-left:\s*\d+px/i,
  /\bSEND IT\b/,
  /qa-defect/,
  /<style\b/i,
  /<script\b/i,
  /background:\s*[^;]*(?:red|blue|green|magenta|yellow|pink|#[0-9a-f]{3,6})/i,
];

function highlightTokens(line: string): string {
  let out = escapeHtml(line);
  for (const re of DEFECT_TOKENS) {
    out = out.replace(
      new RegExp(`(${re.source})`, re.flags.replace('g', '')),
      '<mark>$1</mark>',
    );
  }
  return out;
}

type DiffSummary = {
  adds: string[];
  dels: string[];
  addCount: number;
  delCount: number;
  suspicious: string[]; // added lines containing defect tokens
};

function summarise(ops: ReturnType<typeof unifiedDiff>): DiffSummary {
  const adds: string[] = [];
  const dels: string[] = [];
  const suspicious: string[] = [];
  for (const o of ops) {
    if (o.tag === 'add') {
      adds.push(o.line);
      if (DEFECT_TOKENS.some((re) => re.test(o.line))) suspicious.push(o.line);
    } else if (o.tag === 'del') {
      dels.push(o.line);
    }
  }
  return {
    adds,
    dels,
    addCount: adds.length,
    delCount: dels.length,
    suspicious,
  };
}

function truncate(s: string, max = 400): string {
  if (s.length <= max) return s;
  return s.slice(0, max) + ` … (+${s.length - max} chars)`;
}

function renderSummary(label: string, s: DiffSummary): string {
  if (s.addCount === 0 && s.delCount === 0) {
    return `<div class="summary empty">${label}: <span class="na">identical</span></div>`;
  }
  const suspiciousHtml =
    s.suspicious.length > 0
      ? `<details class="susp-wrap"><summary>🎯 suspicious additions (${s.suspicious.length}) — click to expand</summary><div class="susp"><pre>${s.suspicious
          .map((l) => highlightTokens(l))
          .join('\n\n')}</pre></div></details>`
      : '';
  const samplesHtml = `
    <details class="samples">
      <summary>all added / removed lines (${s.addCount}+ / ${s.delCount}−)</summary>
      <pre class="adds">${s.adds.map((l) => '+ ' + highlightTokens(l)).join('\n\n') || '<em class="na">(none)</em>'}</pre>
      <pre class="dels">${s.dels.map((l) => '- ' + escapeHtml(l)).join('\n\n') || '<em class="na">(none)</em>'}</pre>
    </details>`;
  return `
    <div class="summary">
      <h3>${label} <span class="badge">${s.addCount}+ / ${s.delCount}−</span></h3>
      ${suspiciousHtml}
      ${samplesHtml}
    </div>`;
}

async function main(): Promise<void> {
  const byCheckpoint = new Map<string, Diff>();

  const ingest = async (actual: string, defect: string | null): Promise<void> => {
    const dir = path.dirname(actual);
    const testSlug = path.basename(dir);
    const fname = path.basename(actual);
    const isDiffPng = /\.diff\.png$/.test(fname);
    const stem = fname.replace(/\.(actual|diff)\.(png|html|requests\.json)$/, '');
    const kind = /\.png$/.test(fname) ? 'png' : /\.html$/.test(fname) ? 'html' : 'requests';
    const key = defect ? `${defect}/${testSlug}/${stem}` : `${testSlug}/${stem}`;
    if (!byCheckpoint.has(key)) {
      byCheckpoint.set(key, {
        defect,
        checkpoint: `${testSlug}/${stem}`,
        pngBase: null,
        pngActual: null,
        pngDiff: null,
        htmlBase: null,
        htmlActual: null,
        reqBase: null,
        reqActual: null,
      });
    }
    const d = byCheckpoint.get(key)!;
    // Baseline files always live at baseline/<test-slug>/<stem>.{png,html,requests.json}
    // regardless of whether the actuals are in baseline/ (single run) or
    // baseline/reports/<defect>/<test-slug>/ (all-mode archive).
    const baselineRoot = path.join(BASELINE, testSlug);
    const basePath =
      kind === 'png' ? `${stem}.png` : kind === 'html' ? `${stem}.html` : `${stem}.requests.json`;
    const baseFull = path.join(baselineRoot, basePath);
    if (kind === 'png') {
      if (isDiffPng) {
        d.pngDiff = actual;
      } else {
        d.pngActual = actual;
        d.pngBase = baseFull;
      }
    } else if (kind === 'html') {
      d.htmlActual = actual;
      d.htmlBase = baseFull;
    } else {
      d.reqActual = actual;
      d.reqBase = baseFull;
    }
  };

  if (ALL_MODE) {
    let defectDirs: string[] = [];
    try {
      defectDirs = (await fs.readdir(REPORTS_DIR, { withFileTypes: true }))
        .filter((e) => e.isDirectory())
        .map((e) => e.name);
    } catch {
      console.log(`[report] no ${REPORTS_DIR} — run validate-baseline.sh all first`);
      return;
    }
    for (const defect of defectDirs) {
      const defectRoot = path.join(REPORTS_DIR, defect);
      const files = await walk(defectRoot);
      for (const f of files.filter((f) => /\.(actual|diff)\.(png|html|requests\.json)$/.test(f))) {
        await ingest(f, defect);
      }
    }
  } else {
    const files = await walk(BASELINE);
    for (const f of files.filter(
      (f) =>
        /\.(actual|diff)\.(png|html|requests\.json)$/.test(f) &&
        !f.includes('/baseline/reports/'),
    )) {
      await ingest(f, null);
    }
  }

  if (byCheckpoint.size === 0) {
    console.log('[report] no .actual.* files under baseline/ — nothing to report');
    console.log('[report] run a failing compare first, e.g.:');
    console.log('  CHECKPOINT_MODE=compare CHECKPOINT_DEFECT=buttons-magenta npx playwright test');
    return;
  }

  // Resolve paths → payloads.
  const sections: string[] = [];
  for (const key of Array.from(byCheckpoint.keys()).sort()) {
    const d = byCheckpoint.get(key)!;
    const [pngBase, pngActual, pngDiff, htmlBase, htmlActual, reqBase, reqActual] =
      await Promise.all([
        readB64OrNull(d.pngBase),
        readB64OrNull(d.pngActual),
        readB64OrNull(d.pngDiff),
        readOrNull(d.htmlBase),
        readOrNull(d.htmlActual),
        readOrNull(d.reqBase),
        readOrNull(d.reqActual),
      ]);

    const pngBlock =
      pngBase && pngActual
        ? `
        <div class="triple">
          <figure><figcaption>baseline</figcaption><img src="${pngBase}" /></figure>
          <figure><figcaption>actual</figcaption><img src="${pngActual}" /></figure>
          ${pngDiff ? `<figure><figcaption>pixel diff (red = changed)</figcaption><img src="${pngDiff}" /></figure>` : '<figure><figcaption>(no diff png)</figcaption></figure>'}
        </div>`
        : pngActual
          ? `<div class="pair"><figure><figcaption>actual (no baseline)</figcaption><img src="${pngActual}" /></figure></div>`
          : '<p class="na">(no PNG diff)</p>';

    const htmlOps = htmlBase && htmlActual ? unifiedDiff(htmlBase, htmlActual) : null;
    const reqOps = reqBase && reqActual ? unifiedDiff(reqBase, reqActual) : null;
    const htmlSum = htmlOps ? summarise(htmlOps) : null;
    const reqSum = reqOps ? summarise(reqOps) : null;

    const pngStats =
      d.pngBase && d.pngActual
        ? (() => {
            try {
              const basePng = PNG.sync.read(require('node:fs').readFileSync(d.pngBase!));
              const curPng = PNG.sync.read(require('node:fs').readFileSync(d.pngActual!));
              if (basePng.width !== curPng.width || basePng.height !== curPng.height) {
                return { diffPx: -1, totalPx: basePng.width * basePng.height, pct: -1 };
              }
              const diff = new PNG({ width: basePng.width, height: basePng.height });
              const diffPx = pixelmatch(
                basePng.data,
                curPng.data,
                diff.data,
                basePng.width,
                basePng.height,
                { threshold: 0.1 },
              );
              const totalPx = basePng.width * basePng.height;
              return { diffPx, totalPx, pct: (diffPx / totalPx) * 100 };
            } catch {
              return null;
            }
          })()
        : null;

    const topSummary = `
      <div class="top-summary">
        <h3>What changed</h3>
        <ul>
          ${
            pngStats
              ? `<li>📸 <strong>PNG</strong>: ${pngStats.diffPx.toLocaleString()} / ${pngStats.totalPx.toLocaleString()} px changed (<strong>${pngStats.pct.toFixed(3)}%</strong>) ${pngStats.pct > 1 ? '<span class="badge hot">over 1% threshold</span>' : '<span class="badge cold">within threshold</span>'}</li>`
              : ''
          }
          ${
            htmlSum
              ? `<li>📄 <strong>HTML</strong>: ${htmlSum.addCount}+ / ${htmlSum.delCount}− lines${htmlSum.suspicious.length ? ` — <span class="badge hot">${htmlSum.suspicious.length} suspicious</span>` : ''}</li>`
              : ''
          }
          ${
            reqSum
              ? `<li>🌐 <strong>Requests</strong>: ${reqSum.addCount}+ / ${reqSum.delCount}− ${reqSum.addCount + reqSum.delCount === 0 ? '<span class="badge cold">identical</span>' : ''}</li>`
              : ''
          }
        </ul>
        ${htmlSum && htmlSum.suspicious.length > 0 ? renderSummary('🎯 HTML root cause', htmlSum) : htmlSum && htmlSum.addCount > 0 ? renderSummary('HTML changes', htmlSum) : ''}
        ${reqSum && (reqSum.addCount > 0 || reqSum.delCount > 0) ? renderSummary('Request changes', reqSum) : ''}
      </div>`;

    const htmlBlock = htmlOps
      ? `<div class="diff">${renderDiff(htmlOps)}</div>`
      : '<p class="na">(no HTML diff)</p>';

    const reqBlock = reqOps
      ? `<div class="diff">${renderDiff(reqOps)}</div>`
      : '<p class="na">(no requests diff)</p>';

    const defectBadge = d.defect
      ? `<span class="defect-badge">${escapeHtml(d.defect)}</span>`
      : '';
    sections.push(`
      <section class="checkpoint" id="${escapeAnchor(key)}">
        <h2>${defectBadge}${escapeHtml(d.checkpoint)}</h2>
        ${topSummary}
        <details open>
          <summary>📸 Screenshot (side-by-side)</summary>
          ${pngBlock}
        </details>
        <details>
          <summary>📄 Full HTML diff (masked) — ${htmlSum ? `${htmlSum.addCount}+ / ${htmlSum.delCount}−` : 'n/a'}</summary>
          ${htmlBlock}
        </details>
        <details>
          <summary>🌐 Full requests diff (masked) — ${reqSum ? `${reqSum.addCount}+ / ${reqSum.delCount}−` : 'n/a'}</summary>
          ${reqBlock}
        </details>
      </section>
    `);
  }

  // Group nav entries by defect for the sidebar.
  const entries = Array.from(byCheckpoint.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  const groups = new Map<string, Array<[string, Diff]>>();
  for (const [k, d] of entries) {
    const groupKey = d.defect ?? '(single run)';
    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey)!.push([k, d]);
  }
  const navGroups = Array.from(groups.entries())
    .map(([defect, items], i) => {
      const open = i === 0 ? ' open' : '';
      const lis = items
        .map(
          ([k, d]) =>
            `<li><a href="#${escapeAnchor(k)}">${escapeHtml(d.checkpoint)}</a></li>`,
        )
        .join('');
      return `<details${open} class="nav-group"><summary>${escapeHtml(defect)} <span class="count">${items.length}</span></summary><ul>${lis}</ul></details>`;
    })
    .join('');

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Checkpoint diff report</title>
<style>
  :root { color-scheme: dark light; }
  * { box-sizing: border-box; }
  body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
         margin: 0; padding: 0; line-height: 1.4;
         display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; }
  aside { position: sticky; top: 0; height: 100vh; overflow-y: auto;
          background: #101014; border-right: 1px solid #333; padding: 1rem; }
  aside h1 { font-size: 1.05rem; margin: 0 0 .8rem; color: #fdb; }
  aside .meta { font-size: .75rem; color: #888; margin-bottom: 1rem; }
  main { padding: 1.5rem 2rem; max-width: 1400px; }
  h1 { margin-top: 0; }
  .nav-group { margin: .3rem 0; border-bottom: 1px solid #222; padding-bottom: .3rem; }
  .nav-group > summary { cursor: pointer; font-weight: 600; color: #f0d0ff; padding: .35rem 0;
                          text-transform: uppercase; font-size: .78rem; letter-spacing: .04em;
                          list-style: none; }
  .nav-group > summary::-webkit-details-marker { display: none; }
  .nav-group > summary::before { content: '▶'; display: inline-block; width: 1em;
                                  transform: rotate(0deg); transition: transform .15s; color: #888; }
  .nav-group[open] > summary::before { transform: rotate(90deg); }
  .nav-group .count { font-size: .7rem; color: #999; background: #222; padding: 1px 6px;
                      border-radius: 8px; margin-left: .4rem; }
  .nav-group ul { margin: .3rem 0 .5rem 1.2rem; padding: 0; list-style: none; }
  .nav-group li { margin: .15rem 0; }
  .nav-group a { color: #9cf; text-decoration: none; font-size: .78rem;
                 display: block; padding: 2px 6px; border-radius: 3px;
                 white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .nav-group a:hover { background: #1f2a3a; text-decoration: none; }
  section.checkpoint { border: 1px solid #444; border-radius: 6px; padding: 1rem;
                       margin-bottom: 2rem; background: #161618; }
  section.checkpoint h2 { margin: 0 0 .6rem; font-size: 1.1rem; color: #fdb; word-break: break-all; }
  details { margin: .5rem 0; }
  summary { cursor: pointer; font-weight: 600; }
  .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: .8rem 0; }
  .pair figure { margin: 0; }
  .pair figcaption { font-size: .8rem; color: #aaa; margin-bottom: .2rem; }
  .pair img { max-width: 100%; border: 1px solid #333; }
  .triple { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: .8rem; margin: .8rem 0; }
  .triple figure { margin: 0; }
  .triple figcaption { font-size: .8rem; color: #aaa; margin-bottom: .2rem; }
  .triple img { max-width: 100%; border: 1px solid #333; background: #000; cursor: zoom-in; }
  .pair img { cursor: zoom-in; }
  /* Lightbox modal */
  .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,.92); display: none;
              align-items: center; justify-content: center; z-index: 1000; padding: 2rem;
              cursor: zoom-out; }
  .lightbox.on { display: flex; }
  .lightbox img { max-width: 100%; max-height: 100%; box-shadow: 0 0 40px rgba(0,0,0,.8); }
  .lightbox .hint { position: absolute; top: 1rem; right: 1.5rem; color: #ccc;
                     font-size: .85rem; font-family: system-ui, sans-serif; }
  .defect-badge { display: inline-block; background: #4a1a5a; color: #f0d0ff;
                  padding: 2px 8px; border-radius: 10px; font-size: .75rem;
                  margin-right: .6rem; font-weight: 600; text-transform: uppercase;
                  letter-spacing: .05em; }
  .diff { font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
          font-size: 12px; background: #0b0b0d; padding: .6rem;
          max-height: 600px; overflow: auto; border: 1px solid #222; }
  .hunk { margin-bottom: .8rem; }
  .hunk-hdr { color: #888; padding: .2rem 0; border-bottom: 1px dashed #333; margin-bottom: .3rem; }
  .row { white-space: pre-wrap; word-break: break-all; padding: 1px 4px; }
  .row .pfx { display: inline-block; width: 1ch; margin-right: .5ch; color: #666; }
  .row.eq  { color: #9aa; }
  .row.add { background: #0f2a12; color: #9fdc9f; }
  .row.del { background: #2a0f13; color: #f0a0a0; }
  .na { color: #888; }
  .top-summary { background: #1a1a1f; border-left: 3px solid #fdb; padding: .8rem 1rem; margin-bottom: 1rem; border-radius: 4px; }
  .top-summary h3 { margin: 0 0 .4rem; font-size: .95rem; color: #fdb; }
  .top-summary ul { margin: 0; padding-left: 1.2rem; list-style: none; }
  .top-summary li { margin: .2rem 0; color: #ccc; }
  .badge { font-size: .75rem; padding: 1px 6px; border-radius: 3px; background: #333; color: #ccc; margin-left: .3rem; }
  .badge.hot { background: #5a1a1a; color: #fbb; }
  .badge.cold { background: #1a3a1a; color: #bfb; }
  .summary { margin: .6rem 0; }
  .summary h3 { margin: .3rem 0; font-size: .88rem; color: #9cf; }
  .summary.empty { color: #666; font-style: italic; }
  .susp-wrap { margin: .4rem 0; }
  .susp-wrap > summary { background: #2a0f13; border-left: 3px solid #f55;
                          padding: .45rem .8rem; border-radius: 3px;
                          color: #fa5; font-weight: 600; cursor: pointer; }
  .susp { background: #1a0708; padding: .6rem .8rem; margin-top: .3rem;
          border-radius: 3px; max-height: 70vh; overflow: auto;
          border: 1px solid #3a1a1a; }
  .susp pre { margin: 0; white-space: pre-wrap; word-break: break-all;
              color: #fbb; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; }
  .samples pre { max-height: 60vh; overflow: auto; }
  .samples pre { margin: .2rem 0; padding: .4rem; background: #0b0b0d; border-radius: 3px; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 11px; white-space: pre-wrap; word-break: break-all; }
  .samples pre.adds { color: #9fdc9f; }
  .samples pre.dels { color: #f0a0a0; }
  mark { background: #ff0; color: #000; padding: 0 2px; border-radius: 2px; }
</style>
</head>
<body>
<aside>
  <h1>Diff report</h1>
  <div class="meta">${byCheckpoint.size} checkpoint(s)<br>${new Date().toISOString().slice(0, 19).replace('T', ' ')}</div>
  ${navGroups}
</aside>
<main>
<h1>Checkpoint diff report</h1>
<p>Generated ${new Date().toISOString()} — ${byCheckpoint.size} checkpoint(s) with detected drift.</p>
${sections.join('\n')}
</main>
<div class="lightbox" id="lb">
  <span class="hint">click anywhere or press Esc to close</span>
  <img id="lbi" alt="">
</div>
<script>
(function(){
  const lb = document.getElementById('lb');
  const lbi = document.getElementById('lbi');
  document.querySelectorAll('main img').forEach(img => {
    img.addEventListener('click', () => {
      lbi.src = img.src;
      lb.classList.add('on');
    });
  });
  lb.addEventListener('click', () => lb.classList.remove('on'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lb.classList.remove('on');
  });
})();
</script>
</body>
</html>`;

  await fs.writeFile(OUT, html, 'utf8');
  console.log(`[report] wrote ${OUT} — ${byCheckpoint.size} checkpoint(s)`);
  console.log(`[report] open with:  xdg-open ${OUT}`);
}

function escapeAnchor(s: string): string {
  return s.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
