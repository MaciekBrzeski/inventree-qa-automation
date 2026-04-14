# UI → API correlation report

Generated: 2026-04-14T09:52:53.981Z
Source: `submission/data/ui-explore/click-to-api.jsonl` (65 click records).

Each row is a unique `(route, click target) → api call` correlation observed during ui-explore runs. Use these as the ground truth for writing UI → API correlation tests: a click that historically triggered endpoint X is expected to still trigger endpoint X on every future run; if it stops, either the SPA lost the fetch (regression) or the endpoint was renamed.

## Observed correlations

| route | click | observations | API calls triggered |
|---|---|---:|---|
| `/web/part/category/index/subcategories` | `Category Details` | 2 | `GET /api/part/category/` |
| `/web/part/category/index/subcategories` | `Part Categories` | 2 | `GET /api/part/category/` |

## Suggested UI → API correlation tests

The generated `ui-api-correlation-tests.ts` file below is a seed for a new Playwright spec. Each test navigates to the recorded route, attaches a per-test request listener, clicks the recorded element, and asserts that at least one of the recorded API calls happened inside the click window.
