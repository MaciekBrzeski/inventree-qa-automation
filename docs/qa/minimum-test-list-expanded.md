---
title: "Minimum test list — expanded (caveman)"
source-pdf: "/home/wruszbit/Pobrane/QAHub AI Hackathon 2026 - Problem Statement.pdf"
tags: [qa, hackathon, test-list, minimum, expansion, caveman]
created: 2026-04-14
---

# Minimum test list — expanded

Caveman speak. Technical terms exact. Code + IDs + URLs verbatim. Base from PDF "Phase 1/2/3 minimum". Each section show PDF minimum + expansion + status.

Status legend:
- `[x]` = test automated, running green in suite
- `[m]` = manual case written (`submission/test-cases/*.md`), not yet automated
- `[ ]` = gap, nothing yet
- `[!]` = bug filed ([[bugs/INV-PARTS-001|INV-PARTS-001]]..[[bugs/INV-PARTS-005|INV-PARTS-005]])

Coverage snapshot source: [[whole-process]], [[graph/index]], [[snapshots/2026-04-14-ui-explore-skill/README|snapshot 2026-04-14]]. Current: 17/83 endpoints paired, 38 UI tests green, 61 API tests green, 4 skipped (see [[bugs/INV-PARTS-005-stocktake-post-500|INV-PARTS-005]]).

---

## Phase 1 — UI manual test cases

### 1.1 Part creation

PDF minimum: manual entry + import flows.

Automated today:
- `[x]` UI-PART-001 navigate to Add Part panel — `b-parts-create.spec.ts`
- `[x]` UI-PART-002 create part via Add menu → modal → Submit → `POST /api/part/`
- `[x]` UI-PART-003 created part searchable via API
- `[x]` UI-PART-004 edit via action-menu-part-actions-edit → `PATCH /api/part/{id}/`
- `[x]` UI-CATEGORY-001/002/003 create category via `action-button-add-part-category`
- `[m]` UI-PARTS-001..008 creation variations in `ui-manual-tests.md`

Expansion — write next:
- `[ ]` UI-PART-IMPORT-001 click `action-menu-add-parts-import-from-file` → pick CSV → Submit. Covers import flow PDF explicit ask.
- `[ ]` UI-PART-IMPORT-002 CSV missing required header → expect form error, no API call fired.
- `[ ]` UI-PART-IMPORT-003 CSV with duplicate IPN row → expect row-level error on second row, first row accepted.
- `[ ]` UI-PART-DUPLICATE-001 `action-menu-part-actions-duplicate` → modal pre-filled → Submit → new part with suffixed name.
- `[ ]` UI-PART-CREATE-WITH-IMAGE click Create Part → attach image file → Submit → part has thumbnail.
- `[ ]` UI-PART-CREATE-CATEGORY-PICKER type partial name in category Mantine Select → pick suggestion → part stored with parent id.
- `[ ]` UI-PART-CREATE-BULK-CLOSE use `Keep form open` checkbox → Submit → modal stays open, form reset, second Create possible without re-click.

### 1.2 Part detail view — all tabs

PDF minimum tabs: Stock, BOM, Allocated, Build Orders, Parameters, Variants, Revisions, Attachments, Related Parts, Test Templates.

Automated today:
- `[x]` UI-SMOKE-003 open `/web/part/1` → hamburger visible
- `[x]` UI-PARTS-DETAIL-001..005 action buttons on detail page
- `[x]` UI-EXTRA-001 `/web/part/<pk>/pricing` → `GET /api/part/{id}/pricing/`
- `[x]` UI-EXTRA-004 `/web/part/<pk>/bom` → `GET /api/bom/`
- `[x]` UI-EXTRA-005 `/web/part/<pk>/related_parts` → `GET /api/part/related/`

