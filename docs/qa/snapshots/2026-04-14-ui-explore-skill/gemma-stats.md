# Generation stats

Generated: 2026-04-14T10:29:27.090Z

## RAG index

- Chunks indexed: 641
- Approx tokens in index: 94,289

## Journal entries

- Total journal entries: 34
- Phase 1 generation entries: 14

| task | duration_s | prompt_tok | completion_tok | response_chars | chunks |
|---|---:|---:|---:|---:|---:|
| phase1-ui-creation | — | — | — | 3,024 | 8 |
| phase1-ui-tabs | — | — | — | 25 | 8 |
| phase1-ui-categories | — | — | — | 127 | 8 |
| phase1-ui-attributes | 188.9 | 5221 | 4464 | 48 | 8 |
| phase1-ui-units | 162.4 | 5059 | 3899 | 89 | 8 |
| phase1-ui-tabs | 595.1 | 5947 | 14294 | 2,598 | 10 |
| phase1-ui-categories | 126.9 | 5624 | 3134 | 2,804 | 10 |
| phase1-ui-units | 123.8 | 5872 | 3021 | 2,066 | 10 |
| phase1-ui-parameters | 65.5 | 6140 | 1495 | 158 | 10 |
| phase1-ui-attributes | 15.7 | 5850 | 1228 | 4,575 | 10 |
| phase1-ui-parameters | 12.7 | 5759 | 1015 | 3,921 | 10 |
| phase1-ui-templates | 12.9 | 5594 | 1024 | 4,082 | 10 |
| phase1-ui-revisions | 13.5 | 5044 | 1105 | 4,318 | 10 |
| phase1-ui-negative | 12.0 | 5500 | 949 | 3,665 | 10 |

## Aggregates (phase1-* only)

- Total wall-clock generation: **1329.5 s** (22.16 min)
- Total prompt tokens sent: 61,610
- Total completion tokens generated: 36,423
- Total tokens: 98,033

## Test cases generated

- Total UI cases (UI-PARTS-###): **78**
  - phase1-ui-attributes.md: 12
  - phase1-ui-categories.md: 9
  - phase1-ui-creation.md: 8
  - phase1-ui-negative.md: 10
  - phase1-ui-parameters.md: 8
  - phase1-ui-revisions.md: 8
  - phase1-ui-tabs.md: 9
  - phase1-ui-templates.md: 8
  - phase1-ui-units.md: 6

## Cloud cost avoided (hypothetical)

What the same token volume would have cost on commercial APIs (2026-04 list prices, USD per 1M tokens):

| Model | input $/1M | output $/1M | this run |
|---|---:|---:|---:|
| claude-opus-4-6 | 15.00 | 75.00 | $3.66 |
| claude-sonnet-4-6 | 3.00 | 15.00 | $0.7312 |
| gpt-4o | 2.50 | 10.00 | $0.5183 |

Local generation via Ollama: **$0.00** in API charges. GPU electricity only.

## Throughput

- ~3.5 test cases / minute wall-clock (generation only)

> Note: entries from runs that predate the metrics instrumentation do not have `duration_ms` / token counts.
> For those, response length is approximated at 4 chars/token, and durations are marked as —.
