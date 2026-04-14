---
title: "UI paths by endpoint"
tags: [qa, ui-paths, endpoint-recipes]
generated: 2026-04-14T15:01:45.050Z
---

# UI paths by endpoint

Reverse index: for each API endpoint captured by the recorder, the UI tests + exact step sequence that reach it. A recipe appearing under multiple tests = a reusable path. A recipe appearing once = the only known way to hit that endpoint via UI.

## [[../graph/endpoints/delete-api-bom|DELETE /api/bom/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-BOM-004|UI-BOM-004]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## [[../graph/endpoints/delete-api-part-category-id|DELETE /api/part/category/{id}/]]

Reached by 2 UI test(s):

- [[../graph/ui-tests/UI-RECIPE-006|UI-RECIPE-006]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-DELETE-002|UI-DELETE-002]] (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/category/{var}/details
  click label:action-menu-category-actions
  click label:action-menu-category-actions-delete
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## [[../graph/endpoints/delete-api-part-related-id|DELETE /api/part/related/{id}/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-REL-002|UI-REL-002]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## [[../graph/endpoints/delete-api-part-sale-price-id|DELETE /api/part/sale-price/{id}/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-PRICE-003|UI-PRICE-003]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## [[../graph/endpoints/delete-api-part-test-template-id|DELETE /api/part/test-template/{id}/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-TT-003|UI-TT-003]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## [[../graph/endpoints/delete-api-part-id|DELETE /api/part/{id}/]]

Reached by 2 UI test(s):

- [[../graph/ui-tests/UI-RECIPE-007|UI-RECIPE-007]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-DELETE-001|UI-DELETE-001]] (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## [[../graph/endpoints/get-api-bom|GET /api/bom/]]

Reached by 9 UI test(s):

- [[../graph/ui-tests/UI-EXTRA-004|UI-EXTRA-004]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- [[../graph/ui-tests/UI-TAB-002|UI-TAB-002]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-BOM-001|UI-BOM-001]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- [[../graph/ui-tests/UI-BOM-002|UI-BOM-002]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```
- [[../graph/ui-tests/UI-BOM-003|UI-BOM-003]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-button-validate-bom
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-BOM-004|UI-BOM-004]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-BOM-005|UI-BOM-005]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- [[../graph/ui-tests/UI-BOM-006|UI-BOM-006]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Validate BOM Line"
  click role:button:"Submit"
  click role:button:"OK"
  ```
- [[../graph/ui-tests/UI-BOM-007|UI-BOM-007]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```

## [[../graph/endpoints/get-api-bom-id|GET /api/bom/{id}/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-BOM-005|UI-BOM-005]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## [[../graph/endpoints/get-api-part|GET /api/part/]]

Reached by 8 UI test(s):

- [[../graph/ui-tests/UI-PART-001|UI-PART-001]] (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/category/{var}/parts
  ```
- [[../graph/ui-tests/UI-PART-002|UI-PART-002]] (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/category/{var}/parts
  click label:action-menu-add-parts
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-RECIPE-002|UI-RECIPE-002]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-BOM-002|UI-BOM-002]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```
- [[../graph/ui-tests/UI-BOM-007|UI-BOM-007]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```
- [[../graph/ui-tests/UI-REL-001|UI-REL-001]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:action-button-add-related-part
  ```
- [[../graph/ui-tests/PARTS-CROSS-FULL-001|PARTS-CROSS-FULL-001]] (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
- [[../graph/ui-tests/PARTS-CROSS-FULL-004|PARTS-CROSS-FULL-004]] (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)

## [[../graph/endpoints/get-api-part-category|GET /api/part/category/]]

Reached by 3 UI test(s):

- [[../graph/ui-tests/UI-CATEGORY-001|UI-CATEGORY-001]] (`submission/automation/ui/tests/a-parts-category-create.spec.ts`)
  ```
  goto /web/part/category/index/subcategories
  ```
- [[../graph/ui-tests/UI-CATEGORY-002|UI-CATEGORY-002]] (`submission/automation/ui/tests/a-parts-category-create.spec.ts`)
  ```
  goto /web/part/category/index/subcategories
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-RECIPE-001|UI-RECIPE-001]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)

## [[../graph/endpoints/get-api-part-category-tree|GET /api/part/category/tree/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-EXTRA-002|UI-EXTRA-002]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part
  click label:nav-breadcrumb-action
  ```

## [[../graph/endpoints/get-api-part-category-id|GET /api/part/category/{id}/]]

Reached by 31 UI test(s):

- [[../graph/ui-tests/UI-CATEGORY-002|UI-CATEGORY-002]] (`submission/automation/ui/tests/a-parts-category-create.spec.ts`)
  ```
  goto /web/part/category/index/subcategories
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-PART-001|UI-PART-001]] (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/category/{var}/parts
  ```
- [[../graph/ui-tests/UI-PART-002|UI-PART-002]] (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/category/{var}/parts
  click label:action-menu-add-parts
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-PART-004|UI-PART-004]] (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click label:action-menu-part-actions-edit
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-PARTS-CROSS-001|UI-PARTS-CROSS-001]] (`submission/automation/ui/tests/cross-flow.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-CROSS-002|UI-PARTS-CROSS-002]] (`submission/automation/ui/tests/cross-flow.spec.ts`)
- [[../graph/ui-tests/UI-EXTRA-003|UI-EXTRA-003]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/category/{var}/details
  click label:action-menu-category-actions
  click label:action-menu-category-actions-edit
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-ATTR-001|UI-ATTR-001]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-002|UI-ATTR-002]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-003|UI-ATTR-003]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-004|UI-ATTR-004]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-005|UI-ATTR-005]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-006|UI-ATTR-006]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-007|UI-ATTR-007]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-008|UI-ATTR-008]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-002|UI-RECIPE-002]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-003|UI-RECIPE-003]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-004|UI-RECIPE-004]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-005|UI-RECIPE-005]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-006|UI-RECIPE-006]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-007|UI-RECIPE-007]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-001|UI-PARTS-DETAIL-001]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-002|UI-PARTS-DETAIL-002]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-003|UI-PARTS-DETAIL-003]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-004|UI-PARTS-DETAIL-004]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-005|UI-PARTS-DETAIL-005]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-SMOKE-003|UI-SMOKE-003]] (`submission/automation/ui/tests/smoke.spec.ts`)
- [[../graph/ui-tests/UI-DELETE-001|UI-DELETE-001]] (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-DELETE-002|UI-DELETE-002]] (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/category/{var}/details
  click label:action-menu-category-actions
  click label:action-menu-category-actions-delete
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/PARTS-CROSS-FULL-001|PARTS-CROSS-FULL-001]] (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
- [[../graph/ui-tests/PARTS-CROSS-FULL-004|PARTS-CROSS-FULL-004]] (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)

## [[../graph/endpoints/get-api-part-related|GET /api/part/related/]]

Reached by 5 UI test(s):

- [[../graph/ui-tests/UI-EXTRA-005|UI-EXTRA-005]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  ```
- [[../graph/ui-tests/UI-TAB-003|UI-TAB-003]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-REL-001|UI-REL-001]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:action-button-add-related-part
  ```
- [[../graph/ui-tests/UI-REL-002|UI-REL-002]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-REL-003|UI-REL-003]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  click role:button:"Submit"
  ```

## [[../graph/endpoints/get-api-part-related-id|GET /api/part/related/{id}/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-REL-003|UI-REL-003]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  click role:button:"Submit"
  ```

## [[../graph/endpoints/get-api-part-sale-price|GET /api/part/sale-price/]]

Reached by 4 UI test(s):

- [[../graph/ui-tests/UI-TAB-004|UI-TAB-004]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-PRICE-001|UI-PRICE-001]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:action-button-add-price-break
  ```
- [[../graph/ui-tests/UI-PRICE-002|UI-PRICE-002]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- [[../graph/ui-tests/UI-PRICE-003|UI-PRICE-003]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## [[../graph/endpoints/get-api-part-sale-price-id|GET /api/part/sale-price/{id}/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-PRICE-002|UI-PRICE-002]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## [[../graph/endpoints/get-api-part-test-template|GET /api/part/test-template/]]

Reached by 5 UI test(s):

- [[../graph/ui-tests/UI-TAB-006|UI-TAB-006]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TT-001|UI-TT-001]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:action-button-add-test-template
  ```
- [[../graph/ui-tests/UI-TT-002|UI-TT-002]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  ```
- [[../graph/ui-tests/UI-TT-003|UI-TT-003]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-TT-004|UI-TT-004]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## [[../graph/endpoints/get-api-part-test-template-id|GET /api/part/test-template/{id}/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-TT-004|UI-TT-004]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## [[../graph/endpoints/get-api-part-id|GET /api/part/{id}/]]

Reached by 53 UI test(s):

- [[../graph/ui-tests/UI-PART-004|UI-PART-004]] (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click label:action-menu-part-actions-edit
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-PARTS-CROSS-001|UI-PARTS-CROSS-001]] (`submission/automation/ui/tests/cross-flow.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-CROSS-002|UI-PARTS-CROSS-002]] (`submission/automation/ui/tests/cross-flow.spec.ts`)
- [[../graph/ui-tests/UI-EXTRA-001|UI-EXTRA-001]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/pricing
  ```
- [[../graph/ui-tests/UI-EXTRA-004|UI-EXTRA-004]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- [[../graph/ui-tests/UI-EXTRA-005|UI-EXTRA-005]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  ```
- [[../graph/ui-tests/UI-TAB-001|UI-TAB-001]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-002|UI-TAB-002]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-003|UI-TAB-003]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-004|UI-TAB-004]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-005|UI-TAB-005]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-006|UI-TAB-006]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-007|UI-TAB-007]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-008|UI-TAB-008]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-009|UI-TAB-009]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-010|UI-TAB-010]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-001|UI-ATTR-001]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-002|UI-ATTR-002]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-003|UI-ATTR-003]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-004|UI-ATTR-004]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-005|UI-ATTR-005]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-006|UI-ATTR-006]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-007|UI-ATTR-007]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-008|UI-ATTR-008]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-003|UI-RECIPE-003]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-004|UI-RECIPE-004]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-007|UI-RECIPE-007]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-BOM-001|UI-BOM-001]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- [[../graph/ui-tests/UI-BOM-002|UI-BOM-002]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```
- [[../graph/ui-tests/UI-BOM-003|UI-BOM-003]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-button-validate-bom
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-BOM-004|UI-BOM-004]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-BOM-005|UI-BOM-005]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- [[../graph/ui-tests/UI-BOM-006|UI-BOM-006]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Validate BOM Line"
  click role:button:"Submit"
  click role:button:"OK"
  ```
- [[../graph/ui-tests/UI-BOM-007|UI-BOM-007]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```
- [[../graph/ui-tests/UI-TT-001|UI-TT-001]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:action-button-add-test-template
  ```
- [[../graph/ui-tests/UI-TT-002|UI-TT-002]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  ```
- [[../graph/ui-tests/UI-TT-003|UI-TT-003]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-TT-004|UI-TT-004]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- [[../graph/ui-tests/UI-REL-001|UI-REL-001]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:action-button-add-related-part
  ```
- [[../graph/ui-tests/UI-REL-002|UI-REL-002]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-REL-003|UI-REL-003]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-PRICE-001|UI-PRICE-001]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:action-button-add-price-break
  ```
- [[../graph/ui-tests/UI-PRICE-002|UI-PRICE-002]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- [[../graph/ui-tests/UI-PRICE-003|UI-PRICE-003]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-PARTS-DETAIL-001|UI-PARTS-DETAIL-001]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-002|UI-PARTS-DETAIL-002]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-003|UI-PARTS-DETAIL-003]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-004|UI-PARTS-DETAIL-004]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-005|UI-PARTS-DETAIL-005]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-SMOKE-003|UI-SMOKE-003]] (`submission/automation/ui/tests/smoke.spec.ts`)
- [[../graph/ui-tests/UI-DELETE-001|UI-DELETE-001]] (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/PARTS-CROSS-FULL-002|PARTS-CROSS-FULL-002]] (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
  ```
  click label:action-menu-add-parameters
  click label:action-menu-add-parameters-create-parameter
  ```
- [[../graph/ui-tests/PARTS-CROSS-FULL-003|PARTS-CROSS-FULL-003]] (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
  ```
  click label:action-button-add-stock-item
  ```

## [[../graph/endpoints/get-api-part-id-bom-validate|GET /api/part/{id}/bom-validate/]]

Reached by 9 UI test(s):

- [[../graph/ui-tests/UI-EXTRA-004|UI-EXTRA-004]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- [[../graph/ui-tests/UI-TAB-002|UI-TAB-002]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-BOM-001|UI-BOM-001]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- [[../graph/ui-tests/UI-BOM-002|UI-BOM-002]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```
- [[../graph/ui-tests/UI-BOM-003|UI-BOM-003]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-button-validate-bom
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-BOM-004|UI-BOM-004]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-BOM-005|UI-BOM-005]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- [[../graph/ui-tests/UI-BOM-006|UI-BOM-006]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Validate BOM Line"
  click role:button:"Submit"
  click role:button:"OK"
  ```
- [[../graph/ui-tests/UI-BOM-007|UI-BOM-007]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```

## [[../graph/endpoints/get-api-part-id-pricing|GET /api/part/{id}/pricing/]]

Reached by 5 UI test(s):

- [[../graph/ui-tests/UI-EXTRA-001|UI-EXTRA-001]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/pricing
  ```
- [[../graph/ui-tests/UI-TAB-004|UI-TAB-004]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-PRICE-001|UI-PRICE-001]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:action-button-add-price-break
  ```
- [[../graph/ui-tests/UI-PRICE-002|UI-PRICE-002]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- [[../graph/ui-tests/UI-PRICE-003|UI-PRICE-003]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```

## [[../graph/endpoints/get-api-part-id-requirements|GET /api/part/{id}/requirements/]]

Reached by 53 UI test(s):

- [[../graph/ui-tests/UI-PART-004|UI-PART-004]] (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click label:action-menu-part-actions-edit
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-PARTS-CROSS-001|UI-PARTS-CROSS-001]] (`submission/automation/ui/tests/cross-flow.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-CROSS-002|UI-PARTS-CROSS-002]] (`submission/automation/ui/tests/cross-flow.spec.ts`)
- [[../graph/ui-tests/UI-EXTRA-001|UI-EXTRA-001]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/pricing
  ```
- [[../graph/ui-tests/UI-EXTRA-004|UI-EXTRA-004]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- [[../graph/ui-tests/UI-EXTRA-005|UI-EXTRA-005]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  ```
- [[../graph/ui-tests/UI-TAB-001|UI-TAB-001]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-002|UI-TAB-002]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-003|UI-TAB-003]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-004|UI-TAB-004]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-005|UI-TAB-005]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-006|UI-TAB-006]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-007|UI-TAB-007]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-008|UI-TAB-008]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-009|UI-TAB-009]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-010|UI-TAB-010]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-001|UI-ATTR-001]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-002|UI-ATTR-002]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-003|UI-ATTR-003]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-004|UI-ATTR-004]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-005|UI-ATTR-005]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-006|UI-ATTR-006]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-007|UI-ATTR-007]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-008|UI-ATTR-008]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-003|UI-RECIPE-003]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-004|UI-RECIPE-004]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-007|UI-RECIPE-007]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-BOM-001|UI-BOM-001]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- [[../graph/ui-tests/UI-BOM-002|UI-BOM-002]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```
- [[../graph/ui-tests/UI-BOM-003|UI-BOM-003]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-button-validate-bom
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-BOM-004|UI-BOM-004]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-BOM-005|UI-BOM-005]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- [[../graph/ui-tests/UI-BOM-006|UI-BOM-006]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Validate BOM Line"
  click role:button:"Submit"
  click role:button:"OK"
  ```
- [[../graph/ui-tests/UI-BOM-007|UI-BOM-007]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```
- [[../graph/ui-tests/UI-TT-001|UI-TT-001]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:action-button-add-test-template
  ```
- [[../graph/ui-tests/UI-TT-002|UI-TT-002]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  ```
- [[../graph/ui-tests/UI-TT-003|UI-TT-003]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-TT-004|UI-TT-004]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- [[../graph/ui-tests/UI-REL-001|UI-REL-001]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:action-button-add-related-part
  ```
- [[../graph/ui-tests/UI-REL-002|UI-REL-002]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-REL-003|UI-REL-003]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-PRICE-001|UI-PRICE-001]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:action-button-add-price-break
  ```
- [[../graph/ui-tests/UI-PRICE-002|UI-PRICE-002]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- [[../graph/ui-tests/UI-PRICE-003|UI-PRICE-003]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-PARTS-DETAIL-001|UI-PARTS-DETAIL-001]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-002|UI-PARTS-DETAIL-002]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-003|UI-PARTS-DETAIL-003]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-004|UI-PARTS-DETAIL-004]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-005|UI-PARTS-DETAIL-005]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-SMOKE-003|UI-SMOKE-003]] (`submission/automation/ui/tests/smoke.spec.ts`)
- [[../graph/ui-tests/UI-DELETE-001|UI-DELETE-001]] (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/PARTS-CROSS-FULL-002|PARTS-CROSS-FULL-002]] (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
  ```
  click label:action-menu-add-parameters
  click label:action-menu-add-parameters-create-parameter
  ```
- [[../graph/ui-tests/PARTS-CROSS-FULL-003|PARTS-CROSS-FULL-003]] (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
  ```
  click label:action-button-add-stock-item
  ```

## [[../graph/endpoints/get-api-part-id-serial-numbers|GET /api/part/{id}/serial-numbers/]]

Reached by 53 UI test(s):

- [[../graph/ui-tests/UI-PART-004|UI-PART-004]] (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click label:action-menu-part-actions-edit
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-PARTS-CROSS-001|UI-PARTS-CROSS-001]] (`submission/automation/ui/tests/cross-flow.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-CROSS-002|UI-PARTS-CROSS-002]] (`submission/automation/ui/tests/cross-flow.spec.ts`)
- [[../graph/ui-tests/UI-EXTRA-001|UI-EXTRA-001]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/pricing
  ```
- [[../graph/ui-tests/UI-EXTRA-004|UI-EXTRA-004]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- [[../graph/ui-tests/UI-EXTRA-005|UI-EXTRA-005]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  ```
- [[../graph/ui-tests/UI-TAB-001|UI-TAB-001]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-002|UI-TAB-002]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-003|UI-TAB-003]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-004|UI-TAB-004]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-005|UI-TAB-005]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-006|UI-TAB-006]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-007|UI-TAB-007]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-008|UI-TAB-008]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-009|UI-TAB-009]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-TAB-010|UI-TAB-010]] (`submission/automation/ui/tests/e-parts-tabs.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-001|UI-ATTR-001]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-002|UI-ATTR-002]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-003|UI-ATTR-003]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-004|UI-ATTR-004]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-005|UI-ATTR-005]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-006|UI-ATTR-006]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-007|UI-ATTR-007]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-008|UI-ATTR-008]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-003|UI-RECIPE-003]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-004|UI-RECIPE-004]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-007|UI-RECIPE-007]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-BOM-001|UI-BOM-001]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  ```
- [[../graph/ui-tests/UI-BOM-002|UI-BOM-002]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```
- [[../graph/ui-tests/UI-BOM-003|UI-BOM-003]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-button-validate-bom
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-BOM-004|UI-BOM-004]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-BOM-005|UI-BOM-005]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- [[../graph/ui-tests/UI-BOM-006|UI-BOM-006]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Validate BOM Line"
  click role:button:"Submit"
  click role:button:"OK"
  ```
- [[../graph/ui-tests/UI-BOM-007|UI-BOM-007]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```
- [[../graph/ui-tests/UI-TT-001|UI-TT-001]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:action-button-add-test-template
  ```
- [[../graph/ui-tests/UI-TT-002|UI-TT-002]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  ```
- [[../graph/ui-tests/UI-TT-003|UI-TT-003]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-TT-004|UI-TT-004]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- [[../graph/ui-tests/UI-REL-001|UI-REL-001]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:action-button-add-related-part
  ```
- [[../graph/ui-tests/UI-REL-002|UI-REL-002]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-REL-003|UI-REL-003]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-PRICE-001|UI-PRICE-001]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:action-button-add-price-break
  ```
- [[../graph/ui-tests/UI-PRICE-002|UI-PRICE-002]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```
- [[../graph/ui-tests/UI-PRICE-003|UI-PRICE-003]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Delete"
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/UI-PARTS-DETAIL-001|UI-PARTS-DETAIL-001]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-002|UI-PARTS-DETAIL-002]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-003|UI-PARTS-DETAIL-003]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-004|UI-PARTS-DETAIL-004]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-PARTS-DETAIL-005|UI-PARTS-DETAIL-005]] (`submission/automation/ui/tests/parts-detail-actions.spec.ts`)
- [[../graph/ui-tests/UI-SMOKE-003|UI-SMOKE-003]] (`submission/automation/ui/tests/smoke.spec.ts`)
- [[../graph/ui-tests/UI-DELETE-001|UI-DELETE-001]] (`submission/automation/ui/tests/y-parts-ui-delete.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click role:button:"Submit"
  click role:button:"Delete"
  ```
- [[../graph/ui-tests/PARTS-CROSS-FULL-002|PARTS-CROSS-FULL-002]] (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
  ```
  click label:action-menu-add-parameters
  click label:action-menu-add-parameters-create-parameter
  ```
- [[../graph/ui-tests/PARTS-CROSS-FULL-003|PARTS-CROSS-FULL-003]] (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)
  ```
  click label:action-button-add-stock-item
  ```

## [[../graph/endpoints/patch-api-bom-id|PATCH /api/bom/{id}/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-BOM-005|UI-BOM-005]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## [[../graph/endpoints/patch-api-bom-id-validate|PATCH /api/bom/{id}/validate/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-BOM-006|UI-BOM-006]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Validate BOM Line"
  click role:button:"Submit"
  click role:button:"OK"
  ```

## [[../graph/endpoints/patch-api-part-category-id|PATCH /api/part/category/{id}/]]

Reached by 2 UI test(s):

- [[../graph/ui-tests/UI-EXTRA-003|UI-EXTRA-003]] (`submission/automation/ui/tests/d-parts-extra-ui.spec.ts`)
  ```
  goto /web/part/category/{var}/details
  click label:action-menu-category-actions
  click label:action-menu-category-actions-edit
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-RECIPE-005|UI-RECIPE-005]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)

