---
title: "UI path primitives — most-used steps"
tags: [qa, ui-paths, primitives]
generated: 2026-04-16T14:45:16.749Z
---

# UI path primitives

Every UI step (goto / click-label / click-role / fill), counted across all automated tests. Sorted by frequency — the top entries are candidates for extraction into a shared path library at `submission/automation/ui/paths/`.

| count | step | endpoints reached downstream |
|---:|---|---|
| 17 | `click role:button:"Submit"` | DELETE /api/bom/, DELETE /api/bom/{id}/, DELETE /api/part/category/parameters/{id}/ +28 |
| 15 | `click label:row-action-menu-0` | DELETE /api/bom/substitute/{id}/, DELETE /api/bom/{id}/, DELETE /api/part/category/parameters/{id}/ +31 |
| 10 | `goto /web/part/{id}/bom` | DELETE /api/bom/, DELETE /api/bom/substitute/{id}/, DELETE /api/bom/{id}/ +11 |
| 9 | `click role:button:"Delete"` | DELETE /api/bom/, DELETE /api/bom/{id}/, DELETE /api/part/category/parameters/{id}/ +18 |
| 6 | `click role:menuitem:"Edit"` | GET /api/bom/, GET /api/bom/{id}/, GET /api/part/category/parameters/ +21 |
| 6 | `click role:menuitem:"Delete"` | DELETE /api/bom/{id}/, DELETE /api/part/category/parameters/{id}/, DELETE /api/part/internal-price/{id}/ +15 |
| 4 | `goto /web/part/{id}/related_parts` | DELETE /api/part/related/{id}/, GET /api/part/, GET /api/part/related/ +6 |
| 4 | `goto /web/part/{id}/test_templates` | DELETE /api/part/test-template/{id}/, GET /api/part/test-template/, GET /api/part/test-template/{id}/ +5 |
| 2 | `goto /web/part/category/index/subcategories` | GET /api/part/category/, GET /api/part/category/{id}/, POST /api/part/category/ |
| 2 | `goto /web/part/category/{id}/parts` | GET /api/part/, GET /api/part/category/{id}/, POST /api/part/ |
| 2 | `goto /web/part/{id}/details` | DELETE /api/part/{id}/, GET /api/part/category/{id}/, GET /api/part/{id}/ +3 |
| 2 | `click label:action-menu-part-actions` | DELETE /api/part/{id}/, GET /api/part/category/{id}/, GET /api/part/{id}/ +3 |
| 2 | `goto /web/part/{id}/pricing` | GET /api/part/sale-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/ +3 |
| 2 | `goto /web/part/category/{id}/details` | DELETE /api/part/category/{id}/, GET /api/part/category/{id}/, PATCH /api/part/category/{id}/ |
| 2 | `click label:action-menu-category-actions` | DELETE /api/part/category/{id}/, GET /api/part/category/{id}/, PATCH /api/part/category/{id}/ |
| 2 | `click role:button:"OK"` | GET /api/bom/, GET /api/part/sale-price/, GET /api/part/{id}/ +6 |
| 2 | `click role:menuitem:"Edit Substitutes"` | DELETE /api/bom/substitute/{id}/, GET /api/bom/, GET /api/part/ +5 |
| 2 | `click label:action-button-add-price-break` | GET /api/part/internal-price/, GET /api/part/sale-price/, GET /api/part/{id}/ +5 |
| 1 | `click label:action-menu-add-parts` | GET /api/part/, GET /api/part/category/{id}/, POST /api/part/ |
| 1 | `click label:action-menu-part-actions-edit` | GET /api/part/category/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/ +2 |
| 1 | `goto /web/part` | GET /api/part/category/tree/ |
| 1 | `click label:nav-breadcrumb-action` | GET /api/part/category/tree/ |
| 1 | `click label:action-menu-category-actions-edit` | GET /api/part/category/{id}/, PATCH /api/part/category/{id}/ |
| 1 | `click label:action-menu-add-bom-items` | GET /api/bom/, GET /api/part/, GET /api/part/{id}/ +4 |
| 1 | `click label:action-menu-add-bom-items-add-bom-item` | GET /api/bom/, GET /api/part/, GET /api/part/{id}/ +4 |
| 1 | `click label:action-button-validate-bom` | GET /api/bom/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/ +2 |
| 1 | `click role:menuitem:"Validate BOM Line"` | GET /api/bom/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/ +3 |
| 1 | `click role:button:"Add Substitute"` | GET /api/bom/, GET /api/part/, GET /api/part/{id}/ +4 |
| 1 | `click label:action-button-add-test-template` | GET /api/part/test-template/, GET /api/part/{id}/, GET /api/part/{id}/requirements/ +2 |
| 1 | `click label:action-button-add-related-part` | GET /api/part/, GET /api/part/related/, GET /api/part/{id}/ +3 |
| 1 | `click label:action-button-add-category-parameter` | GET /api/part/category/parameters/, GET /api/part/category/{id}/, POST /api/part/category/parameters/ |
| 1 | `click label:action-menu-pricing-actions` | GET /api/part/sale-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/ +3 |
| 1 | `click label:action-menu-pricing-actions-refresh` | GET /api/part/sale-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/ +3 |
| 1 | `click role:button:"Internal Pricing"` | GET /api/part/internal-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/ +3 |
| 1 | `click label:navigation-menu` | _(none)_ |
| 1 | `click label:action-menu-category-actions-delete` | DELETE /api/part/category/{id}/, GET /api/part/category/{id}/ |
| 1 | `click label:action-menu-add-parameters` | GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/ |
| 1 | `click label:action-menu-add-parameters-create-parameter` | GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/ |
| 1 | `click label:action-button-add-stock-item` | GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/ |