Gap tabs — write next (each navigate + assert panel rendered + capture list endpoint):
- `[ ]` UI-TAB-STOCK navigate `/web/part/<pk>/stock` → `GET /api/stock/?part=<id>` (note: `/api/stock/*` out of filtered scope, so captures as `dead` but still proves UI path)
- `[ ]` UI-TAB-ALLOCATED navigate `/web/part/<pk>/allocations` → `GET /api/part/<pk>/requirements/` + stock allocation feeds
- `[ ]` UI-TAB-BUILDS navigate `/web/part/<pk>/builds` → `GET /api/build/?part=<id>` (out of scope)
- `[ ]` UI-TAB-PARAMETERS navigate `/web/part/<pk>/parameters` → `GET /api/part/parameter/?part=<id>` — unpaired, closes a gap
- `[ ]` UI-TAB-VARIANTS navigate `/web/part/<pk>/variants` → `GET /api/part/?variant_of=<id>`
- `[ ]` UI-TAB-REVISIONS navigate `/web/part/<pk>/revisions` → check Revision Of linkage
- `[ ]` UI-TAB-ATTACHMENTS navigate `/web/part/<pk>/attachments` → list attachments (out of scope endpoint)
- `[ ]` UI-TAB-TEST-TEMPLATES navigate `/web/part/<pk>/test_templates` → `GET /api/part/test-template/?part=<id>` — unpaired, closes gap. Note: part must be `testable=true` first.

Mantine add-menu drill — need add-button per panel. Probe data in [[selector-inventory]] confirms labels: `action-menu-add-parameters`, `action-menu-add-bom-items`, `action-button-add-related-part`, `action-button-add-stock-item`, `action-button-add-supplier-part`, `action-button-add-manufacturer-part`. Each unlocks POST flow → new UI test per panel.

### 1.3 Part categories — hierarchy, filtering, parametric tables

PDF minimum.

Automated today:
- `[x]` UI-CATEGORY-001..003 create category under QA-ROOT via UI
- `[x]` UI-EXTRA-002 click `nav-breadcrumb-action` → `GET /api/part/category/tree/`
- `[x]` UI-EXTRA-003 rename category via `action-menu-category-actions-edit` → `PATCH /api/part/category/{id}/`
- `[x]` UI-DELETE-002 delete category via `action-menu-category-actions-delete` → `DELETE /api/part/category/{id}/`
- `[m]` UI-PARTS-013..018 category manual cases

Expansion:
- `[ ]` UI-CAT-HIERARCHY-001 create parent A, create child B under A, create grandchild C under B, assert tree endpoint contains A→B→C path.
- `[ ]` UI-CAT-MOVE-001 create child, move to different parent via PATCH parent → tree reflects new parent.
- `[ ]` UI-CAT-FILTER-001 load parts panel, apply category filter via drop-down, assert list only shows parts in that category.
- `[ ]` UI-CAT-PARAMETER-TEMPLATE-001 create a category-level parameter template via `action-menu-add-category-parameters` (probe label TBD) → `POST /api/part/category/parameters/` — currently unpaired.
- `[ ]` UI-CAT-DELETE-NON-EMPTY-001 try to delete a category containing parts → expect 400 / 409 or cascade warning.
- `[ ]` UI-CAT-SEARCH-001 type category name fragment in search → list filtered, breadcrumb unchanged.

### 1.4 Part attributes — all boolean toggles

PDF minimum: Virtual, Template, Assembly, Component, Trackable, Purchaseable, Salable, Active/Inactive.

Manual cases exist (UI-PARTS-019..030, 12 cases in `ui-manual-tests.md`). Automated: none directly — UI-PART-004 edits description, not attribute flags.

Expansion — one automated test per attribute round-trip:
- `[ ]` UI-ATTR-VIRTUAL PATCH virtual=true → Stock tab shows "virtual, no stock" message.
- `[ ]` UI-ATTR-TEMPLATE PATCH template=true → Variants tab becomes visible → can create variant.
- `[ ]` UI-ATTR-ASSEMBLY PATCH assembly=true → BOM tab appears → `action-menu-add-bom-items` visible.
- `[ ]` UI-ATTR-COMPONENT PATCH component=true → part eligible as BOM child; assert on another part's BOM add dialog.
- `[ ]` UI-ATTR-TRACKABLE PATCH trackable=true → serial numbers required on stock addition.
- `[ ]` UI-ATTR-PURCHASEABLE PATCH purchaseable=true → Suppliers tab add button visible.
- `[ ]` UI-ATTR-SALABLE PATCH salable=true → Sale Price panel accessible.
- `[ ]` UI-ATTR-ACTIVE-INACTIVE PATCH active=false → card shows inactive badge → delete allowed ([[bugs/INV-PARTS-001-delete-active-part|INV-PARTS-001]] reference).
- `[ ]` UI-ATTR-COMBO combine assembly+template → variant assembly with BOM propagation.

