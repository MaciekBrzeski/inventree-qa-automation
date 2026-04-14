---
title: "Whole process — QAHub Hackathon 2026, InvenTree Parts"
tags: [qa, hackathon, process, documentation, inventree, gemma, rag, playwright]
created: 2026-04-14
---

# Whole process — QAHub Hackathon 2026, InvenTree Parts

Single-file narrative of the end-to-end workflow that produced the hackathon submission: locally-hosted Gemma-driven test case generation, Playwright API + UI suites, two reusable Claude skills, bug findings, and iterative coverage measurement.

Companion documents (each is a deep dive into one section):

- [[implementation-plan]] — the step-by-step plan that drove phases 0–4.
- [[design-notes]] — running decision log with all deviations from the plan.
- [[best-practices]] — Playwright POM, RAG grounding rules, InvenTree Parts cheatsheet.
- [[selector-inventory]] — authoritative UI locator catalogue.
- [[retrospective-phase5-6-ui-explore]] — retro for the ui-explore + api-ui-gap skill loop.
- `docs/qa/bugs/INV-PARTS-00[1-4].md` — four real behaviour findings in InvenTree.
- `docs/qa/snapshots/2026-04-14-ui-explore-skill/` — frozen metrics from the most recent coverage measurement.

---

## 1. Goal

Produce an agent-generated QA submission for the InvenTree Parts module using only local LLMs + Claude Code orchestration. Deliverables:

- Manual test cases (UI + API) covering the Parts module surface.
- Automated Playwright suites (UI + API) that exercise the cases against a running InvenTree.
- A repeatable workflow that a human can re-run without hand-editing prompts.
- Real bug reports written against real behaviour.

---

## 2. Stack

| Layer | Choice | Why |
|---|---|---|
| Orchestrator | Claude Code (Opus 4.6, 1M ctx) | Drives the iteration loop, reviews Gemma output, writes directed specs, runs Playwright, commits. |
| Bulk generator | `qa-gemma` (Ollama alias) | Hackathon constraint: local LLM. Originally `gemma4:26b` Q4; pivoted to `qwen2.5-coder:7b` to fit 16 GB VRAM at 100 % GPU. |
| Embeddings | `nomic-embed-text` (Ollama) | 768-dim, fast, enough for semantic retrieval over a small vault. |
| RAG store | `sqlite-vec` in `vectors.db` | No server, checked into audit log via `chunks.jsonl`. |
| Test runner | Playwright Test (TypeScript) | Same runner for API + UI; first-class `request` + `page.on('request')` recorder. |
| AUT | InvenTree 1.3.0, apiVersion 477 | `inventree/docker-compose.yml`, Caddy on :80 proxying the internal server. |
| Vault | Obsidian | Shared corpus for retrieval + human notes. MCP bridge (`iansinnott/obsidian-claude-code-mcp`) on :22360. |
| Hardware | Ryzen 7, AMD RX 9070 XT (16 GB VRAM), ROCm 7.13 | Local inference, single GPU. |

Model pivot decision is logged in [[design-notes]] under "Gemma performance — root cause + pivot". Short version: `gemma4:26b` + `num_ctx=131072` balloons to 23 GB and spills to CPU; rebuilding `qa-gemma` `FROM qwen2.5-coder:7b` with `num_ctx=16384` gives 100 % GPU and 10–20× speedup.

---

