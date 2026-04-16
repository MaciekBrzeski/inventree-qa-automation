---
title: "Test strategy — InvenTree Parts module"
tags: [qa, strategy, parts, bom]
created: 2026-04-16
---

# Test strategy — InvenTree Parts module

## Scope

The Parts module is the core domain entity in InvenTree. This test strategy covers:

- **Part CRUD** — creation, retrieval, update, deletion including lifecycle constraints (active/inactive)
- **Part categorisation** — hierarchical categories, parametric tables, category parameters
- **Part attributes** — boolean flags (Assembly, Component, Trackable, Purchaseable, Salable, Virtual, Template, Active)
- **Bill of Materials (BOM)** — line items, substitutes, validation, copy, pricing rollup
- **Part pricing** — internal price breaks, sale price breaks, pricing recalc, supplier pricing
- **Part parameters** — parameter templates, values, category-level defaults
- **Test templates** — required/optional test definitions per part
- **Related parts** — many-to-many part associations
- **Stock tracking** — stock items, locations, stocktake reports (partially blocked — INV-PARTS-005)
- **Attachments + thumbnails** — file uploads (partially blocked — needs `setInputFiles`)

### Out of scope

- Stock module beyond part-linked items (warehousing, transfers, adjustments)
- Build orders (manufacturing)
- Purchase / sales order workflows
- Plugin system
- User management beyond auth-token flows

## Risk-based prioritisation

| priority | area | rationale |
|---|---|---|
| P1 Critical | Part CRUD + categories | Foundation — every other feature depends on parts existing |
| P1 Critical | BOM management | Core business domain — assembly/component tree, costing |
| P1 Critical | Auth + permissions | Gate to all functionality |
| P2 High | Pricing (internal + sale) | Revenue-critical, complex calculation chain |
| P2 High | Part attributes (boolean toggles) | Control which panels are visible; misconfigured flags hide features |
| P2 High | Parameters + test templates | Quality/compliance — parameter constraints, required test tracking |
| P3 Medium | Related parts | Convenience feature, lower blast radius |
| P3 Medium | Stocktake | Audit trail — partially blocked by INV-PARTS-005 |
| P4 Low | Thumbnails | Cosmetic, file-upload-dependent |
| P4 Low | PUT variants | SPA never sends PUT; only relevant for direct API consumers |

## Coverage targets

| metric | target | actual | status |
|---|---|---|---|
| API endpoint coverage (filtered schema) | ≥ 90% | **95.2%** (79/83) | ✅ exceeded |
| UI endpoint coverage (SPA `page.on('request')`) | ≥ 50% | **60.2%** (50/83) | ✅ exceeded |
| Manual test cases (UI + API) | ≥ 100 | **155** (80 UI + 75 API) | ✅ exceeded |
| Automated tests (UI + API) | ≥ 50 | **216** (101 UI + 115 API) | ✅ exceeded |
| Feature areas with ≥ 1 automated test | 100% | **16/16** | ✅ |
| Cross-functional flow | ≥ 1 | **2** (api-seeded + full UI) | ✅ |
| Real bugs filed | documented | **5** (INV-PARTS-001..005) | ✅ |

## Test types

### 1. API automation (Playwright APIRequestContext)

- **CRUD specs** — one per resource (parts, categories, BOM, pricing, related, test-templates, parameters, stocktake, thumbs)
- **Query/filter specs** — parameterised (limit, offset, search, ordering, boolean filters)
- **Negative/boundary specs** — invalid auth, missing fields, 404s, duplicate IPNs, bulk-update quirks
- **PUT variant specs** — graceful-skip on 400+, documenting SPA-vs-API divergence
- **Adjacent endpoint specs** — dead-list endpoints the SPA hits outside the filtered schema (stock, orders, plugins, user/me)

### 2. UI automation (Playwright browser + Mantine selectors)

- **Panel CRUD flows** — navigate to panel → click add button → fill Mantine form → submit → capture POST → edit via row-action-menu → delete via row-action-menu + dialog-scoped confirm
- **Tab navigation smoke** — visit every tab on a part detail page, capture the SPA fetch
- **Attribute round-trips** — flip boolean flags via the Edit modal, verify PATCH response
- **Cross-functional flows** — create part → add parameter → add stock → verify in category view
- **Visual regression** — triple baseline (PNG + masked HTML + request log) with pixelmatch comparison + 15-defect validator

### 3. Manual test cases (Markdown tables)

- **80 UI cases** — creation, tabs, categories, attributes, units, parameters, templates, revisions, negative
- **75 API cases** — CRUD, filter, validation, relational integrity, edge cases, adjacent endpoints

## Selector strategy

InvenTree's Mantine SPA uses a consistent aria-label convention:

| pattern | meaning |
|---|---|
| `action-button-add-<entity>` | Add button for an entity |
| `action-menu-<context>-actions` | Action menu trigger |
| `action-menu-<context>-actions-<item>` | Menu item inside an action menu |
| `row-action-menu-<index>` | Row-level action menu on table row N |
| `related-field-<name>` | Foreign-key combobox |
| `text-field-<name>` / `number-field-<name>` | Form inputs |

All selectors are parameterised via `qa-harness.config.ts > selectors` — no hardcoded strings in spec bodies.

## Known limitations + blockers

| ID | issue | impact | workaround |
|---|---|---|---|
| INV-PARTS-001 | DELETE rejects active parts with 400 | every delete flow | PATCH `{active: false}` before DELETE |
| INV-PARTS-005 | POST /api/part/stocktake/ returns 500 | blocks 6 stocktake endpoints | test.skip + bug filed |
| Thumbs PATCH | requires `page.setInputFiles` for image upload | blocks 3 thumb endpoints | API-only GET tests cover read path |
| PUT variants | SPA always sends PATCH, never PUT | 16 PUT endpoints stay api-only | PUT spec with graceful skip |
| Internal pricing | gated by `PART_INTERNAL_PRICE` setting | hidden sub-panel | toggle ON in beforeAll, OFF in afterAll |

## Exit criteria

The test suite is considered complete when:

1. All P1 + P2 areas have ≥ 1 automated UI test AND ≥ 1 automated API test ✅
2. Combined API coverage ≥ 90% of filtered schema ✅ (95.2%)
3. All 5 discovered bugs are documented with reproduction steps ✅
4. Cross-functional flow exercises create → enrich → verify chain ✅
5. Visual regression baseline catches 15/15 synthetic defects ✅
6. CI runs green on push (both API + UI in parallel) ✅