### 1.5 Units of measure configuration

PDF minimum.

Manual only today (UI-PARTS-031..036 in merged list, 6 cases).

Expansion:
- `[ ]` UI-UNIT-SET-VALID set `units=mm` on part via edit modal → Submit → part detail shows `mm`.
- `[ ]` UI-UNIT-SET-INVALID set `units=xyzzy` → form error, no PATCH fired.
- `[ ]` UI-UNIT-SUPPLIER-PACK supplier-part with pack_size, assert stock-add preview converts correctly.
- `[ ]` UI-UNIT-COMPATIBLE-CHECK assert stock transfer between matching-unit parts succeeds.
- `[ ]` UI-UNIT-CONVERSION display stock in alternate unit, assert format string.

### 1.6 Part revisions — creation + constraints

PDF minimum: circular references, unique codes, template restrictions.

Automated today:
- `[x]` UI-PARTS-003 duplicate part as revision (via part detail duplicate menu)
- `[m]` UI-PARTS-053..060 revision manual cases

Expansion — constraint cases not yet covered:
- `[ ]` UI-REV-UNIQUE-CODE create revision 1, create another revision with same revision code → expect 400 unique constraint.
- `[ ]` UI-REV-CIRCULAR set partA.revision_of = partB.pk, then try partB.revision_of = partA.pk → expect rejection.
- `[ ]` UI-REV-TEMPLATE-NOT-ALLOWED template part cannot itself be a revision of another → expect edit form greys the field.
- `[ ]` UI-REV-SELF-REVISION set revision_of to self → expect rejection.
- `[ ]` UI-REV-REVISION-OF-REVISION create part A, revision B of A, then try revision C of B → expected behaviour per docs ([[inventree/parts/revision|revision]]).
- `[ ]` UI-REV-NAVIGATE revisions tab shows chronological list.

### 1.7 Negative + boundary

PDF minimum: duplicate IPN, inactive part restrictions, revision-of-revision prevention.

Automated today:
- `[x]` UI-LOGIN-NEG-001..003 login negative paths (`parts-login-negative.spec.ts`)
- `[x]` API-PARTS-053 POST without category succeeds → documented as [[bugs/INV-PARTS-003-category-not-required|INV-PARTS-003]]
- `[x]` API-PARTS-057 PUT bulk → 400 bulk error → documented as [[bugs/INV-PARTS-004-put-is-bulk-update|INV-PARTS-004]]

Expansion — PDF explicit asks:
- `[ ]` UI-NEG-DUPLICATE-IPN create part with IPN `DUP-1`, then create another with same → expect 400 unique constraint on IPN.
- `[ ]` UI-NEG-INACTIVE-STOCK-OP deactivate part, try to add stock via UI → expect blocked or warning.
- `[ ]` UI-NEG-REVISION-OF-REVISION covered in 1.6.
- `[!]` UI-NEG-DELETE-ACTIVE covered by [[bugs/INV-PARTS-001-delete-active-part|INV-PARTS-001]] — UI menu item disabled on active parts.
- `[ ]` UI-NEG-EMPTY-NAME submit create form with empty name → expect 400.
- `[ ]` UI-NEG-INVALID-CATEGORY-PARENT set category parent to self → expect rejection.
- `[ ]` UI-NEG-VERY-LONG-NAME 5000-char name → expect max-length error.

---

## Phase 2 — API manual + automated

### 2.1 CRUD on Parts + Part Categories

PDF minimum.

