# Visual regression baselines

This directory stores triple-baseline snapshots for a focused set of UI tests
so that any defect — pixel-level, DOM-level, or API-call-level — is caught on
the next run.

## How it works

The helper `automation/ui/helpers/checkpoint.ts` exposes:

```ts
await captureCheckpoint(page, 'after-submit');
```

Behaviour is driven by `CHECKPOINT_MODE`:

| mode | effect |
|---|---|
| `off` *(default)* | no-op, zero overhead — normal runs are unaffected |
| `capture` | write `<step>.png`, `<step>.html`, `<step>.requests.json` |
| `compare` | read baselines, diff each one, fail the test on any mismatch |

Each call produces three artefacts per checkpoint:

1. **`.png`** — full-viewport screenshot with animations disabled and caret
   hidden. Byte-level hash comparison with a configurable tolerance
   (`CHECKPOINT_PIXEL_TOLERANCE`, default `400` bytes).
2. **`.html`** — full `document.documentElement.outerHTML` run through a
   masking pass that strips timestamps, numeric pks, CSRF tokens, Mantine
   hash ids, and session-tagged IPN values so that deterministic DOM
   differences survive but flaky ones do not.
3. **`.requests.json`** — list of `/api/...` requests fired between the
   previous and current checkpoint, with URLs masked the same way.

## Capturing a fresh baseline

From `automation/ui`:

```bash
CHECKPOINT_MODE=capture npx playwright test \
  tests/a-parts-category-create.spec.ts \
  tests/h-parts-bom-ui.spec.ts \
  tests/k-parts-pricing-ui.spec.ts \
  --reporter=list
```

Verify by committing the resulting tree:

```bash
git status automation/ui/baseline/
git add automation/ui/baseline/
git commit -m "Refresh UI checkpoint baseline"
```

## Running in comparison mode

```bash
CHECKPOINT_MODE=compare npx playwright test --reporter=list
```

On any diff, the helper writes `.actual.png` / `.actual.html` /
`.actual.requests.json` next to the baseline and fails the test with a
pointer to the file. These `.actual.*` files are gitignored.

## Adding new checkpoints

1. Import the helper:

   ```ts
   import { captureCheckpoint } from '../helpers/checkpoint';
   ```

2. Insert calls at the interesting moments — typically
   after the panel finishes loading, after a form is filled, and after a
   submit settles:

   ```ts
   await captureCheckpoint(page, 'panel-loaded');
   await captureCheckpoint(page, 'form-filled');
   await captureCheckpoint(page, 'after-submit');
   ```

3. Re-run `CHECKPOINT_MODE=capture` for that spec, review the output,
   commit.

## Masking policy

See `automation/ui/helpers/checkpoint.ts`. Add new regex entries to
`maskHtml` / `maskRequestUrl` when a new source of flake shows up.
Do not loosen the pixel tolerance without first trying to mask the root
cause — tolerance drift hides real regressions.

## Files

```
baseline/
├── README.md                       # you are here
└── <test-slug>/
    ├── 01-<step>.png
    ├── 01-<step>.html
    ├── 01-<step>.requests.json
    ├── 02-<step>.png
    └── ...
```

Test slug = spec filename + test title, slugified and truncated to 80 chars.
