import { promises as fs } from 'node:fs';
import { dirname, resolve } from 'node:path';
import TurndownService from 'turndown';

const START_URLS = [
  'https://docs.inventree.org/en/stable/part/',
  'https://docs.inventree.org/en/stable/part/part/',
  'https://docs.inventree.org/en/stable/part/create/',
  'https://docs.inventree.org/en/stable/part/views/',
  'https://docs.inventree.org/en/stable/part/parameter/',
  'https://docs.inventree.org/en/stable/part/bom/',
  'https://docs.inventree.org/en/stable/part/template/',
  'https://docs.inventree.org/en/stable/part/revision/',
  'https://docs.inventree.org/en/stable/part/pricing/',
  'https://docs.inventree.org/en/stable/part/test/',
  'https://docs.inventree.org/en/stable/part/stocktake/',
  'https://docs.inventree.org/en/stable/part/notification/',
];

const HERE = new URL('.', import.meta.url).pathname;
const OUT_ROOT = resolve(HERE, '../../../docs/inventree/parts');
const REPORT_PATH = resolve(OUT_ROOT, '_scrape-report.json');
const SAME_ORIGIN = 'https://docs.inventree.org';
const SUBTREE = '/en/stable/part/';

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});
turndown.remove(['script', 'style', 'nav', 'footer', 'form']);

type PageResult = {
  url: string;
  title: string;
  slug: string;
  file: string;
  words: number;
};

function slugFromUrl(url: string): string {
  const path = new URL(url).pathname;
  return (
    path
      .replace(SUBTREE, '')
      .replace(/\/$/, '')
      .replace(/\//g, '-') || 'index'
  );
}

function extractTitle(html: string, fallback: string): string {
  const m = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  if (m && m[1]) return m[1].replace(/<[^>]+>/g, '').trim();
  return fallback;
}

function extractMain(html: string): string {
  const article = /<article[^>]*>([\s\S]*?)<\/article>/i.exec(html);
  if (article && article[1]) return article[1];
  const main = /<main[^>]*>([\s\S]*?)<\/main>/i.exec(html);
  if (main && main[1]) return main[1];
  return html;
}

function absolutizeImages(html: string, pageUrl: string): string {
  return html.replace(/<img\b([^>]*?)\bsrc=["']([^"']+)["']/gi, (_match, attrs, src) => {
    try {
      const abs = new URL(src, pageUrl).toString();
      return `<img${attrs}src="${abs}"`;
    } catch {
      return `<img${attrs}src="${src}"`;
    }
  });
}

function extractInternalLinks(html: string, base: string): string[] {
  const hrefRe = /href="([^"#?]+)"/g;
  const urls = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = hrefRe.exec(html)) !== null) {
    const href = match[1];
    if (!href) continue;
    try {
      const abs = new URL(href, base).toString();
      if (abs.startsWith(SAME_ORIGIN) && abs.includes(SUBTREE)) {
        urls.add(abs.split('#')[0]!);
      }
    } catch {
      /* ignore */
    }
  }
  return Array.from(urls);
}

async function fetchPage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'QAHackaton-Scraper/1.0 (local research)',
        Accept: 'text/html',
      },
    });
    if (!response.ok) {
      console.error(`[scrape] ${response.status} ${url}`);
      return null;
    }
    return await response.text();
  } catch (err) {
    console.error(`[scrape] error ${url}: ${(err as Error).message}`);
    return null;
  }
}

async function writeAtomic(file: string, content: string): Promise<void> {
  await fs.mkdir(dirname(file), { recursive: true });
  const tmp = `${file}.tmp-${process.pid}`;
  await fs.writeFile(tmp, content, 'utf8');
  await fs.rename(tmp, file);
}

async function main() {
  const queue = [...START_URLS];
  const seen = new Set<string>();
  const results: PageResult[] = [];
  await fs.mkdir(OUT_ROOT, { recursive: true });

  while (queue.length > 0) {
    const url = queue.shift()!;
    if (seen.has(url)) continue;
    seen.add(url);
    const html = await fetchPage(url);
    if (!html) continue;

    const title = extractTitle(html, slugFromUrl(url));
    const mainHtml = absolutizeImages(extractMain(html), url);
    const md = turndown.turndown(mainHtml).trim();
    const slug = slugFromUrl(url);
    const file = resolve(OUT_ROOT, `${slug}.md`);
    const frontmatter = [
      '---',
      `title: ${title.replace(/"/g, '\\"')}`,
      `source-url: ${url}`,
      `scraped-at: ${new Date().toISOString()}`,
      `tags: [inventree, parts, scraped]`,
      '---',
      '',
      `# ${title}`,
      '',
      md,
      '',
    ].join('\n');
    await writeAtomic(file, frontmatter);
    const words = md.split(/\s+/).filter(Boolean).length;
    results.push({ url, title, slug, file, words });
    console.error(`[scrape] ${slug} (${words} words)`);

    for (const link of extractInternalLinks(html, url)) {
      if (!seen.has(link) && !queue.includes(link)) {
        queue.push(link);
      }
    }
  }

  await fs.writeFile(REPORT_PATH, JSON.stringify({ count: results.length, results }, null, 2));
  console.error(`[scrape] wrote ${results.length} pages → ${OUT_ROOT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