## [[../graph/endpoints/patch-api-part-related-id|PATCH /api/part/related/{id}/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-REL-003|UI-REL-003]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  click role:button:"Submit"
  ```

## [[../graph/endpoints/patch-api-part-sale-price-id|PATCH /api/part/sale-price/{id}/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-PRICE-002|UI-PRICE-002]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## [[../graph/endpoints/patch-api-part-test-template-id|PATCH /api/part/test-template/{id}/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-TT-004|UI-TT-004]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:row-action-menu-0
  click role:menuitem:"Edit"
  ```

## [[../graph/endpoints/patch-api-part-id|PATCH /api/part/{id}/]]

Reached by 11 UI test(s):

- [[../graph/ui-tests/UI-PART-004|UI-PART-004]] (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/{var}/details
  click label:action-menu-part-actions
  click label:action-menu-part-actions-edit
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-ATTR-001|UI-ATTR-001]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-002|UI-ATTR-002]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-003|UI-ATTR-003]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-004|UI-ATTR-004]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-005|UI-ATTR-005]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-006|UI-ATTR-006]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-007|UI-ATTR-007]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-ATTR-008|UI-ATTR-008]] (`submission/automation/ui/tests/f-parts-attributes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-003|UI-RECIPE-003]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/UI-RECIPE-004|UI-RECIPE-004]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)

## [[../graph/endpoints/post-api-bom|POST /api/bom/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-BOM-002|UI-BOM-002]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:action-menu-add-bom-items
  click label:action-menu-add-bom-items-add-bom-item
  ```

## [[../graph/endpoints/post-api-bom-substitute|POST /api/bom/substitute/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-BOM-007|UI-BOM-007]] (`submission/automation/ui/tests/h-parts-bom-ui.spec.ts`)
  ```
  goto /web/part/{var}/bom
  click label:row-action-menu-0
  click role:menuitem:"Edit Substitutes"
  click role:button:"Add Substitute"
  ```

## [[../graph/endpoints/post-api-part|POST /api/part/]]

Reached by 3 UI test(s):

- [[../graph/ui-tests/UI-PART-002|UI-PART-002]] (`submission/automation/ui/tests/b-parts-create.spec.ts`)
  ```
  goto /web/part/category/{var}/parts
  click label:action-menu-add-parts
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-RECIPE-002|UI-RECIPE-002]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)
- [[../graph/ui-tests/PARTS-CROSS-FULL-001|PARTS-CROSS-FULL-001]] (`submission/automation/ui/tests/z1-cross-flow-full-ui.spec.ts`)

## [[../graph/endpoints/post-api-part-category|POST /api/part/category/]]

Reached by 2 UI test(s):

- [[../graph/ui-tests/UI-CATEGORY-002|UI-CATEGORY-002]] (`submission/automation/ui/tests/a-parts-category-create.spec.ts`)
  ```
  goto /web/part/category/index/subcategories
  click role:button:"Submit"
  ```
- [[../graph/ui-tests/UI-RECIPE-001|UI-RECIPE-001]] (`submission/automation/ui/tests/g-parts-recipes.spec.ts`)

## [[../graph/endpoints/post-api-part-related|POST /api/part/related/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-REL-001|UI-REL-001]] (`submission/automation/ui/tests/j-parts-related-ui.spec.ts`)
  ```
  goto /web/part/{var}/related_parts
  click label:action-button-add-related-part
  ```

## [[../graph/endpoints/post-api-part-sale-price|POST /api/part/sale-price/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-PRICE-001|UI-PRICE-001]] (`submission/automation/ui/tests/k-parts-pricing-ui.spec.ts`)
  ```
  click label:action-button-add-price-break
  ```

## [[../graph/endpoints/post-api-part-test-template|POST /api/part/test-template/]]

Reached by 1 UI test(s):

- [[../graph/ui-tests/UI-TT-001|UI-TT-001]] (`submission/automation/ui/tests/i-parts-test-template-ui.spec.ts`)
  ```
  goto /web/part/{var}/test_templates
  click label:action-button-add-test-template
  ```
