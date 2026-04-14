---
title: QA Best Practices Reference
source: research
tags: [qa, hackathon, best-practices, playwright, rag, llm, inventree]
created: 2026-04-13
---

# QA Best Practices — Reference

Consolidated best practices for the QAHub Hackathon submission (InvenTree Parts module testing, Gemma-generated via RAG, Claude Code orchestrated). Read before authoring prompts, Page Objects, specs, or test cases.

Companions: [[implementation-plan]], project root `CLAUDE.md`, `/home/wruszbit/.claude/plans/crystalline-twirling-feather.md`.

---

## 1. Playwright Page Object Model (POM)

### Principles
- A Page Object is an abstraction over a page or a meaningful section of it (header, parts table, create-part dialog). It exposes **actions** and **queries**, not raw locators.
- Tests coordinate flows across page objects. Page objects do **not** call other page objects.
- Page objects contain **no assertions**. Assertions live in tests. Page objects may expose `get*` helpers that return values or `Locator`s used by the test for assertions.

### Locator rules
- Define every locator **once**, inside the page object constructor or as a getter. Never inline locators in tests.
- Selector priority (strict order, highest first):
  1. `getByRole` with accessible name
  2. `getByLabel` / `getByPlaceholder` / `getByText` (user-visible)
  3. `getByTestId` — only when roles/labels unavailable. Requires `data-testid` on the element.
  4. CSS/XPath — last resort, document why.
- Never use brittle selectors: nth-child chains, auto-generated class hashes, absolute XPath.
- Use Playwright **locators**, never `page.$`/`$$` (deprecated semantics, no auto-wait).

### Structure
- `submission/ui-tests/pages/` holds page objects. One file per page/section.
- `BasePage` with shared nav/auth/error helpers. All pages extend it.
- Expose pages via **custom fixtures** (see `tests/fixtures.ts`), not `beforeEach` instantiation:
  ```ts
  export const test = base.extend<{ partsPage: PartsPage }>({
    partsPage: async ({ page }, use) => { await use(new PartsPage(page)); },
  });
  ```
- TypeScript only. Strict mode on. Export types for domain entities (`Part`, `Category`, `BomLine`).

### Anti-patterns
- Page object that calls `expect(...)` internally.
- Page object methods returning `void` when the test needs the resulting value.
- "God" page objects that cover the whole app. Split by screen/section.
- Hard-coded waits (`page.waitForTimeout`). Use locator auto-wait or `expect(locator).toBeVisible()`.

---

## 2. Playwright API testing

### Request context
- Use the built-in `request` fixture. It respects `baseURL`, `extraHTTPHeaders`, and `storageState` from `playwright.config.ts`.
- For InvenTree: set `baseURL: http://inventree.localhost:8000` in `playwright.config.ts`. All API specs hit `/api/part/...` etc. via `request.get('/api/part/')`.

### Authentication
- Log in **once** in a global setup (`global.setup.ts`) using `request.post('/api/auth/login/')` or token endpoint. Store the resulting token/cookies via `storageState` or a shared `APIRequestContext`.
- Never log in per test. Slow, flaky, noisy in logs.
- Keep separate contexts for **admin** and **read-only** roles when permission tests matter.

### Test shape
- Arrange: seed required state via API (`POST /api/part/category/`, `POST /api/part/`). Faster and more reliable than UI seeding.
- Act: hit the endpoint under test.
- Assert: status code, response schema (consider `zod`), business fields, and — where relevant — a follow-up `GET` to confirm persistence.
- Clean up in `afterEach` via API DELETE, or use unique names + a `afterAll` bulk cleanup.

### Mixing UI + API
- Prefer API seed → UI assert. Do **not** drive setup through the UI.
- Validate server-side post-conditions after UI actions via a quick API GET.

### Mistakes to avoid
- Mismatched auth headers between UI and API contexts → spurious 401/403.
- Relying on implicit ordering between tests. Each test owns its state.
- Ignoring schema drift. Snapshot critical response shapes.

---

## 3. Test case authoring & traceability

### Case IDs
- UI cases: `UI-PARTS-###`, API cases: `API-PARTS-###`. Zero-padded, monotonic. No gaps, no reuse.
- Every Playwright `test(...)` title **starts** with the case ID: `test('UI-PARTS-001 user creates a part from the Parts list', ...)`.
- Enforce via grep in `submission/scripts/verify.ts`.

### Requirements Traceability Matrix (RTM)
- `submission/test-cases/rtm.md` (or CSV) maps: `Requirement → Case ID → Automated? → Status → Defect IDs`.
- Requirements sourced from `docs/inventree/parts/*` scraped notes. Each scraped page yields one or more requirement rows.
- Build RTM incrementally as cases are generated. Don't defer.
- Target: 100% requirement → at least one case coverage for the Parts module scope.

### Case fields (markdown table)
`ID | Title | Preconditions | Steps | Expected | Priority | Requirement refs | Automated`

### Priority
- P1: create, read, update, delete a Part; list/search; category assignment; stock lookup.
- P2: BOM edit, variants, parameters, bulk actions.
- P3: cosmetic, edge cases, negative auth.

---

## 4. LLM-generated tests — grounding rules

### The rule
**Gemma never invents selectors, endpoints, fields, or UI labels.** Every concrete artefact must be traceable to a chunk retrieved from the vault or a DOM snapshot.

### Grounding sources (in order of trust)
1. **Live DOM snapshot** captured via `playwright codegen` or a scripted `page.content()` dump → saved to `docs/inventree/parts/dom/<screen>.html`.
2. **OpenAPI schema** dump from `/api/schema/` → `docs/inventree/api/openapi.json` + per-endpoint markdown.
3. **Scraped InvenTree docs** under `docs/inventree/parts/` with `source-url` frontmatter.
4. **Authoritative Playwright docs** (only for framework syntax, never for app semantics).