## 3. Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                     Claude Code (orchestrator)                        │
│  - Reads plan + retro                                                 │
│  - Writes prompts, reviews Gemma output, writes directed specs        │
│  - Runs playwright, parses failures, patches, re-runs                 │
└─────────────┬─────────────────────────┬─────────────────────┬─────────┘
              │                         │                     │
              ▼                         ▼                     ▼
  ┌─────────────────────┐   ┌───────────────────────┐   ┌──────────────────┐
  │ Obsidian vault      │   │ Ollama (local)         │   │ InvenTree (AUT)   │
  │ docs/               │   │                        │   │ docker-compose    │
  │ - inventree/parts/  │◀──│ qa-gemma (qwen 7b)     │──▶│ /api/ endpoints   │
  │ - inventree/api/    │   │ nomic-embed-text       │   │ /web/ React SPA   │
  │ - qa/               │   └────────────┬──────────┘   │ Caddy :80 proxy   │
  │ - bugs/             │                │              └────────┬─────────┘
  │ - snapshots/        │                ▼                       │
  └──────────┬──────────┘   ┌─────────────────────────┐          │
             │              │ RAG pipeline            │          │
             └──────────────│ scrape → chunk → embed  │          │
                            │ → vectors.db → query    │          │
                            │ → journal (append-only) │          │
                            └───────────┬─────────────┘          │
                                        │                        │
                                        ▼                        │
                            ┌─────────────────────────┐          │
                            │ Generated artefacts     │          │
                            │ - markdown test cases   │          │
                            │ - TypeScript POMs       │          │
                            │ - Playwright specs      │          │
                            └───────────┬─────────────┘          │
                                        │                        │
                                        ▼                        │
                            ┌─────────────────────────────────────▼──┐
                            │ Playwright runner                      │
                            │ - automation/api/ (40 tests)           │
                            │ - automation/ui/ (33 tests)            │
                            │ - auto-recorder captures every         │
                            │   /api/* request into gap analyzer     │
                            └────────────────────────────────────────┘
```

---

## 4. Phase-by-phase narrative

### Phase 0 — Infrastructure bootstrap

Verified the preconditions and wired the alias model. Pass criteria: `curl http://inventree.localhost/api/` returns a JSON banner, `ollama list` shows both required models, `qa-gemma` is a buildable alias, Obsidian MCP bridges `localhost:22360`.

Key deviations from the plan (all logged in [[design-notes]]):

- AUT URL is `http://inventree.localhost` (port 80 via Caddy), **not** `http://inventree.localhost:8000` as the plan originally said.
- Token endpoint is `GET /api/user/token/` with HTTP Basic, **not** `POST … form`. Tokens prefix with `inv-`.
- `sudo docker compose up -d` required because the hackathon user is not in the `docker` group.
- The plan's requested `gemma4:26b-a4b-q4_K_M` tag does not exist in the Ollama registry; pulled `gemma4:26b` (17 GB) and `gemma4:e4b` (9.6 GB) instead.

Delivered: `submission/` skeleton, git-initialised, `.gitignore`, Playwright bootstrapped for both `ui` and `api` subprojects, RAG dependencies installed, `qa-gemma` Modelfile built with a custom SYSTEM that bakes in "Be Good, Fix things" as the core value and a caveman tone directive with explicit carve-outs for artefact content.

### Phase 1 — RAG pipeline and UI manual test cases

Goal: produce ≥ 60 UI manual test cases for the Parts module, all grounded in retrievable evidence, with every generation logged.

#### 1.1 Scraper — `submission/agents/rag/scrape-inventree.ts`

Crawls `docs.inventree.org/en/stable/part/`, same-origin, subtree-limited. Parses each page's main content with `turndown`, rewrites image `src` attributes to absolute URLs so Obsidian renders them, writes the result with YAML frontmatter to `docs/inventree/parts/<slug>.md` atomically (tmp-file + rename). 11 pages captured. Three guessed URLs (`/part/parameter/`, `/part/bom/`, `/part/category/`) returned 404 because those topics are anchors inside the main `index.md`, not separate pages. Recorded in design-notes and worked around by using retrieval mode everywhere in Phase 1.6.

#### 1.2 Indexer — `submission/agents/rag/index.ts`

Walks `docs/**/*.md`, parses frontmatter with `gray-matter`, chunks by H2 with H3/paragraph sub-splits above 2 000 chars. For each chunk, calls Ollama `/api/embeddings` with `nomic-embed-text`, stores the 768-float vector in a `sqlite-vec` virtual table.

Bugs fixed during this step (all in [[design-notes]]):

- `vec0` does not accept a named `INTEGER PRIMARY KEY` — must use implicit `rowid`. The error text is misleading ("Only integers are allows for primary key values on chunks"). Fix: `CREATE VIRTUAL TABLE chunks USING vec0(embedding FLOAT[768])`, bind the rowid as `BigInt`, and pass the embedding as a `Buffer` (not a `Float32Array`).
- `vec0` k-nn queries require `AND k = ?` inside the `MATCH` predicate, **not** a trailing `LIMIT ?`.

Result: 102 chunks initially, 641 chunks after the API schema was indexed in Phase 2.

#### 1.3 Gemma client — `submission/agents/rag/gemma-client.ts`

Exports `chat()`, `embed()`, and `journalAppend()`. Uses the `openai` package pointed at Ollama's OpenAI-compatible endpoint. Returns a `ChatResult` with `text`, `durationMs`, token counts, and the effective model name so `stats.ts` can aggregate.

#### 1.4 Query CLI — `submission/agents/rag/query.ts`

Commander-based CLI with flags for `--task`, `--system`, `--prompt` / `--prompt-file`, `--context-mode retrieve|full`, `--area`, `--top-k`, `--out`, `--input`, `--temperature`. On every run it:

1. Loads the system instructions file.
2. Builds the retrieved-context block (KNN over `vectors.db` or full-area dump).
3. Calls `chat([system, user])` where the user message is `# Retrieved context\n…\n\n---\n\n# Task\n<prompt>[\n\n--- # Extra input\n<input>]`.
4. Writes the response to `--out` if given, else stdout.
5. Appends a full entry to `docs/qa/prompts-journal.md` via `journalAppend()`.

#### 1.5 System instructions — `submission/agents/system-instructions.md`

Operational contract loaded as the system message. Pins: role, grounding rules, exact column schemas for UI and API test case tables, Playwright TypeScript rules, case-ID format, caveman carve-out (artefacts stay normal, only reasoning is terse), refusal tokens (`NEED_CONTEXT`, `NEED_IDS`, `NEED_SELECTOR`, `NEED_ENDPOINT`), and a "partial output is preferred" clause that was the fix for Phase 1's refusal storm.

