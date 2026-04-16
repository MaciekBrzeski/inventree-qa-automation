---
title: "Parts module overview — entities, relationships, business rules"
tags: [qa, parts, bom, architecture, overview]
created: 2026-04-16
---

# Parts module overview

High-level map of the InvenTree Parts module — what it does, how entities
relate, and which business rules the test suite validates.

## Entity model

```
┌─────────────────────────────────────────────────────────────────┐
│                        Part Category                            │
│  pk, name, parent (self-FK), description, structural            │
│  └── Category Parameters (FK → ParameterTemplate, default_value)│
└─────────────┬───────────────────────────────────────────────────┘
              │ category FK
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                            Part                                  │
│  pk, name, IPN, description, category FK                        │
│  Flags: active, assembly, component, trackable, purchaseable,   │
│         salable, virtual, template                               │
│                                                                  │
│  ┌── BOM Items (part=assembly FK, sub_part=component FK, qty)   │
│  │   └── BOM Substitutes (bom_item FK, part FK)                 │
│  │   └── BOM Validation (valid flag per line + per assembly)    │
│  │                                                               │
│  ├── Part Parameters (part FK, template FK → ParameterTemplate) │
│  ├── Test Templates (part FK, test_name, required, description) │
│  ├── Related Parts (part_1 FK, part_2 FK, note) — M2M          │
│  │                                                               │
│  ├── Internal Price Breaks (part FK, quantity, price, currency) │
│  ├── Sale Price Breaks (part FK, quantity, price, currency)     │
│  │                                                               │
│  ├── Stock Items (part FK, quantity, location FK, serial, batch)│
│  ├── Stocktake Reports (part FK, quantity, date, cost)          │
│  └── Thumbnails (part FK, image file)                           │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────┐
│         Parameter Template           │
│  pk, name, units, description        │
│  (shared across parts + categories)  │
└──────────────────────────────────────┘
```

## Key relationships

| from | to | FK | cardinality | notes |
|---|---|---|---|---|
| Part | Part Category | `category` | N:1 | every part belongs to one category; category is nullable (INV-PARTS-003) |
| Part Category | Part Category | `parent` | N:1 (self) | tree hierarchy; root has `parent=null` |
| BOM Item | Part (assembly) | `part` | N:1 | the parent assembly |
| BOM Item | Part (component) | `sub_part` | N:1 | the child component |
| BOM Substitute | BOM Item | `bom_item` | N:1 | alternative component for a BOM line |
| BOM Substitute | Part | `part` | N:1 | the substitute part itself |
| Part Parameter | Part | `part` | N:1 | value of a parameter on a specific part |
| Part Parameter | Parameter Template | `template` | N:1 | which parameter (e.g. "Weight") |
| Category Parameter | Part Category | `category` | N:1 | default parameter value for all parts in this category |
| Category Parameter | Parameter Template | `parameter_template` | N:1 | links to the template definition |
| Test Template | Part | `part` | N:1 | test definition attached to a specific part |
| Related Part | Part × 2 | `part_1`, `part_2` | M:M | symmetric link between two parts |
| Internal/Sale Price Break | Part | `part` | N:1 | pricing tier at a given quantity |
| Stock Item | Part | `part` | N:1 | physical inventory instance |
| Stocktake | Part | `part` | N:1 | audit snapshot of stock quantity |

## Business rules validated by the test suite

### Part lifecycle

1. **Active parts cannot be deleted** — `DELETE /api/part/{id}/` returns 400 on `active=true`. Must `PATCH {active: false}` first. Discovered as INV-PARTS-001, validated by every delete flow in the suite.
2. **Category is optional** — `POST /api/part/` accepts `{name: "x"}` with no category despite the OpenAPI schema marking it required. Documented as INV-PARTS-003.
3. **IPN uniqueness** — duplicate IPN on create returns 400. Tested in parts-negative spec.
4. **Boolean flags control panel visibility** — setting `assembly=true` shows the BOM tab; `salable=true` shows sale pricing; `testable=true` shows test templates. Tested via attribute round-trip spec.