Automated today (61 tests, 4 skipped):
- `[x]` API-PARTS-001..005 parts CRUD (`parts-crud.spec.ts`)
- `[x]` API-PARTS-018..025 category CRUD + tree + empty-name + explicit DELETE (`parts-category.spec.ts`)
- `[x]` API-PARTS-REL-001..004 part related-parts (`parts-related.spec.ts`)
- `[x]` API-PARTS-PRICE-001..010 internal + sale price CRUD (`parts-pricing.spec.ts`)
- `[x]` API-PARTS-STK-001 stocktake GET ([`STK-002..005` skipped — [[bugs/INV-PARTS-005-stocktake-post-500|INV-PARTS-005]]])

Expansion:
- `[ ]` API-PART-PARAMETER-001..005 CRUD on `/api/part/parameter/` — need parameter template seeded first via `/api/part/parameter/template/`.
- `[ ]` API-PART-TEMPLATE-001..005 CRUD on `/api/part/parameter/template/`.
- `[ ]` API-PART-CATEGORY-PARAMETERS-001..005 CRUD on `/api/part/category/parameters/`.
- `[ ]` API-PART-TEST-TEMPLATE-001..005 CRUD on `/api/part/test-template/` — part must be testable=true.
- `[ ]` API-PART-THUMBS-001..003 `/api/part/thumbs/` CRUD.
- `[ ]` API-BOM-VALIDATE-001 `GET /api/part/{id}/bom-validate/` → assert validation flags.
- `[ ]` API-BOM-COPY-001 `POST /api/part/{id}/bom-copy/` from another assembly.
- `[ ]` API-BOM-SUBSTITUTE-001..003 substitute CRUD on `/api/bom/substitute/`.
- `[ ]` API-BOM-VALIDATE-ROW-001 `PATCH /api/bom/{id}/validate/` marks the row as validated.

### 2.2 Filtering, pagination, search

PDF minimum.

Automated today:
- `[x]` API-PARTS-006..012 query operations (`parts-query.spec.ts`)

Expansion:
- `[ ]` API-QRY-COMBINED `GET /api/part/?category=1&active=true&search=foo&ordering=-name&limit=5`
- `[ ]` API-QRY-PAGE-BOUNDARIES offset past total → expect empty results, count unchanged.
- `[ ]` API-QRY-ZERO-LIMIT `?limit=0` → expect DRF handling (error or full list).
- `[ ]` API-QRY-UNKNOWN-FILTER `?fake_filter=1` → either 400 or silently ignored.
- `[ ]` API-QRY-ORDER-BY-PK ordering `pk` vs `-pk` returns reversed lists.
- `[ ]` API-QRY-FILTER-BY-TAG if tags supported.
- `[ ]` API-QRY-FILTER-BY-IPN-SUBSTRING `?IPN__icontains=foo` or `?search=foo`.

### 2.3 Field-level validation

PDF minimum: required, max length, nullable, read-only.

Partial today via `parts-negative.spec.ts`.

Expansion:
- `[ ]` API-VAL-REQUIRED-NAME POST `{}` → 400, error mentions `name`.
- `[ ]` API-VAL-MAX-LENGTH-NAME POST with 5000-char name → 400 max_length.
- `[ ]` API-VAL-NULLABLE-DESCRIPTION POST with `description=null` → accepted or 400, document actual behaviour.
- `[ ]` API-VAL-READONLY-PK POST with `pk=999999` → server ignores, assigns its own.
- `[ ]` API-VAL-INVALID-CATEGORY POST with `category=999999` → 400 invalid foreign key.
- `[ ]` API-VAL-BOOLEAN-TYPE POST with `active="maybe"` → 400 invalid boolean.
- `[ ]` API-VAL-NUMERIC-TYPE POST with `minimum_stock="abc"` → 400.
- `[ ]` API-VAL-UNIT-STRING POST with `units="not-a-unit"` → 400 unit parse error.

### 2.4 Relational integrity

PDF minimum: category assignment, default locations, supplier linkage.