#### 1.6 UI manual test case generation

Nine areas: creation, tabs, categories, attributes, units, parameters, templates, revisions, negative. One Gemma call per area, all in `retrieve` mode (because the plan's path filters relied on pages that turned out not to exist).

First batch refused most output (one missing sub-item killed the whole table). Softened `system-instructions.md` with "refuse per case, produce partial tables", then re-ran. Generated **78 UI cases**, merged + renumbered via `submission/agents/rag/merge-ui-cases.ts` into `submission/test-cases/ui-manual-tests.md`. 8 rows were lost during merge because early-era Gemma output had multi-line cells and fenced code blocks that broke the parser. Later runs after the "single-line cells" rule landed are clean.

Gemma performance diagnosis and fix is in the design notes. Short version: `ollama ps` showed `qa-gemma` at 45 % CPU / 55 % GPU because the 23 GB footprint didn't fit in 16 GB VRAM. Rebuild `FROM qwen2.5-coder:7b` → 6.3 GB, 100 % GPU, every area finished in 12–16 s instead of 2–10 min.

### Phase 2 — API tests

#### 2.1 OpenAPI fetch and types — `submission/data/openapi-parts.filtered.json`

```bash
curl -sL 'http://inventree.localhost/api/schema/?format=json' > submission/data/openapi-parts.json
# filter to /api/part + /api/bom, preserve components
python3 -c "<filter script>" > submission/data/openapi-parts.filtered.json
cd submission/automation/api
npx openapi-typescript ../../data/openapi-parts.filtered.json -o types/inventree.d.ts
```

Result: 30 filtered paths, 373 component schemas, 11 k lines of generated TypeScript types. The full spec had 264 paths; filtering to Parts + BOM keeps the coverage denominator honest.

#### 2.2 API manual cases

Five areas — crud, query, category, bom, negative. Generated via the same query CLI with the same grounding rules. Merged into `submission/test-cases/api-manual-tests.md`. 65 cases.

One re-run was needed because Gemma emitted multi-line JSON payloads inside markdown cells. The system-instructions update ("single-line compact JSON, no code fences") fixed it.

#### 2.3 API automation scaffold

- `helpers/client.ts` — `createAuthedContext()` / `createAnonContext()` / `fetchToken()`. The token endpoint uses HTTP Basic (discovered in Phase 0 probe), so `fetchToken()` explicitly builds `Authorization: Basic` instead of relying on Playwright's `httpCredentials` (which only kicks in after a 401 challenge).
- `helpers/schema.ts` — Ajv 8 wrapper that compiles each path-method-status response schema from `openapi-parts.filtered.json` and exposes `validateResponse(path, method, status, body)`. Runtime path templating collapses numeric segments before looking up the schema.
- `helpers/factories.ts` — `makePart(overrides)` / `makeCategory(overrides)` with unique name + IPN per call.
- `global-setup.ts` — logs in once, stores the token in `process.env.INVENTREE_TOKEN`, ensures a `QA-ROOT` category exists, exposes `INVENTREE_QA_ROOT_ID`.

#### 2.4 API specs

Six spec files: `smoke`, `parts-crud`, `parts-category`, `parts-query`, `parts-bom`, `parts-negative`. Generated by Gemma from a context file that included the toolkit signatures plus the known-good `parts-crud.spec.ts` as a reference. Heavy hand review was needed every time:

- Gemma wrapped outputs in ``` ```typescript ``` ``` fences. Post-process strip.
- Gemma hallucinated `ctx.request.get(...)` / `ctx.request({method, url})`. Rewrote to `ctx.get / post / patch / delete`.
- Gemma split every case into its own `describe.serial` block, losing shared state. Collapsed.
- Truncated mid-string on `negative` (ran up against `num_ctx`). Hand-rewrote.

**Final result: 40 / 40 API tests passing in 2.7 s.** Repair loop captured four real InvenTree findings, three of them written up as bug reports ([[INV-PARTS-001-delete-active-part]], [[INV-PARTS-002-openapi-required-drift]], [[INV-PARTS-003-category-not-required]], [[INV-PARTS-004-put-is-bulk-update]]).

### Phase 3 — UI tests

#### 3.1 DOM grounding

Snapshot harness at `submission/automation/ui/tests/_snapshot.spec.ts` logs in and captures HTML + PNG of key pages. Initial version had several broken screenshots (spotlight keyboard shortcut didn't fire, categories mid-skeleton, some snapshots byte-identical). Fixes:

- Per-page `waitForLoader` that polls `.mantine-Loader-root` and blocks until display is `none` or visibility is `hidden`.
- Per-page `waitFor(<real aria-label>)` before calling `page.content()`, no more `waitForTimeout` guessing.
- Removed the broken spotlight branch entirely (Mantine Spotlight ignores programmatic `Control+K`).

Final snapshots: 5 distinct screens (login, shell, parts list, part detail, nav drawer open), all unique md5, all with zero `mantine-Loader-root` elements. The part-detail HTML grew from 108 KB with 14 aria-labels to 113 KB with 31 aria-labels (including `action-menu-part-actions`, `action-menu-stock-actions`, and 23 `nav-panel-part-*` tab labels) once the wait-for-content fix landed.

#### 3.2 Locator inventory

`docs/qa/selector-inventory.md` is the single source of truth for UI locators. Every entry is harvested from a real snapshot. Locator priority: `getByRole` → `getByLabel` → `getByPlaceholder` → `getByTestId` → CSS.

Key discovery: InvenTree's aria-label convention is `action-button-<name>` or `action-menu-<name>[-<action>]`. Once this was recognised, finding new triggers became mechanical:

```
action-menu-add-parts              → action-menu-add-parts-create-part
action-menu-add-parameters         → action-menu-add-parameters-create-parameter
action-menu-part-actions           → action-menu-part-actions-edit / -duplicate / -delete
action-menu-category-actions       → action-menu-category-actions-edit / -delete
action-button-add-part-category    → (opens a form modal, submits via "Submit")
action-button-add-related-part     → (direct button, no menu)
action-button-add-stock-item       → (in the Stock tab)
action-button-add-supplier-part    → (in the Suppliers tab)
```

#### 3.3 Page Objects and fixtures

- `pages/BasePage.ts` — global nav locators (hamburger, search, spotlight, breadcrumb).
- `pages/LoginPage.ts` — username / password / submit.
- `pages/PartsListPage.ts`, `pages/PartDetailPage.ts`.
- `fixtures/auth.ts` — custom fixture that logs in once, caches `storageState` to `.auth/admin.json`, reuses across tests. Also hosts the **auto-recorder** that merges every test's `/api/*` requests into `submission/data/api-ui-gap/per-test-requests.json` for the coverage analyser. Merge-across-runs was added after the first loop iteration — before that, every run overwrote the file and cumulative coverage was impossible.

#### 3.4 Spec files (main suite)

- `smoke.spec.ts` — 3 tests (login, parts list title, part detail action buttons).
- `cross-flow.spec.ts` — the hackathon-required `UI-PARTS-CROSS-001` + 002/003. API-seeds a part, navigates to its detail page, asserts the SPA rendered the part and the action buttons are reachable.
- `parts-navigation.spec.ts` — 5 tests. Hamburger, top-level nav items (Dashboard / Parts / Stock / Manufacturing / Purchasing / Sales), breadcrumb action, global search, notifications.
- `parts-detail-actions.spec.ts` — 5 tests. Each action button + breadcrumb on the part detail page.
- `parts-login-negative.spec.ts` — 3 tests. Wrong password, empty password, blank form.
- `a-parts-category-create.spec.ts` — 3 tests. UI-driven category creation via `action-button-add-part-category` → Mantine modal → Submit. Captures `POST /api/part/category/`.
- `b-parts-create.spec.ts` — 4 tests. UI-driven part creation via `action-menu-add-parts` → `action-menu-add-parts-create-part` → form → Submit. Captures `POST /api/part/` + `PATCH /api/part/{id}/` via the `action-menu-part-actions-edit` flow.
- `y-parts-ui-delete.spec.ts` — 2 tests. UI-driven deletion via `action-menu-part-actions-delete` and `action-menu-category-actions-delete` with confirm-modal submit. Captures `DELETE /api/part/{id}/` and `DELETE /api/part/category/{id}/`. Needs a `PATCH active=false` + `page.reload()` before the part delete because InvenTree disables the Delete menu item on active parts.
- `z-parts-cleanup.spec.ts` — 3 tests. Session-tagged safety-net cleanup that runs last alphabetically.
- `_snapshot.spec.ts` — snapshot harness (DOM grounding, not a behavioural test).
- `_explore.spec.ts` — the discovery walker (Phase 5 skill, see §5).

**Final result: 33 / 33 UI tests passing, no flakes, 2.7 min wall-clock.**

### Phase 4 — Packaging

Running. The [[retrospective-phase5-6-ui-explore]] is the start of the packaging data. The final submission package will include:

- `submission/README.md` — overview, how to reproduce, agent workflow, agent-fix log, known limitations, bug links.
- `submission/agents/logs/` — copies of `docs/qa/prompts-journal.md`, Claude Code session, `CLAUDE.md`, `stats.md`.
- `submission/video/` — OBS recording of the workflow end-to-end.
- `submission/test-cases/ui-manual-tests.md` + `api-manual-tests.md` — the curated cases.
- `submission/data/` — OpenAPI snapshot, DOM snapshots, api-ui-gap outputs, ui-explore outputs.
- `docs/qa/snapshots/2026-04-14-ui-explore-skill/` — frozen metrics.

### Phase 5 — `ui-explore` skill

First reusable Claude skill, at `.claude/skills/ui-explore/SKILL.md`. Implementation: `submission/automation/ui/tests/_explore.spec.ts`.

**Algorithm**: depth-first walker with a click budget (`MAX_CLICKS`), bounded by `MAX_DEPTH`. Starts from one or more `SEED_ROUTES`. For each seed: wait for loaders, snapshot DOM + PNG, enumerate all visible interactive elements (`button`, `a[role="button"]`, `[role="menuitem"]`, `[role="tab"]`), enqueue. The loop pops the newest candidate (LIFO so action menu items get visited while the menu is still on screen), skips destructive text (`/delete|remove|log.?out|reset|drop/i`), attaches a short-lived `page.on('request')` listener, clicks the candidate via a fallback strategy chain (`getByLabel` → `getByRole('tab')` → `getByRole('button')` → `getByRole('menuitem')` → `getByRole('link')` → `getByText`), writes the click's API calls to a cumulative `click-to-api.jsonl`, diffs before/after DOM enumerations, and only enqueues children that were NOT visible before the click (so menu items and modal inputs are marked as true descendants of the trigger).

**Dedup keying**: `${route}::${contentKey}::${label || text}` where `contentKey` is the first 8 hex chars of md5-of-stripped-HTML. Stripping volatile bits (millisecond timestamps, hex ids, generated Mantine ids) keeps the same-page state stable while letting menu-open and menu-closed be different namespaces.

**Outputs** in `submission/data/ui-explore/`:

- `snapshots/*.html` + `*.png` — per-state DOM and screenshots.
- `snapshots/_inventory.json` — aggregated labels / button texts per state.
- `click-to-api.jsonl` — cumulative across runs (a run-marker line separates invocations).
- `run-log.jsonl` — one line per click with effect, duration, new labels count.
- `coverage.md` — routes visited, unique elements per route, backlog of unexplored elements.

Consumer: `submission/agents/rag/ui-api-correlation.ts` aggregates `click-to-api.jsonl` by `(route, candidate) → Set<api calls>`, dedupes, and writes:

- `ui-api-correlation.md` — human-readable table of observed mappings.
- `ui-api-correlation-tests.ts` — auto-generated Playwright spec template with optional ancestor-click replay (form-fill heuristic: any ancestor matching `action-button-add-*` triggers a `name` input auto-fill before the next click). **Not checked into the running suite** — too many state-dependent flakes (React Query cache, pagination state). Kept as a reference artefact.

### Phase 6 — `api-ui-gap` skill

Second reusable skill, at `.claude/skills/api-ui-gap/SKILL.md`. Measures **which OpenAPI endpoints are exercised by at least one UI test, and which aren't**.

**Two moving parts**:

1. **Auto-recorder fixture** in `fixtures/auth.ts`. Every test that imports `test` from there gets an `{ auto: true }` fixture that installs `page.on('request')` + `page.on('response')` listeners, filters to `/api/` URLs, normalises, and appends to a per-test map. On fixture teardown, the map is **merged** into any existing `submission/data/api-ui-gap/per-test-requests.json` so successive test runs accumulate rather than overwrite.
2. **Analyzer** in `submission/agents/rag/api-ui-gap.ts`. Reads the per-test requests file, strips query strings, collapses numeric segments to `{id}`, skips OPTIONS preflights, diffs against the `(method, path)` set from `submission/data/openapi-parts.filtered.json`. Emits:

| file | contents |
|---|---|
| `covered.txt` | endpoints hit by at least one UI test |
| `uncovered.txt` | endpoints in OpenAPI with no UI hit |
| `dead.txt` | requests observed that don't map to any OpenAPI entry (out-of-scope) |
| `seeds.json` | per-uncovered-endpoint heuristic mapping to a `/web/` route for ui-explore |
| `coverage.md` | headline report |

**Footgun**: any request made through a separate `APIRequestContext` (i.e. `createAuthedContext()` in `helpers/api.ts`) is **not** captured by `page.on('request')`. This is intentional — we only want to count SPA-initiated fetches — but it bit me several times when I seeded data via the separate context and wondered why coverage didn't move.

### Phase 7 — Next iteration (in progress)

Retro-driven list of improvements at [[retrospective-phase5-6-ui-explore]]. Current session started directed specs for uncovered panels; parked a draft for `POST /api/part/related/` because the Mantine combobox locator needs more probing.

---

## 5. Test suite — what actually ships

| project | tests | passed | failed | flakes | wall-clock |
|---|---:|---:|---:|---:|---:|
| API (`submission/automation/api`) | 40 | 40 | 0 | 0 | 2.7 s |
| UI (`submission/automation/ui`) | 33 | 33 | 0 | 0 | 2.7 min |
| **total** | **73** | **73** | **0** | **0** | **≈ 3 min** |

Every run captures its own `per-test-requests.json` (merged), which feeds `api-ui-gap.ts` for the coverage report.

### Verbs exercised via UI → API

```
POST   /api/part/                      tests/b-parts-create.spec.ts     UI-PART-002
POST   /api/part/category/             tests/a-parts-category-create…   UI-CATEGORY-002
PATCH  /api/part/{id}/                 tests/b-parts-create.spec.ts     UI-PART-004
DELETE /api/part/{id}/                 tests/y-parts-ui-delete.spec.ts  UI-DELETE-001
DELETE /api/part/category/{id}/        tests/y-parts-ui-delete.spec.ts  UI-DELETE-002
```

All five writes happen from real Mantine modal submits, not from out-of-band API seeds.

---

## 6. Bug findings

All filed in `docs/qa/bugs/`, all discovered by running the generated tests (not by reading docs).

| id | severity | kind | one-liner |
|---|---|---|---|
| [[INV-PARTS-001-delete-active-part\|INV-PARTS-001]] | low | behaviour-finding | `DELETE /api/part/{id}/` refuses with HTTP 400 on active parts; no error message, no schema entry, no doc note. Workaround: `PATCH {active: false}` then DELETE. |
| [[INV-PARTS-002-openapi-required-drift\|INV-PARTS-002]] | low | schema-drift | OpenAPI `required` includes `category_name`, but the `PartBrief` list response omits it. Any generator that trusts the schema fails to validate real responses. |
| [[INV-PARTS-003-category-not-required\|INV-PARTS-003]] | low | spec-drift | `POST /api/part/` with only `{name}` returns 201. Neither the schema nor the UI imply `category` is optional, but the backend silently allows `null`. |
| [[INV-PARTS-004-put-is-bulk-update\|INV-PARTS-004]] | low | documentation-gap | `PUT /api/part/` is an undocumented bulk-update endpoint. Sending `{}` returns 400 with `{"non_field_errors":"List of items must be provided for bulk operation"}`, confirming the endpoint exists but has no public contract. |

Each report has: frontmatter (id / status / severity / priority / kind / found-by), summary, environment, repro steps, impact, three ordered fix proposals, workaround applied in this repo (with file + line), evidence pointers (curl transcripts, Playwright runs, journal entries), wikilinks, timeline.

---

## 7. Metrics

### Gemma generation (via `submission/agents/rag/stats.ts`)

- Total wall-clock generation (all phase1 + phase2 runs): **≈ 22 min** across 14 entries.
- Prompt tokens total: ~61 k.
- Completion tokens total: ~36 k.
- Total tokens: ~98 k.
- Throughput post-pivot to qwen: **14 s per area**, ~25 tok/s completion.
- **Cloud API cost avoided** at 2026-04 list prices:
  - Claude Opus 4.6: **$3.66**
  - Claude Sonnet 4.6: **$0.73**
  - GPT-4o: **$0.52**
- Local generation via Ollama: **$0.00** in API charges (GPU electricity only).

### UI → API coverage (via `submission/agents/rag/api-ui-gap.ts`)

Headline from the 2026-04-14 snapshot (`docs/qa/snapshots/2026-04-14-ui-explore-skill/`):

| | value |
|---|---:|
| Endpoints in filtered OpenAPI (`/api/part` + `/api/bom`) | **83** |
| Covered by at least one UI test | **11** |
| Uncovered | **72** |
| Dead (out-of-scope requests) | **15** |
| **Coverage ratio** | **13.3 %** |

Breakdown by verb:

| verb | covered |
|---|---:|
| GET | 6 |
| POST | 2 |
| PATCH | 1 |
| DELETE | 2 |

The dead bucket is InvenTree's auxiliary endpoints (`/api/auth/*`, `/api/user/*`, `/api/settings/*`, `/api/notifications/*`, `/api/icons/`, `/api/news/`, `/api/generic/status/`, `/api/system-internal/observability/end/`). None are bugs — they're outside the filtered schema.

### Test case authoring

| file | cases | source |
|---|---:|---|
| `submission/test-cases/ui-manual-tests.md` | **70** (78 generated, 8 lost to multi-line cells in early runs) | 9 Gemma calls, one per area |
| `submission/test-cases/api-manual-tests.md` | **65** | 5 Gemma calls, one per endpoint group |

---

## 8. How to reproduce

Read `submission/README.md` for the full runbook. Short version:

```bash
# 0. Preconditions
cd inventree && sudo docker compose up -d        # Postgres + redis + worker + server + Caddy
systemctl --user start ollama
ollama pull gemma4:26b nomic-embed-text qwen2.5-coder:7b

# 1. Build qa-gemma alias (qwen-backed after the pivot)
cd submission
ollama create qa-gemma -f agents/ollama-modelfile

# 2. Scrape the InvenTree docs + index the vault
cd agents/rag
npm install
npx tsx scrape-inventree.ts        # writes docs/inventree/parts/*.md
npx tsx openapi-to-md.ts            # writes docs/inventree/api/*.md (requires openapi-parts.filtered.json)
npx tsx index.ts                    # builds vectors.db from docs/**/*.md

# 3. Generate manual test cases (one area per call)
npx tsx query.ts --task phase1-ui-creation --system ../system-instructions.md \
    --prompt-file ../prompts/phase1-ui-creation.md --context-mode retrieve --top-k 8 \
    --out ../../../docs/qa/phase1-ui-creation.md
# … 8 more areas …
npx tsx merge-ui-cases.ts           # emits submission/test-cases/ui-manual-tests.md

# 4. Fetch the OpenAPI schema, filter, generate types
cd ../..
curl -sL 'http://inventree.localhost/api/schema/?format=json' > data/openapi-parts.json
python3 -c 'import json; d=json.load(open("data/openapi-parts.json")); …' > data/openapi-parts.filtered.json
cd automation/api
npx openapi-typescript ../../data/openapi-parts.filtered.json -o types/inventree.d.ts

# 5. Run the suites
cd submission/automation/api && npx playwright test
cd ../ui && npx playwright test

# 6. Coverage report
cd ../../agents/rag
npx tsx api-ui-gap.ts              # reads per-test-requests.json, writes coverage.md

# 7. Optional: run the ui-explore skill
cd ../../automation/ui
MAX_CLICKS=80 MAX_DEPTH=3 SEED_ROUTES=/web/part,/web/partcategory/1 \
    npx playwright test tests/_explore.spec.ts
cd ../../agents/rag
npx tsx ui-api-correlation.ts
```

Environment variables honoured by the harness:

- `INVENTREE_URL` (default `http://inventree.localhost`)
- `INVENTREE_USER` / `INVENTREE_PASS` (default `admin` / `changeme`)
- `OLLAMA_BASE_URL` (default `http://localhost:11434/v1`)
- `QA_CHAT_MODEL` (default `qa-gemma`)
- `QA_EMBED_MODEL` (default `nomic-embed-text`)
- `MAX_CLICKS`, `MAX_DEPTH`, `SEED_ROUTES` (for the explorer)

---

## 9. Retrospective highlights

Full retro at [[retrospective-phase5-6-ui-explore]]. Four headlines:

### What worked

1. **Discovery → directed handoff**: walker finds the button, hand-written spec ships the test. Every coverage jump came from this pattern.
2. **Cumulative recorder** (merge-across-runs): small change, huge payoff. Before: each invocation overwrote. After: the union of all runs is always on disk.
3. **OpenAPI filter as denominator**: 83 is honest, 264 is demoralising.
4. **InvenTree's `action-{button,menu}-<name>-<action>` convention**: once recognised, finding triggers is mechanical.

### What didn't

1. **Auto-generated correlation tests are brittle** — React Query cache, pagination state, chain false positives. Kept as reference markdown, not as running tests.
2. **Gemma-generated spec code** needs so much post-processing that hand-writing is faster. Gemma is great at manual test case tables, poor at runnable TypeScript.
3. **DFS walker drifts away from seeds** — after 20–30 clicks the walker is three subtrees deep from where it started. Needs phase-based resets.
4. **Separate `APIRequestContext` footgun** — seeding via `createAuthedContext` doesn't count toward coverage. Documented prominently now.
5. **Mantine Spotlight keyboard shortcut** doesn't respond to programmatic `Control+K`. Entire "search for action by name" path was blocked; had to discover every button via DOM enumeration.

### Top three things to fix next (by leverage)

1. **Coverage phase runner** — single script that chains suite → gap → explore → suite → gap, stops when two iterations don't grow the covered set. Removes the cd-and-run friction.
2. **Stable global-setup fixture** — one QA-seed assembly with BOM + stock + parameter referenced by every spec, so the walker finds rich panels to click.
3. **Phase-based exploration** with hard-reset between seeds so the walker doesn't drift.

---

## 10. Known limitations

- UI coverage sits at 13.3 %. The remaining 72 uncovered endpoints are mostly per-panel sub-resources (parameters, stocktake, test-template, thumbs, internal-price, sale-price, bom substitutes) that require deeper directed specs. Next iteration targets **20 / 83 = 24 %**.
- The merge-ui-cases script dropped 8 rows during early Phase 1 runs because of multi-line cells in early Gemma output. Newer runs are clean, but the lost rows are not recovered.
- Auto-generated UI correlation tests are not in the running suite — they exist only as a reference artefact.
- Mantine Spotlight is not programmatically reachable; discovery relies on DOM enumeration instead.
- The `_probe-*` draft specs under `submission/automation/ui/tests/` are work-in-progress locator experiments — none are checked into the production suite.
- The part-create flow currently leaves the edit form empty except for `description`. A richer Edit spec would also set parameters/stock/price and exercise more PATCH payloads.
- The explorer can open action menus but sometimes misses children inside them when dedup key collides; content-hash dedup fixes the common case but there are edge cases (Mantine autogenerated ids) where volatile-bit stripping is imperfect.

---

## 11. Where everything lives

```
QAHackaton/
├── CLAUDE.md                                   # orchestrator rules
├── docs/                                       # Obsidian vault
│   ├── inventree/
│   │   ├── parts/*.md                          # scraped docs (Phase 1.1)
│   │   ├── api/*.md                            # OpenAPI per-endpoint notes (Phase 2.1)
│   │   └── ui/*.md                             # compact locator maps (Phase 3.1)
│   ├── qa/
│   │   ├── implementation-plan.md              # step-by-step plan
│   │   ├── design-notes.md                     # decision log
│   │   ├── best-practices.md                   # Playwright / RAG grounding rules
│   │   ├── selector-inventory.md               # authoritative UI locators
│   │   ├── prompts-journal.md                  # every Gemma call, full audit
│   │   ├── bugs/INV-PARTS-00[1-4].md           # real bug reports
│   │   ├── snapshots/2026-04-14-ui-explore-skill/  # frozen metrics
│   │   ├── retrospective-phase5-6-ui-explore.md
│   │   └── whole-process.md                    # THIS FILE
│   └── README.md
├── inventree/
│   ├── docker-compose.yml                      # AUT stack
│   └── .env
├── .claude/
│   └── skills/
│       ├── ui-explore/SKILL.md
│       └── api-ui-gap/SKILL.md
└── submission/
    ├── README.md                               # runbook + agent-fix log
    ├── agents/
    │   ├── ollama-modelfile                    # qa-gemma SYSTEM + params
    │   ├── system-instructions.md              # per-call output contract
    │   ├── prompts/phase[12]-*.md              # prompt files per area
    │   ├── logs/stats.md                       # Gemma timing + cost-avoided
    │   └── rag/
    │       ├── gemma-client.ts                 # chat + embed + journalAppend
    │       ├── query.ts                        # generation CLI
    │       ├── scrape-inventree.ts             # Phase 1.1
    │       ├── index.ts                        # Phase 1.2
    │       ├── openapi-to-md.ts                # Phase 2.1
    │       ├── merge-ui-cases.ts               # Phase 1.6
    │       ├── merge-api-cases.ts              # Phase 2.2
    │       ├── stats.ts                        # Gemma cost + throughput aggregator
    │       ├── api-ui-gap.ts                   # Phase 6 coverage diff
    │       ├── ui-api-correlation.ts           # Phase 5 correlation report
    │       ├── extract-ui-locators.ts          # compact locator maps for RAG
    │       ├── package.json
    │       ├── tsconfig.json
    │       ├── vectors.db                      # gitignored
    │       └── chunks.jsonl                    # audit log of indexed chunks
    ├── automation/
    │   ├── api/
    │   │   ├── playwright.config.ts
    │   │   ├── global-setup.ts
    │   │   ├── helpers/{client,schema,factories}.ts
    │   │   ├── types/inventree.d.ts            # generated by openapi-typescript
    │   │   └── tests/{smoke,parts-{crud,category,query,bom,negative}}.spec.ts
    │   └── ui/
    │       ├── playwright.config.ts
    │       ├── fixtures/auth.ts                # custom fixture + auto-recorder
    │       ├── helpers/api.ts                  # seed helper (separate context!)
    │       ├── pages/{Base,Login,PartsList,PartDetail}Page.ts
    │       └── tests/
    │           ├── _snapshot.spec.ts           # DOM grounding
    │           ├── _explore.spec.ts            # ui-explore walker
    │           ├── smoke.spec.ts
    │           ├── cross-flow.spec.ts
    │           ├── parts-navigation.spec.ts
    │           ├── parts-detail-actions.spec.ts
    │           ├── parts-login-negative.spec.ts
    │           ├── a-parts-category-create.spec.ts
    │           ├── b-parts-create.spec.ts
    │           ├── y-parts-ui-delete.spec.ts
    │           └── z-parts-cleanup.spec.ts
    ├── data/
    │   ├── openapi-parts.json                  # full fetched schema
    │   ├── openapi-parts.filtered.json         # /api/part + /api/bom only
    │   ├── dom-snapshots/                      # Phase 3.1 HTML + PNG
    │   ├── ui-explore/                         # skill outputs (snapshots, logs, correlation)
    │   ├── api-ui-gap/                         # coverage reports (covered, uncovered, dead)
    │   └── ui-crud-state.json                  # session state between a→b→y→z specs
    ├── test-cases/
    │   ├── ui-manual-tests.md                  # 70 merged UI cases
    │   └── api-manual-tests.md                 # 65 merged API cases
    ├── video/                                  # OBS recording (Phase 4.3)
    └── .gitignore
```

---

## 12. Next steps

From the retro, the ordered improvement list the next session should consult:

1. Coverage phase runner
2. Stable global-setup fixture (QA-seed assembly + BOM + stock + parameter)
3. Phase-based exploration anchored per seed
4. Behaviour-based correlation filtering (≥ 2 runs, never 0 calls)
5. Per-test browser context for deterministic coverage
6. Gap-biased correlation generator (prefer uncovered endpoints)
7. `trend.csv` appended by every `api-ui-gap.ts` run
8. Reusable click-chain fixture for hand-written specs
9. `SKILL.md` files get concrete "how to iterate" bash blocks
10. Feed this retro + this document into the next planning session

Baseline for comparison next iteration:

| metric | now | target |
|---|---:|---:|
| endpoints covered | 11 | 20 |
| ratio | 13.3 % | 24 % |
| POST covered | 2 | 3 |
| PATCH covered | 1 | 3 |
| DELETE covered | 2 | 3 |
| UI tests in suite | 33 | 40 |
| flakes | 0 | 0 |
| bugs filed | 4 | ≥ 5 |
| cumulative walker click-to-api lines | ~20 | ≥ 100 |
