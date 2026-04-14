# QAHackaton — Claude Code Orchestration Rules

Project: QAHub AI Hackathon 2026 submission. Target app: InvenTree, Parts
module only. Deliverable: agent-generated UI + API test cases and automation.

**Implementation plan + phase notes**: `docs/qa/` (this repo).
**Coverage state**: `docs/qa/coverage/coverage-index.md`.
**Reusable skills**: `.claude/skills/` — `ui-explore`, `api-ui-gap`,
`qa-coverage-loop`.

Read the plan and the current coverage index before any expansion pass.

---

## Identity and roles

- **Claude Code (you)** = orchestrator. Read vault via Obsidian MCP (if
  running) or native Read/Grep. Shell out to Gemma for bulk generation.
  Review, merge, normalize, run tests, iterate on failures.
- **qa-gemma** (local Ollama, `FROM qwen2.5-coder:7b`) = bulk generator.
  Writes markdown tables, Page Objects, spec files. Tool-less. Reached via
  `npx tsx agents/rag/query.ts`.
- **nomic-embed-text** (local Ollama) = embeddings for RAG.
- **Obsidian MCP** (optional) = vault bridge on `localhost:22360`. Exposes
  `view`, `str_replace`, `create`, `insert`, `get_current_file`,
  `get_workspace_files`, `obsidian_api`.
- **InvenTree** = AUT at `http://inventree.localhost`. Creds `admin`/`changeme`.
  Token: `GET /api/user/token/` with HTTP Basic → `{"token": "inv-..."}`.
  Portable Docker stack: <https://github.com/MaciekBrzeski/inventree-qa-docker>.

---

## Knowledge base

Single source of truth is `docs/qa/`. Both Claude and Gemma read from here.

```
docs/qa/
├── implementation-plan.md        # step-by-step plan (read first)
├── design-notes.md               # running decision log
├── prompts-journal.md            # every Gemma interaction
├── coverage/                     # feature-area coverage notes (generated)
├── graph/                        # endpoint ↔ test Obsidian graph (generated)
├── ui-paths/                     # click-path tree (generated)
├── bugs/                         # INV-PARTS-### bug reports
├── retrospective-*.md            # per-phase retrospectives
└── phase-*.md                    # per-phase design notes
```

Generated directories are wiped + rewritten by their generators. Never edit
them by hand — edit the generator's source in `agents/rag/` instead (the
`AREAS` map in `build-coverage-docs.ts` is the usual target).

---

## Rules

1. **Read the vault first.** Before generating any artefact, read the
   relevant `docs/qa/` notes + the current coverage index. Never generate
   from thin air.

2. **Delegate bulk to Gemma.** For anything that produces a large markdown
   table or multiple test files:
   ```bash
   npx tsx agents/rag/query.ts \
     --task <phase>-<area> \
     --system agents/system-instructions.md \
     --context-mode full|retrieve \
     --out <target-path>
   ```
   Stay in orchestrator role. Review, merge, normalize, fix. Do not
   hand-write bulk content.

3. **Everything is logged.** `rag/query.ts` auto-appends
   `{timestamp, prompt, retrieved_chunks, response}` to
   `docs/qa/prompts-journal.md`.

4. **Never commit generated vector store.** `agents/rag/vectors.db` is
   gitignored. `chunks.jsonl` is committed for audit.

5. **Test case IDs.** UI: `UI-PARTS-###` / `UI-<AREA>-###`. API:
   `API-PARTS-###` / `API-<AREA>-###`. Every Playwright `test(...)` title
   must start with its case ID.

6. **Failure loop.** When `npx playwright test` fails, capture the failure,
   feed to Gemma via `query.ts --task repair-spec --input <trace>`, apply
   the patch, re-run. Document every fix under "Agent fixes" in `README.md`.

7. **Selector grounding.** Never let Gemma invent selectors. Run `playwright
   codegen` or a `_probe-*.spec.ts` first, capture the DOM snapshot, feed
   to Gemma.

8. **File naming convention.** Alphabetical prefix controls execution
   order inside each suite:

   | prefix | semantics |
   |---|---|
   | `a-` .. `h-` | setup / happy-path CRUD that creates entities |
   | `i-` .. `x-` | panel-specific flows using those entities |
   | `y-` | UI-driven deletion of session entities |
   | `z-` | API safety-net cleanup |
   | `z1-` | cross-functional flows |
   | `_` | probe / discovery specs (excluded from coverage reports) |

9. **Use the skills.** Any "expand coverage / next pass / close the gaps"
   request → invoke `qa-coverage-loop`. Don't reimplement its phases by
   hand. Sub-skills (`ui-explore`, `api-ui-gap`) are for individual artefacts.

10. **In doubt** → re-read `docs/qa/implementation-plan.md`, re-read
    `docs/qa/coverage/coverage-index.md`, ask before destructive actions.

---

## Counter-patterns to refuse

- Writing a spec without running the doc generators first.
- Adding a raw click chain when a recipe in `automation/ui/paths/recipes.ts`
  already fits.
- Seeding write operations via `createAuthedContext` and calling that "UI
  coverage" — those requests are NOT captured by `page.on('request')` and
  do NOT move the paired count.
- Physical file reorganisation — the coverage docs are driven by the
  `AREAS` map in `build-coverage-docs.ts`; edit the map instead.
- Committing `vectors.db`, `node_modules`, `test-results/`, or
  `data/ui-explore/snapshots/`.