Expansion:
- `[ ]` API-REL-CATEGORY-ORPHAN delete category with parts → expect 400 protect-on-delete, or reassign-to-parent behaviour.
- `[ ]` API-REL-DEFAULT-LOCATION PATCH `default_location=<stock_loc_pk>` → retrieved part shows the location.
- `[ ]` API-REL-SUPPLIER-LINK create supplier-part via `/api/company/part/`, assert it surfaces on `/api/part/{id}/` supplier list.
- `[ ]` API-REL-VARIANT-TEMPLATE-LINK create template, create variant with `variant_of=<template_pk>` → template stock aggregates variant.
- `[ ]` API-REL-BOM-ASSEMBLY-LINK create bom line referencing non-component part → expect rejection or warning.
- `[ ]` API-REL-PARAM-TEMPLATE parameter references non-existent template → 400.

### 2.5 Edge cases + auth + conflict

PDF minimum: invalid payloads, unauthorised, conflict.

Automated today:
- `[x]` API-PARTS-048..057 auth, 404, bulk-PUT, empty payloads

Expansion:
- `[ ]` API-EDGE-JSON-MALFORMED POST with non-JSON body → expect 400 parse error.
- `[ ]` API-EDGE-CONTENT-TYPE-MISSING POST without Content-Type → server default behaviour.
- `[ ]` API-EDGE-METHOD-NOT-ALLOWED OPTIONS / HEAD / TRACE on detail paths.
- `[ ]` API-EDGE-CONCURRENT-UPDATE two PATCH on same part simultaneously → last-write-wins or 409.
- `[ ]` API-EDGE-DUPLICATE-IPN two POSTs with same IPN → second returns 400 unique.
- `[ ]` API-EDGE-UNICODE-NAME POST with emoji / CJK name → accepted, retrieved identically.
- `[ ]` API-EDGE-READONLY-USER login as read-only user, try POST → 403.
- `[ ]` API-EDGE-EXPIRED-TOKEN mock expired token → 401.

---

## Phase 3 — UI automation

### 3.1 Core Part CRUD workflows

PDF minimum: all CRUD on Part via UI.

Automated today:
- `[x]` UI-PART-001..004 create + edit via action menu
- `[x]` UI-DELETE-001 delete via action menu (after `PATCH active=false` + reload workaround)
- `[x]` UI-CATEGORY-001..003 category create
- `[x]` UI-DELETE-002 category delete

All four verbs + both entities exercised from real Mantine UI. Cross-reference [[whole-process]] §5.

### 3.2 UI element + navigation validation

PDF minimum: key UI elements, navigation, form behaviour.

Automated today:
- `[x]` UI-SMOKE-001..003 auth flow + shell
- `[x]` UI-PARTS-NAV-001..005 global navigation drawer + breadcrumb
- `[x]` UI-PARTS-DETAIL-001..005 action button visibility
- `[x]` UI-LOGIN-NEG-001..003 form rejection paths

Expansion:
- `[ ]` UI-NAV-DASHBOARD click Dashboard in drawer → URL `/web/home` → dashboard widgets visible.
- `[ ]` UI-NAV-STOCK click Stock → stock location tree renders.
- `[ ]` UI-NAV-MANUFACTURING click Manufacturing → build orders list loads.
- `[ ]` UI-NAV-KEYBOARD-SHORTCUTS test `?` key opens shortcut overlay if supported.
- `[ ]` UI-NAV-BACK-BUTTON browser back after tab change → URL restored.
- `[ ]` UI-FORM-RESET-ON-ESC Escape key inside modal clears form, closes dialog.
- `[ ]` UI-FORM-VALIDATION-SIDEBAR invalid field shows inline error without page reload.
- `[ ]` UI-FORM-SUBMIT-DISABLED required field empty → Submit button disabled.

### 3.3 Cross-functional flow

PDF minimum, explicit example: create part → add parameters → create stock → verify in category view.

Automated today:
- `[x]` UI-PARTS-CROSS-001 API-seeded part renders in SPA (partial — only verifies, does not drive full chain via UI)
- `[x]` UI-PARTS-CROSS-002 action buttons reachable on seeded part
- `[x]` UI-PARTS-CROSS-003 parts list navigation

