import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';

const HERE = new URL('.', import.meta.url).pathname;
const SNAPSHOT_DIR = resolve(HERE, '../../data/dom-snapshots');
const OUT_DIR = resolve(HERE, '../../../docs/inventree/ui');

type PageSpec = {
  slug: string;
  file: string;
  title: string;
  description: string;
};

const PAGES: PageSpec[] = [
  {
    slug: 'login',
    file: '01-login.html',
    title: 'Login page (`/`)',
    description: 'Unauthenticated landing page with the Mantine login form.',
  },
  {
    slug: 'shell',
    file: '02-shell.html',
    title: 'Authenticated shell (`/web/`)',
    description: 'Post-login landing page. Contains the persistent top navigation and side menu.',
  },
  {
    slug: 'parts-list',
    file: '03-parts-list.html',
    title: 'Parts list / root category view (`/web/part`)',
    description: 'Landing page for the Parts module. Shows the part category tree panel group with nav panels.',
  },
  {
    slug: 'part-detail',
    file: '04-part-detail.html',
    title: 'Part detail page (`/web/part/<pk>`)',
    description: 'Per-part detail view with action buttons, action menus (part/stock/printing/barcode), tab navigation across allocations/attachments/etc.',
  },
  {
    slug: 'nav-drawer',
    file: '06-nav-drawer-open.html',
    title: 'Navigation drawer open (`/web/part` after hamburger click)',
    description: 'Top-level navigation drawer rendered after clicking the hamburger menu. Contains Dashboard / Parts / Stock / Manufacturing / Purchasing / Sales buttons.',
  },
];

function extractAll(html: string): {
  ariaLabels: string[];
  roles: string[];
  headings: string[];
  buttonTexts: string[];
  placeholders: string[];
  links: string[];
  title: string;
} {
  const aria = Array.from(html.matchAll(/aria-label="([^"]+)"/g), (m) => m[1]!);
  const roles = Array.from(html.matchAll(/role="([^"]+)"/g), (m) => m[1]!);
  const headings = Array.from(
    html.matchAll(/<h\d[^>]*>([^<]{1,80})<\/h\d>/g),
    (m) => m[1]!.trim(),
  );
  const placeholders = Array.from(html.matchAll(/placeholder="([^"]{1,60})"/g), (m) => m[1]!);
  const links = Array.from(html.matchAll(/href="(\/web\/[^"?#]*)"/g), (m) => m[1]!);
  const titleMatch = /<title>([\s\S]*?)<\/title>/.exec(html);
  const title = titleMatch?.[1]?.trim() ?? '';

  const buttonTexts: string[] = [];
  const btnRegex = /<button\b[^>]*>([\s\S]*?)<\/button>/g;
  let match: RegExpExecArray | null;
  while ((match = btnRegex.exec(html)) !== null) {
    const inner = match[1] ?? '';
    const text = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text && text.length <= 60) buttonTexts.push(text);
  }

  const uniq = <T>(arr: T[]): T[] => Array.from(new Set(arr));
  return {
    ariaLabels: uniq(aria).sort(),
    roles: uniq(roles).sort(),
    headings: uniq(headings),
    buttonTexts: uniq(buttonTexts),
    placeholders: uniq(placeholders),
    links: uniq(links).sort(),
    title,
  };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  for (const page of PAGES) {
    const htmlPath = resolve(SNAPSHOT_DIR, page.file);
    let html: string;
    try {
      html = await fs.readFile(htmlPath, 'utf8');
    } catch {
      console.error(`[ui-locators] skip ${page.slug}, no snapshot at ${htmlPath}`);
      continue;
    }
    const info = extractAll(html);
    const md = [
      '---',
      `title: "${page.title.replace(/"/g, '\\"')}"`,
      `ui-slug: ${page.slug}`,
      `source-snapshot: ${page.file}`,
      `tags: [inventree, ui, locators, ${page.slug}]`,
      `extracted-at: ${new Date().toISOString()}`,
      '---',
      '',
      `# ${page.title}`,
      '',
      page.description,
      '',
      `Source HTML: \`submission/data/dom-snapshots/${page.file}\` (${html.length} bytes).`,
      `Document title: \`${info.title}\``,
      '',
      '## aria-labels',
      '',
      info.ariaLabels.length > 0
        ? info.ariaLabels.map((a) => `- \`${a}\``).join('\n')
        : '_(none)_',
      '',
      '## Visible button text',
      '',
      info.buttonTexts.length > 0
        ? info.buttonTexts.map((t) => `- ${JSON.stringify(t)}`).join('\n')
        : '_(none)_',
      '',
      '## Roles present',
      '',
      info.roles.length > 0 ? info.roles.map((r) => `- \`${r}\``).join('\n') : '_(none)_',
      '',
      '## Input placeholders',
      '',
      info.placeholders.length > 0
        ? info.placeholders.map((p) => `- ${JSON.stringify(p)}`).join('\n')
        : '_(none)_',
      '',
      '## Headings',
      '',
      info.headings.length > 0 ? info.headings.map((h) => `- ${h}`).join('\n') : '_(none)_',
      '',
      '## Internal /web links',
      '',
      info.links.length > 0 ? info.links.map((l) => `- \`${l}\``).join('\n') : '_(none)_',
      '',
      '## Locator recipes (ready for Playwright)',
      '',
      ...info.ariaLabels
        .slice(0, 25)
        .map((a) => `- \`${a}\`: \`page.getByLabel('${a}')\``),
      ...info.buttonTexts
        .slice(0, 15)
        .map((t) => `- button "${t}": \`page.getByRole('button', { name: '${t.replace(/'/g, "\\'")}' })\``),
      '',
    ].join('\n');
    const outPath = resolve(OUT_DIR, `${page.slug}.md`);
    await fs.writeFile(outPath, md, 'utf8');
    console.error(`[ui-locators] wrote ${outPath} (${md.length} bytes)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
