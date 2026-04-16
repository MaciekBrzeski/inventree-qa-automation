---
title: "Snapshot 2026-04-16 — final state"
tags: [qa, hackathon, snapshot, coverage]
created: 2026-04-16
---

# Snapshot 2026-04-16 — final state

Frozen state at the end of the hackathon. All tests green, all docs regenerated,
all deliverables shipped.

## Test suite headline

| project | tests | passed | skipped | failed | wall-clock |
|---|---:|---:|---:|---:|---:|
| API (Playwright `automation/api`) | 115 | 107 | 8 | 0 | ~8 s |
| UI (Playwright `automation/ui`) | 101 | 101 | 0 | 0 | 7.7 min |

API skips: stocktake POST 500 (INV-PARTS-005), PUT graceful-skips, bom-substitute
seed-dependent.

## Coverage headline

| metric | value |
|---|---|
| Filtered OpenAPI schema | **83** endpoints |
| Combined API + UI coverage | **79/83 (95.2%)** |
| UI-only coverage (`page.on('request')`) | **50/83 (60.2%)** |
| Paired (both UI + API tests) | **50** |
| API-only | **29** |
| Unpaired (neither) | **4** |
| Feature areas tracked | **16** |
| Bugs filed | **5** (INV-PARTS-001..005) |

## Delta from the Apr 14 snapshot

| metric | Apr 14 | Apr 16 | delta |
|---|---:|---:|---:|
| UI-paired endpoints | 49 | 50 | +1 |
| UI ratio | 59.0% | 60.2% | +1.2 pp |
| Automated UI tests | 84 | 101 | +17 |
| Automated API tests | 97 | 115 | +18 |
| Library examples | 0 | 59 | +59 |
| Template repos | 0 | 3 | +3 |

## What was added since the Apr 14 snapshot

- BOM individual-row delete spec (`o-parts-bom-row-delete-ui.spec.ts`)
- Baseline-seeded spec with populated panels (`0-baseline-seeded.spec.ts`)
- Adjacent dead-list API smoke spec (10 tests)
- Visual regression harness (triple baseline + pixelmatch + 15-defect validator)
- Diff report HTML viewer (lightbox, pixel-diff overlay)
- `qa-harness-template` public GitHub template repo
- `qa-harness-aut-template` public GitHub template repo (generic Docker fixture)
- Local Petstore validation (21/21 green against Docker Petstore, 100% coverage)
- `qa-examples` learning library (42 good + 7 bad = 49 → grown to 59 by session end)
- `generate-test-spec` skill (template + library → first-run green specs)
- `improve-test-pipeline` skill (self-improving generation loop, 5/5 green iterations)
- `test-strategy.md` — formal test strategy document
- `parts-module-overview.md` — entity model + business rules + relationship diagram
- Benchmark: Method C (full skill pipeline) beats raw + template-only on first-run pass rate

## Coverage files

| file | description |
|---|---|
| `coverage.md` | full gap report |
| `coverage-summary.json` | machine-readable {total:83, covered:50, ratio:60.24} |
| `covered.txt` | 50 UI-covered endpoints |
| `uncovered.txt` | 33 uncovered |
| `dead.txt` | 29 dead (outside filtered scope but SPA hits them) |