PDF minimum not fully met — current cross-flow is API seed + UI verify, not fully UI-driven chain.

Expansion — full UI chain:
- `[ ]` UI-CROSS-FULL-001 end-to-end: login → nav to Parts → `action-menu-add-parts-create-part` → fill form → Submit (POST /api/part/) → land on detail → `action-menu-add-parameters-create-parameter` → fill template + data → Submit (POST /api/part/parameter/) → navigate Stock tab → `action-button-add-stock-item` → fill quantity + location → Submit (POST /api/stock/) → navigate to category → assert part appears with stock count.

This is the centerpiece PDF expects. Blocked currently on: Mantine Select for template picker ([[c-parts-related.spec.ts]] draft failure), stock form has 15 fields (complex), parameter template needs pre-seeded template via API.

Sub-goals:
- `[ ]` UI-CROSS-PARAM-001 just create-part + add-parameter, no stock.
- `[ ]` UI-CROSS-STOCK-001 just create-part + add-stock-item.
- `[ ]` UI-CROSS-CATEGORY-VERIFY-001 after create, navigate `/web/part/category/<rootId>/parts` → search new part → assert row.

---

## Closing gaps — priority order

Based on [[graph/index|test graph]] current state (17 paired, 23 api-only, 43 unpaired):

### Priority 1 — highest leverage gap closure

1. `[ ]` UI full cross-flow (PDF explicit requirement) — UI-CROSS-FULL-001
2. `[ ]` API parameter template + parameter CRUD — closes 8 unpaired endpoints
3. `[ ]` API test template CRUD — closes 5 unpaired endpoints
4. `[ ]` UI BOM add line via Mantine multi-select table — closes POST/PATCH/DELETE /api/bom/
5. `[ ]` UI parameters tab add flow — closes parameter UI coverage

### Priority 2 — PDF minimum gaps

6. `[ ]` UI import parts from CSV — PDF explicit, not implemented
7. `[ ]` UI attribute toggles — 1 test per attribute (Virtual/Template/Assembly/Component/Trackable/Purchaseable/Salable/Active)
8. `[ ]` UI revision constraints — unique code, circular, revision-of-revision
9. `[ ]` UI units of measure — valid set, invalid reject, supplier pack
10. `[ ]` API field-level validation suite — max-length, nullable, read-only, invalid types

### Priority 3 — nice-to-have thoroughness

11. `[ ]` API concurrent update test
12. `[ ]` API read-only user auth negative
13. `[ ]` API unicode name handling
14. `[ ]` UI browser-back navigation
15. `[ ]` UI keyboard shortcuts

---

## Related artefacts

- [[whole-process]] — full end-to-end narrative
- [[implementation-plan]] — original step-by-step
- [[design-notes]] — decision log
- [[selector-inventory]] — authoritative locators
- [[best-practices]] — Playwright + RAG rules
- [[retrospective-phase5-6-ui-explore]] — retro + improvement backlog
- [[graph/index]] — live test↔endpoint graph
- [[bugs/INV-PARTS-001-delete-active-part|INV-PARTS-001]] through [[bugs/INV-PARTS-005-stocktake-post-500|INV-PARTS-005]] — bug reports
- `submission/test-cases/ui-manual-tests.md` — 70 merged UI manual cases (Phase 1)
- `submission/test-cases/api-manual-tests.md` — 65 merged API manual cases (Phase 2)
- [[snapshots/2026-04-14-ui-explore-skill/README|snapshot 2026-04-14]] — frozen metrics

## Total count

PDF minimum count: ~25 manual UI areas + ~15 API areas + core CRUD UI automation + 1 cross-flow.

Currently automated and green: **38 UI tests + 61 API tests = 99 automated tests**. 135 manual cases merged. 5 bugs filed. 17/83 endpoints paired. All 4 HTTP verbs exercised via real UI chain.

Expansion backlog listed above: **~85 additional test cases** across 15 priority-ranked groups, which would bring total automated to ~180+ and lift UI coverage from 20.5 % toward ~40-50 %.
