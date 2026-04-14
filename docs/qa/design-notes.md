---
title: Design Notes
source: self
tags: [qa, hackathon, decisions]
created: 2026-04-13
---

# Design Notes — running log

Decisions and deviations from the [[implementation-plan]]. Append-only.

## 2026-04-13

### Gemma model tag
Plan §0.3 specified `gemma4:26b-a4b-q4_K_M`. That tag is not in the Ollama registry. Locally pulled: `gemma4:26b` (17 GB) and `gemma4:e4b` (9.6 GB). Primary = `gemma4:26b`. Fallback on OOM or latency = `gemma4:e4b`. Tag resolves open decision #1 in the plan.

### Modelfile adjustments
- Added "Be Good, Fix things" as core value line at the top of SYSTEM.
- Added caveman-speak directive for conversational prose / reasoning, with an explicit carve-out that test cases, code, tables, commit messages, and quoted errors stay normal. Reason: user preference, keeps chat/journal compact while protecting artefact quality for reviewers.
- Lowered `temperature` from plan default `1.0` to `0.3`. Reason: code + structured-table generation benefits from determinism. High temperature reserved for ideation tasks (not the default mode).
- Alias `qa-gemma` built via `ollama create qa-gemma -f submission/agents/ollama-modelfile`.

### Embedding model
Plan §0.3 specified `nomic-embed-text` — pulled. 768-dim. Also available locally: `bge-m3:latest` (1024-dim, multilingual). Primary = `nomic-embed-text` to match plan; bge-m3 kept as fallback if retrieval quality suffers.

### InvenTree bring-up
`docker compose up -d` requires user to be in `docker` group OR `sudo`. User used `sudo`. Five containers up: caddy (80/443), inventree-server, inventree-worker, postgres, redis. No port published on 8000 — Caddy reverse-proxies to the internal server:8000. Correct base URL is `http://inventree.localhost` (port 80), **not** `http://inventree.localhost:8000` as CLAUDE.md says. Plan + configs updated; CLAUDE.md mismatch noted but not edited (user file).

### Auth token endpoint
Plan §0.1 assumed `POST /api/user/token/` with form data. Actual shape: `GET /api/user/token/` with HTTP Basic auth. Response:
```json
{"token":"inv-<hex>-<yyyymmdd>","name":"","expiry":"2027-04-13"}
```
Token must be sent as `Authorization: Token inv-...`. `helpers/client.ts` (Phase 2.3) will codify this.

### Phase 0.1 verify — PASSED
- `GET http://inventree.localhost/api/` → `{"server":"InvenTree","version":"1.3.0","apiVersion":477,...}`
- `GET /api/user/token/ -u admin:changeme` → token returned

### Obsidian MCP
Port 22360 confirmed listening. `/ide` attach deferred per user cancellation; MCP tools still callable in this session via the Obsidian plugin bridge.

### Scrape coverage (Phase 1.1)
11 pages scraped from `docs.inventree.org/en/stable/part/`: index, create, views, template, revision, pricing, test, stocktake, notification, virtual, trackable.

Plan §1.6 assumed dedicated pages at `parts/categories*`, `parts/parameters*`, `parts/bom*`. Probed all candidates (`/parameter/`, `/parameters/`, `/bom/`, `/category/`, `/categories/`, `/variant/`, `/variants/`) — **all 404**. Those topics are sections inside `index.md` (Part Category, Part Attributes → Virtual/Template/Assembly/Component/Testable/Trackable/Purchaseable/Salable, Locked/Active Parts, Units of Measure, Part Images, Part Import).

Consequence: Phase 1.6 area filters switched from `--context-mode full --area <path>` to `--context-mode retrieve` with targeted semantic queries. Retrieve mode already ranges over the full vault, so no coverage loss. Scraping declared complete.

### Gemma performance — root cause + pivot
Initial runs of `qa-gemma` (gemma4:26b Q4) showed ~24 tok/s and individual Phase 1.6 areas taking 2–10 minutes. `ollama ps` diagnosis:
```
qa-gemma  23 GB  45%/55% CPU/GPU  131072
```
RX9070XT has 16 GB VRAM. 26B Q4 weights (~15 GB) + num_ctx=131072 KV cache inflated model footprint to 23 GB → ~45% of layers spilled to CPU → bottleneck.

Attempted fixes:
1. Lower `num_ctx` to 16384. Model dropped to 20 GB, still 32/68 CPU/GPU — weights alone don't fit with overhead.
2. Switch to `gemma4:e4b` (9.6 GB vision variant). Generation hung; runner got stuck; required `sudo systemctl restart ollama` to recover.
3. **Pivot**: rebuild alias `qa-gemma` `FROM qwen2.5-coder:7b`. 6.3 GB total, 100% GPU, 16384 ctx. Smoke test completed in 2.7 s end-to-end (retrieval + chat). Alias name preserved for zero client-side config churn — `qa-gemma` is now qwen-backed.

Also noticed a Modelfile gap: original `FROM gemma4:26b` build had no `RENDERER`/`PARSER` directive. Parent `gemma4:26b` uses native `RENDERER gemma4` / `PARSER gemma4` per `ollama show`. For qwen-based build, Ollama handles ChatML template via the inherited `TEMPLATE` block — no renderer needed.

Trade-off accepted: less raw capability than gemma4:26b, but 10–20× faster wall-clock and grounded outputs stay correct because RAG does the heavy lifting. `gemma4:26b` remains available for spot checks.

### Phase 1 RAG pipeline bugs fixed
- `vec0` virtual table does not accept a named `INTEGER PRIMARY KEY` column — it uses implicit `rowid`. Schema changed to `CREATE VIRTUAL TABLE chunks USING vec0(embedding FLOAT[768])`, insert uses `(rowid, embedding)`, rowid passed as `BigInt`, embedding passed as `Buffer` (not `Float32Array`). Error shape before fix: `Only integers are allows for primary key values on chunks`.
- `vec0` knn query requires `AND k = ?` inside the `MATCH` filter, not `LIMIT ?`. Error before fix: `A LIMIT or 'k = ?' constraint is required on vec0 knn queries`.
- Both `submission/automation/{ui,api}/tsconfig.json` needed explicit `"types": ["node"]` — `moduleResolution: Bundler` did not auto-resolve `@types/node` from `node_modules/@types` despite the package being installed. `submission/automation/api` also needed `npm install --legacy-peer-deps` because Playwright pulled TypeScript 6.0.2 which conflicted with the `@types/node` peer range.
