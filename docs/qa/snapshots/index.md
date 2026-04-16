---
title: "Coverage timeline"
tags: [qa, coverage, history, snapshot]
generated: 2026-04-16T15:46:19.335Z
---

# Coverage timeline

Automatically appended on every main-branch CI run (see `.github/workflows/qa.yml` → "Append coverage-timeline row"). Each row records the UI→API coverage state captured immediately after the baseline artefact upload.

**Latest**: 50/83 (60.2%) at 2026-04-16T14:45:00Z · sha `final-st`

**Delta over 6 snapshots**: +15.7 pp  (37 → 50 covered, 20 → 25 UI specs, 18 → 19 API specs)

## Progress bar

```
  date                 %   bar                                       covered
  2026-04-14      44.6%  ██████████████████░░░░░░░░░░░░░░░░░░░░░░   37/83
  2026-04-14      45.8%  ██████████████████░░░░░░░░░░░░░░░░░░░░░░   38/83
  2026-04-14      45.8%  ██████████████████░░░░░░░░░░░░░░░░░░░░░░   38/83
  2026-04-14      49.4%  ████████████████████░░░░░░░░░░░░░░░░░░░░   41/83
  2026-04-14      59.0%  ████████████████████████░░░░░░░░░░░░░░░░   49/83
  2026-04-16      60.2%  ████████████████████████░░░░░░░░░░░░░░░░   50/83
```

## Full history

| timestamp | covered | total | ratio | UI specs | API specs | sha |
|---|---:|---:|---:|---:|---:|---|
| 2026-04-14T13:54:31Z | 37 | 83 | 44.58% | 20 | 18 | `50c97919` |
| 2026-04-14T16:54:00Z | 38 | 83 | 45.78% | 20 | 18 | `e2c826f0` |
| 2026-04-14T17:28:33Z | 38 | 83 | 45.78% | 20 | 18 | `8ec0d510` |
| 2026-04-14T19:19:37Z | 41 | 83 | 49.40% | 21 | 19 | `6054792a` |
| 2026-04-14T20:24:42Z | 49 | 83 | 59.04% | 24 | 19 | `eaf57440` |
| 2026-04-16T14:45:00Z | 50 | 83 | 60.24% | 25 | 19 | `final-st` |

## Related

- [[coverage/coverage-index|Current feature-area coverage index]]
- [[graph/index|Endpoint ⇄ test graph]]
- [[ui-paths/index|UI click-path tree]]