### Prompt discipline
- Every generation prompt includes: task label, retrieved chunks (with `source-url`), output schema (markdown table or TS file), and a "refuse if missing" clause: *"If you cannot ground a step in the provided context, output `TODO: requires DOM/API evidence` instead of guessing."*
- Log prompt + retrieved chunk IDs + response to `docs/qa/prompts-journal.md` via `rag/query.ts`. Non-negotiable audit trail.
- Low temperature (≤ 0.3) for code/spec output. Higher only for brainstorming test ideas, which Claude then curates.

### Post-generation review (Claude's job)
- Every generated spec is reviewed before commit. Checklist:
  - [ ] Selectors match DOM snapshot (grep the snapshot).
  - [ ] Endpoints exist in `openapi.json`.
  - [ ] Case IDs sequential and referenced in RTM.
  - [ ] No `page.waitForTimeout`, no `$`/`$$`, no raw XPath unless justified.
  - [ ] Assertions meaningful (not just `toBeVisible` on the whole page).
- Fail-loop: on Playwright failure, capture trace → feed to `rag/query.ts --task repair-spec` → apply patch → re-run. Document under "Agent fixes" in `submission/README.md`.

### Hallucination defences
- RAG retrieval is the first defence. Chunk small (≤ 512 tokens), embed with `nomic-embed-text`, store in `vectors.db`. Always retrieve ≥ 5 chunks and include `source-url` in the context.
- Golden-set regression: keep ~10 reference Q&A pairs (`docs/qa/golden.md`) and diff Gemma's answers across runs to detect drift.
- Prefer propose-then-execute for risky steps: Gemma proposes a plan, Claude validates before running it.

---

## 5. InvenTree Parts domain — cheatsheet

Authoritative docs: `docs.inventree.org/en/stable/part/`, `docs.inventree.org/en/latest/api/schema/part/`. Mirror into `docs/inventree/parts/` as we scrape.

### Core entities
- **Part** — the unit of inventory. Key fields: `name`, `IPN` (internal part number), `description`, `category` (FK), `active`, `assembly`, `component`, `purchaseable`, `salable`, `virtual`, `trackable`, `in_stock`, `image`, `parameters[]`.
- **PartCategory** — hierarchical tree (parent FK). Parts belong to exactly one category.
- **StockItem** — physical quantity of a Part at a location. A Part's total stock is the sum of its StockItems.
- **BOM (Bill of Materials)** — for `assembly=True` parts. Lines point to sub-component parts with `quantity`, `reference`, `allow_variants`, `substitutes`.
- **Template / Variant** — a template Part has variant children. Stock of template aggregates variants.
- **Parameters** — typed metadata (name/value/units) attached to a Part via `PartParameterTemplate`.

### Key UI actions (Parts module)
- List & search parts (filters: category, active, assembly, in stock, template).
- Create / edit / duplicate / delete part.
- Assign to category; move category.
- Upload image, attach files.
- View/edit BOM (add line, reorder, substitute, validate).
- View stock tab (quantities per location, status).
- Manage parameters.
- Manage variants under a template.

### Key API endpoints (verify vs. `/api/schema/` before use)
- `GET/POST /api/part/` — list/create parts.
- `GET/PATCH/DELETE /api/part/{id}/` — detail.
- `GET/POST /api/part/category/` — categories.
- `GET/POST /api/bom/` — BOM lines.
- `GET /api/stock/?part={id}` — stock for a part.
- `GET/POST /api/part/parameter/` — parameters.

### Test focus areas (hackathon scope)
- P1: Part CRUD (UI + API), category assignment, list/search/filter, stock lookup.
- P2: BOM editing, template/variant relationships, parameter CRUD.
- P3: Negative auth (read-only user tries write), validation errors, image upload edge cases.

---

## 6. Repository conventions

- `submission/ui-tests/` — Playwright UI specs + page objects + fixtures.
- `submission/api-tests/` — Playwright API-only specs.
- `submission/test-cases/` — markdown tables + RTM.
- `submission/agents/` — Gemma client, prompts, RAG pipeline.
- `submission/README.md` — how to reproduce, "Agent fixes" log, metrics.
- `docs/` — Obsidian vault, single source of truth for both Claude and Gemma.
- Do **not** commit `submission/agents/rag/vectors.db`. Do commit `chunks.jsonl`.

---

## Sources

- Playwright POM: https://playwright.dev/docs/pom
- Playwright API testing: https://playwright.dev/docs/api-testing
- Playwright fixtures: https://playwright.dev/docs/test-fixtures
- Playwright auth: https://playwright.dev/docs/auth
- BrowserStack — Playwright best practices 2026: https://www.browserstack.com/guide/playwright-best-practices
- BrowserStack — POM 2026: https://www.browserstack.com/guide/page-object-model-with-playwright
- BrowserStack — Playwright API testing 2026: https://www.browserstack.com/guide/playwright-api-test
- Microsoft — mitigating LLM hallucinations: https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/best-practices-for-mitigating-hallucinations-in-large-language-models-llms/4403129
- Parasoft — controlling LLM hallucinations: https://www.parasoft.com/blog/controlling-llm-hallucinations-application-level-best-practices/
- RTM guide (testomat.io 2026): https://testomat.io/blog/the-ultimate-guide-to-rtm-requirements-traceability-matrix/
- RTM overview (Perforce): https://www.perforce.com/resources/alm/requirements-traceability-matrix
- InvenTree Parts docs: https://docs.inventree.org/en/stable/part/
- InvenTree Part API schema: https://docs.inventree.org/en/latest/api/schema/part/
- InvenTree BOM API schema: https://docs.inventree.org/en/1.1.x/api/schema/bom/
