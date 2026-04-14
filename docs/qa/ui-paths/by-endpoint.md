---
title: "UI paths by endpoint"
tags: [qa, ui-paths, endpoint-recipes]
generated: 2026-04-14T13:54:31.094Z
---

# UI paths by endpoint

Reverse index: for each API endpoint captured by the recorder, the UI tests + exact step sequence that reach it. A recipe appearing under multiple tests = a reusable path. A recipe appearing once = the only known way to hit that endpoint via UI.

## `DELETE /api/bom/`

Reached by 1 UI test(s):

- **UI-BOM-004** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## `DELETE /api/part/category/{id}/`

Reached by 2 UI test(s):

- **UI-RECIPE-006** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-DELETE-002** (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/category/{var}/details
  click label:action-menu-category-actions
  click label:action-menu-category-actions-delete
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## `DELETE /api/part/related/{id}/`

Reached by 1 UI test(s):

- **UI-REL-002** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## `DELETE /api/part/sale-price/{id}/`

Reached by 1 UI test(s):

- **UI-PRICE-003** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## `DELETE /api/part/test-template/{id}/`

Reached by 1 UI test(s):

- **UI-TT-003** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## `DELETE /api/part/{id}/`

Reached by 2 UI test(s):

- **UI-RECIPE-007** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-DELETE-001** (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## `GET /api/bom/`

Reached by 9 UI test(s):

- **UI-EXTRA-004** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- **UI-TAB-002** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-BOM-001** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- **UI-BOM-002** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```
- **UI-BOM-003** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-button-validate-bom
  click role:button:"Submit"
  ```
- **UI-BOM-004** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-BOM-005** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- **UI-BOM-006** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Validate BOM Line"
  click role:button:"Submit"
  click role:button:"OK"
  ```
- **UI-BOM-007** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```

## `GET /api/bom/{id}/`

Reached by 1 UI test(s):

- **UI-BOM-005** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## `GET /api/part/`

Reached by 8 UI test(s):

- **UI-PART-001** (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/category/{var}/parts
  ```
- **UI-PART-002** (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/category/{var}/parts
  click label:action-menu-add-parts
  click role:button:"Submit"
  ```
- **UI-RECIPE-002** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-BOM-002** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```
- **UI-BOM-007** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```
- **UI-REL-001** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:action-button-add-related-part
  ```
- **PARTS-CROSS-FULL-001** (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
- **PARTS-CROSS-FULL-004** (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)

## `GET /api/part/category/`

Reached by 3 UI test(s):

- **UI-CATEGORY-001** (`submission/automation/ui/tests/a-parts-category-create.spec.ts`)
  ```
  goto /web/part/category/index/subcategories
  ```
- **UI-CATEGORY-002** (`submission/automation/ui/tests/a-parts-category-create.spec.ts`)
  ```
  goto /web/part/category/index/subcategories
  click role:button:"Submit"
  ```
- **UI-RECIPE-001** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)

## `GET /api/part/category/tree/`

Reached by 1 UI test(s):

- **UI-EXTRA-002** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part
  click label:nav-breadcrumb-action
  ```

## `GET /api/part/category/{id}/`

Reached by 31 UI test(s):

- **UI-CATEGORY-002** (`submission/automation/ui/tests/a-parts-category-create.spec.ts`)
  ```
  goto /web/part/category/index/subcategories
  click role:button:"Submit"
  ```
- **UI-PART-001** (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/category/{var}/parts
  ```
- **UI-PART-002** (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/category/{var}/parts
  click label:action-menu-add-parts
  click role:button:"Submit"
  ```
- **UI-PART-004** (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click label:action-menu-part-actions-edit
  click role:button:"Submit"
  ```
- **UI-PARTS-CROSS-001** (`submission/automation/ui/tests/cross-flow.spec.ts`)
- **UI-PARTS-CROSS-002** (`submission/automation/ui/tests/cross-flow.spec.ts`)
- **UI-EXTRA-003** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/category/{var}/details
  click label:action-menu-category-actions
  click label:action-menu-category-actions-edit
  click role:button:"Submit"
  ```
- **UI-ATTR-001** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-002** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-003** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-004** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-005** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-006** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-007** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-008** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-RECIPE-002** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-RECIPE-003** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-RECIPE-004** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-RECIPE-005** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-RECIPE-006** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-RECIPE-007** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-PARTS-DETAIL-001** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-002** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-003** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-004** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-005** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-SMOKE-003** (`submission/automation/ui/tests/smoke.spec.ts`)
- **UI-DELETE-001** (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-DELETE-002** (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/category/{var}/details
  click label:action-menu-category-actions
  click label:action-menu-category-actions-delete
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **PARTS-CROSS-FULL-001** (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
- **PARTS-CROSS-FULL-004** (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)

## `GET /api/part/related/`

Reached by 5 UI test(s):

- **UI-EXTRA-005** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  ```
- **UI-TAB-003** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-REL-001** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:action-button-add-related-part
  ```
- **UI-REL-002** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-REL-003** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  click role:button:"Submit"
  ```

## `GET /api/part/related/{id}/`

Reached by 1 UI test(s):

- **UI-REL-003** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  click role:button:"Submit"
  ```

## `GET /api/part/sale-price/`

Reached by 4 UI test(s):

- **UI-TAB-004** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-PRICE-001** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:action-button-add-price-break
  ```
- **UI-PRICE-002** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- **UI-PRICE-003** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## `GET /api/part/sale-price/{id}/`

Reached by 1 UI test(s):

- **UI-PRICE-002** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## `GET /api/part/test-template/`

Reached by 5 UI test(s):

- **UI-TAB-006** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TT-001** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:action-button-add-test-template
  ```
- **UI-TT-002** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  ```
- **UI-TT-003** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-TT-004** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## `GET /api/part/test-template/{id}/`

Reached by 1 UI test(s):

- **UI-TT-004** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## `GET /api/part/{id}/`

Reached by 53 UI test(s):

- **UI-PART-004** (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click label:action-menu-part-actions-edit
  click role:button:"Submit"
  ```
- **UI-PARTS-CROSS-001** (`submission/automation/ui/tests/cross-flow.spec.ts`)
- **UI-PARTS-CROSS-002** (`submission/automation/ui/tests/cross-flow.spec.ts`)
- **UI-EXTRA-001** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/pricing
  ```
- **UI-EXTRA-004** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- **UI-EXTRA-005** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  ```
- **UI-TAB-001** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-002** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-003** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-004** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-005** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-006** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-007** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-008** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-009** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-010** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-ATTR-001** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-002** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-003** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-004** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-005** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-006** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-007** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-008** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-RECIPE-003** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-RECIPE-004** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-RECIPE-007** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-BOM-001** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- **UI-BOM-002** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```
- **UI-BOM-003** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-button-validate-bom
  click role:button:"Submit"
  ```
- **UI-BOM-004** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-BOM-005** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- **UI-BOM-006** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Validate BOM Line"
  click role:button:"Submit"
  click role:button:"OK"
  ```
- **UI-BOM-007** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```
- **UI-TT-001** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:action-button-add-test-template
  ```
- **UI-TT-002** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  ```
- **UI-TT-003** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-TT-004** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- **UI-REL-001** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:action-button-add-related-part
  ```
- **UI-REL-002** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-REL-003** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  click role:button:"Submit"
  ```
- **UI-PRICE-001** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:action-button-add-price-break
  ```
- **UI-PRICE-002** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- **UI-PRICE-003** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-PARTS-DETAIL-001** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-002** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-003** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-004** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-005** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-SMOKE-003** (`submission/automation/ui/tests/smoke.spec.ts`)
- **UI-DELETE-001** (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **PARTS-CROSS-FULL-002** (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
  ```
  click label:action-menu-add-parameters
  click label:action-menu-add-parameters-create-parameter
  ```
- **PARTS-CROSS-FULL-003** (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
  ```
  click label:action-button-add-stock-item
  ```

## `GET /api/part/{id}/bom-validate/`

Reached by 9 UI test(s):

- **UI-EXTRA-004** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- **UI-TAB-002** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-BOM-001** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- **UI-BOM-002** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```
- **UI-BOM-003** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-button-validate-bom
  click role:button:"Submit"
  ```
- **UI-BOM-004** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-BOM-005** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- **UI-BOM-006** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Validate BOM Line"
  click role:button:"Submit"
  click role:button:"OK"
  ```
- **UI-BOM-007** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```

## `GET /api/part/{id}/pricing/`

Reached by 5 UI test(s):

- **UI-EXTRA-001** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/pricing
  ```
- **UI-TAB-004** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-PRICE-001** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:action-button-add-price-break
  ```
- **UI-PRICE-002** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- **UI-PRICE-003** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## `GET /api/part/{id}/requirements/`

Reached by 53 UI test(s):

- **UI-PART-004** (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click label:action-menu-part-actions-edit
  click role:button:"Submit"
  ```
- **UI-PARTS-CROSS-001** (`submission/automation/ui/tests/cross-flow.spec.ts`)
- **UI-PARTS-CROSS-002** (`submission/automation/ui/tests/cross-flow.spec.ts`)
- **UI-EXTRA-001** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/pricing
  ```
- **UI-EXTRA-004** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- **UI-EXTRA-005** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  ```
- **UI-TAB-001** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-002** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-003** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-004** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-005** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-006** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-007** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-008** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-009** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-010** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-ATTR-001** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-002** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-003** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-004** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-005** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-006** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-007** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-008** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-RECIPE-003** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-RECIPE-004** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-RECIPE-007** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-BOM-001** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- **UI-BOM-002** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```
- **UI-BOM-003** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-button-validate-bom
  click role:button:"Submit"
  ```
- **UI-BOM-004** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-BOM-005** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- **UI-BOM-006** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Validate BOM Line"
  click role:button:"Submit"
  click role:button:"OK"
  ```
- **UI-BOM-007** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```
- **UI-TT-001** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:action-button-add-test-template
  ```
- **UI-TT-002** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  ```
- **UI-TT-003** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-TT-004** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- **UI-REL-001** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:action-button-add-related-part
  ```
- **UI-REL-002** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-REL-003** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  click role:button:"Submit"
  ```
- **UI-PRICE-001** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:action-button-add-price-break
  ```
- **UI-PRICE-002** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- **UI-PRICE-003** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-PARTS-DETAIL-001** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-002** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-003** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-004** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-005** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-SMOKE-003** (`submission/automation/ui/tests/smoke.spec.ts`)
- **UI-DELETE-001** (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **PARTS-CROSS-FULL-002** (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
  ```
  click label:action-menu-add-parameters
  click label:action-menu-add-parameters-create-parameter
  ```
- **PARTS-CROSS-FULL-003** (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
  ```
  click label:action-button-add-stock-item
  ```

## `GET /api/part/{id}/serial-numbers/`

Reached by 53 UI test(s):

- **UI-PART-004** (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click label:action-menu-part-actions-edit
  click role:button:"Submit"
  ```
- **UI-PARTS-CROSS-001** (`submission/automation/ui/tests/cross-flow.spec.ts`)
- **UI-PARTS-CROSS-002** (`submission/automation/ui/tests/cross-flow.spec.ts`)
- **UI-EXTRA-001** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/pricing
  ```
- **UI-EXTRA-004** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- **UI-EXTRA-005** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  ```
- **UI-TAB-001** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-002** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-003** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-004** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-005** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-006** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-007** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-008** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-009** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-TAB-010** (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- **UI-ATTR-001** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-002** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-003** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-004** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-005** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-006** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-007** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-008** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-RECIPE-003** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-RECIPE-004** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-RECIPE-007** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-BOM-001** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- **UI-BOM-002** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```
- **UI-BOM-003** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-button-validate-bom
  click role:button:"Submit"
  ```
- **UI-BOM-004** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-BOM-005** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- **UI-BOM-006** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Validate BOM Line"
  click role:button:"Submit"
  click role:button:"OK"
  ```
- **UI-BOM-007** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```
- **UI-TT-001** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:action-button-add-test-template
  ```
- **UI-TT-002** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  ```
- **UI-TT-003** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-TT-004** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- **UI-REL-001** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:action-button-add-related-part
  ```
- **UI-REL-002** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-REL-003** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  click role:button:"Submit"
  ```
- **UI-PRICE-001** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:action-button-add-price-break
  ```
- **UI-PRICE-002** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- **UI-PRICE-003** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **UI-PARTS-DETAIL-001** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-002** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-003** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-004** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-PARTS-DETAIL-005** (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- **UI-SMOKE-003** (`submission/automation/ui/tests/smoke.spec.ts`)
- **UI-DELETE-001** (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- **PARTS-CROSS-FULL-002** (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
  ```
  click label:action-menu-add-parameters
  click label:action-menu-add-parameters-create-parameter
  ```
- **PARTS-CROSS-FULL-003** (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
  ```
  click label:action-button-add-stock-item
  ```

## `PATCH /api/bom/{id}/`

Reached by 1 UI test(s):

- **UI-BOM-005** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## `PATCH /api/bom/{id}/validate/`

Reached by 1 UI test(s):

- **UI-BOM-006** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Validate BOM Line"
  click role:button:"Submit"
  click role:button:"OK"
  ```

## `PATCH /api/part/category/{id}/`

Reached by 2 UI test(s):

- **UI-EXTRA-003** (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/category/{var}/details
  click label:action-menu-category-actions
  click label:action-menu-category-actions-edit
  click role:button:"Submit"
  ```
- **UI-RECIPE-005** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)

## `PATCH /api/part/related/{id}/`

Reached by 1 UI test(s):

- **UI-REL-003** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  click role:button:"Submit"
  ```

## `PATCH /api/part/sale-price/{id}/`

Reached by 1 UI test(s):

- **UI-PRICE-002** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## `PATCH /api/part/test-template/{id}/`

Reached by 1 UI test(s):

- **UI-TT-004** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## `PATCH /api/part/{id}/`

Reached by 11 UI test(s):

- **UI-PART-004** (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click label:action-menu-part-actions-edit
  click role:button:"Submit"
  ```
- **UI-ATTR-001** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-002** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-003** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-004** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-005** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-006** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-007** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-ATTR-008** (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- **UI-RECIPE-003** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **UI-RECIPE-004** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)

## `POST /api/bom/`

Reached by 1 UI test(s):

- **UI-BOM-002** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```

## `POST /api/bom/substitute/`

Reached by 1 UI test(s):

- **UI-BOM-007** (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```

## `POST /api/part/`

Reached by 3 UI test(s):

- **UI-PART-002** (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/category/{var}/parts
  click label:action-menu-add-parts
  click role:button:"Submit"
  ```
- **UI-RECIPE-002** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- **PARTS-CROSS-FULL-001** (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)

## `POST /api/part/category/`

Reached by 2 UI test(s):

- **UI-CATEGORY-002** (`submission/automation/ui/tests/a-parts-category-create.spec.ts`)
  ```
  goto /web/part/category/index/subcategories
  click role:button:"Submit"
  ```
- **UI-RECIPE-001** (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)

## `POST /api/part/related/`

Reached by 1 UI test(s):

- **UI-REL-001** (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:action-button-add-related-part
  ```

## `POST /api/part/sale-price/`

Reached by 1 UI test(s):

- **UI-PRICE-001** (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:action-button-add-price-break
  ```

## `POST /api/part/test-template/`

Reached by 1 UI test(s):

- **UI-TT-001** (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:action-button-add-test-template
  ```