### BOM rules

5. **Assembly flag required** — only parts with `assembly=true` can have BOM lines.
6. **Component flag required** — only parts with `component=true` can be used as `sub_part`.
7. **BOM validation** — each BOM line has a `validated` flag; the assembly has a `bom_validated` flag. Validate via `PATCH /api/bom/{id}/validate/` (line) or `PATCH /api/part/{id}/bom-validate/` (assembly-wide). SPA sends PUT for these, not PATCH.
8. **BOM substitutes** — a BOM line can have N substitute parts. Add via `POST /api/bom/substitute/`, remove via the Edit Substitutes dialog's `action-button-remove-this-row`.
9. **BOM copy** — `POST /api/part/{id}/bom-copy/` copies BOM from another assembly. No UI entry found in InvenTree 1.3.0.

### Pricing rules

10. **Internal pricing gated by setting** — `PART_INTERNAL_PRICE` global setting must be `true` for the Internal Pricing sub-panel to appear. Without it, only Sale Pricing is visible.
11. **Price breaks are quantity-tiered** — each break has (quantity, price, currency). Multiple breaks per part.
12. **Pricing recalc** — `action-menu-pricing-actions → Refresh` fires `PATCH /api/part/{id}/pricing/` to recalculate the rollup.

### Category rules

13. **Hierarchical tree** — `GET /api/part/category/tree/` returns the full tree. Categories can be nested to arbitrary depth.
14. **Category parameters** — a category can define default parameter values via `/api/part/category/parameters/`. These propagate to all parts in the category.

### Stocktake

15. **POST stocktake is broken** — `POST /api/part/stocktake/` returns 500 (TypeError). Filed as INV-PARTS-005. GET list works; `POST /api/part/stocktake/generate/` works.

## API surface

The test suite operates against a filtered OpenAPI schema of **83 endpoints** (method × path) covering:

- `/api/part/` — 32 endpoints (CRUD + pricing + stocktake + thumbs + parameters + related + test-templates)
- `/api/part/category/` — 15 endpoints (CRUD + tree + parameters)
- `/api/bom/` — 19 endpoints (CRUD + substitute + validate)
- Cross-cutting (bulk, copy, validate) — 17 endpoints

See [[coverage/coverage-index|coverage index]] for per-area breakdown and [[graph/index|endpoint graph]] for individual endpoint ↔ test pairing.

## UI surface

InvenTree 1.3.0 uses a Mantine-based React SPA at `/web/`. The test suite exercises:

| panel | route | key actions tested |
|---|---|---|
| Parts list | `/web/part/category/<pk>/parts` | navigation, search, filter |
| Part detail | `/web/part/<pk>/details` | header, tabs, action menus |
| BOM tab | `/web/part/<pk>/bom` | add line, validate, bulk-delete, edit row, substitutes |
| Pricing tab | `/web/part/<pk>/pricing` | sale pricing add/edit/delete, internal pricing (gated), recalc |
| Test templates tab | `/web/part/<pk>/test_templates` | add/edit/delete template |
| Related parts tab | `/web/part/<pk>/related_parts` | add/edit/delete link |
| Parameters tab | `/web/part/<pk>/parameters` | (captured via tab navigation) |
| Category detail | `/web/part/category/<pk>/details` | category parameters tab |
| Subcategories | `/web/part/category/index/subcategories` | add category |
| Dashboard | `/web/home` | shell boot verification |

## Related docs

- [[test-strategy|Test strategy]] — risk prioritisation, targets, exit criteria
- [[coverage/coverage-index|Coverage index]] — per-area metrics
- [[graph/index|Endpoint graph]] — individual endpoint ↔ test pairing
- [[bugs/INV-PARTS-001-delete-active-part|INV-PARTS-001]] through [[bugs/INV-PARTS-005-stocktake-post-500|INV-PARTS-005]] — bug reports
- [[whole-process|Whole process narrative]] — session-by-session build log
