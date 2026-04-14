---
title: "UI path tree — all automated UI tests"
tags: [qa, ui-paths, tree, coverage]
generated: 2026-04-14T21:13:10.054Z
---

# UI path tree

Every automated UI test is a sequence of steps (goto / click-by-label / click-by-role / fill). This tree merges all test sequences so shared prefixes collapse. Leaves show which API endpoints each path reaches (from the page-level recorder capture).

Each node shows `step ×count → {endpoints}`. Branching points are where different tests diverge — those are the natural decision points a shared path library should expose as alternative methods.

## Tree

  - `goto /web/part/{id}/bom` → {DELETE /api/bom/, DELETE /api/bom/substitute/{id}/, GET /api/bom/, GET /api/bom/{id}/, GET /api/part/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/bom/{id}/, PATCH /api/bom/{id}/validate/, POST /api/bom/substitute/} ×9
    - `click label:row-action-menu-0` → {DELETE /api/bom/substitute/{id}/, GET /api/bom/, GET /api/bom/{id}/, GET /api/part/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/bom/{id}/, PATCH /api/bom/{id}/validate/, POST /api/bom/substitute/} ×4
      - `click role:menuitem:"Edit Substitutes"` → {DELETE /api/bom/substitute/{id}/, GET /api/bom/, GET /api/part/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, POST /api/bom/substitute/} ×2
        - `click role:button:"Add Substitute"` → {GET /api/bom/, GET /api/part/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, POST /api/bom/substitute/} ×1
      - `click role:menuitem:"Edit"` → {GET /api/bom/, GET /api/bom/{id}/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/bom/{id}/} ×1
      - `click role:menuitem:"Validate BOM Line"` → {GET /api/bom/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/bom/{id}/validate/} ×1
        - `click role:button:"Submit"` → {GET /api/bom/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/bom/{id}/validate/} ×1
          - `click role:button:"OK"` → {GET /api/bom/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/bom/{id}/validate/} ×1
    - `click label:action-menu-add-bom-items` → {GET /api/bom/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
      - `click label:action-menu-add-bom-items-add-bom-item` → {GET /api/bom/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
    - `click label:action-button-validate-bom` → {GET /api/bom/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
      - `click role:button:"Submit"` → {GET /api/bom/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
    - `click role:button:"Submit"` → {DELETE /api/bom/, GET /api/bom/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
      - `click role:button:"Delete"` → {DELETE /api/bom/, GET /api/bom/, GET /api/part/{id}/, GET /api/part/{id}/bom-validate/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
  - `click label:row-action-menu-0` → {DELETE /api/part/category/parameters/{id}/, DELETE /api/part/internal-price/{id}/, DELETE /api/part/sale-price/{id}/, GET /api/part/category/parameters/, GET /api/part/category/parameters/{id}/, GET /api/part/category/{id}/, GET /api/part/internal-price/, GET /api/part/internal-price/{id}/, GET /api/part/sale-price/, GET /api/part/sale-price/{id}/, GET /api/part/{id}/, GET /api/part/{id}/pricing/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/category/parameters/{id}/, PATCH /api/part/internal-price/{id}/, PATCH /api/part/sale-price/{id}/} ×6
    - `click role:menuitem:"Edit"` → {GET /api/part/category/parameters/, GET /api/part/category/parameters/{id}/, GET /api/part/category/{id}/, GET /api/part/internal-price/, GET /api/part/internal-price/{id}/, GET /api/part/sale-price/, GET /api/part/sale-price/{id}/, GET /api/part/{id}/, GET /api/part/{id}/pricing/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/category/parameters/{id}/, PATCH /api/part/internal-price/{id}/, PATCH /api/part/sale-price/{id}/} ×3
    - `click role:menuitem:"Delete"` → {DELETE /api/part/category/parameters/{id}/, DELETE /api/part/internal-price/{id}/, DELETE /api/part/sale-price/{id}/, GET /api/part/category/parameters/, GET /api/part/category/{id}/, GET /api/part/internal-price/, GET /api/part/sale-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×3
      - `click role:button:"Submit"` → {DELETE /api/part/category/parameters/{id}/, DELETE /api/part/internal-price/{id}/, DELETE /api/part/sale-price/{id}/, GET /api/part/category/parameters/, GET /api/part/category/{id}/, GET /api/part/internal-price/, GET /api/part/sale-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×3
        - `click role:button:"Delete"` → {DELETE /api/part/category/parameters/{id}/, DELETE /api/part/internal-price/{id}/, DELETE /api/part/sale-price/{id}/, GET /api/part/category/parameters/, GET /api/part/category/{id}/, GET /api/part/internal-price/, GET /api/part/sale-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×3
  - `goto /web/part/{id}/related_parts` → {DELETE /api/part/related/{id}/, GET /api/part/, GET /api/part/related/, GET /api/part/related/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/related/{id}/, POST /api/part/related/} ×4
    - `click label:row-action-menu-0` → {DELETE /api/part/related/{id}/, GET /api/part/related/, GET /api/part/related/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/related/{id}/} ×2
      - `click role:menuitem:"Delete"` → {DELETE /api/part/related/{id}/, GET /api/part/related/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
        - `click role:button:"Submit"` → {DELETE /api/part/related/{id}/, GET /api/part/related/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
          - `click role:button:"Delete"` → {DELETE /api/part/related/{id}/, GET /api/part/related/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
      - `click role:menuitem:"Edit"` → {GET /api/part/related/, GET /api/part/related/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/related/{id}/} ×1
        - `click role:button:"Submit"` → {GET /api/part/related/, GET /api/part/related/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/related/{id}/} ×1
    - `click label:action-button-add-related-part` → {GET /api/part/, GET /api/part/related/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, POST /api/part/related/} ×1
  - `goto /web/part/{id}/test_templates` → {DELETE /api/part/test-template/{id}/, GET /api/part/test-template/, GET /api/part/test-template/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/test-template/{id}/, POST /api/part/test-template/} ×4
    - `click label:row-action-menu-0` → {DELETE /api/part/test-template/{id}/, GET /api/part/test-template/, GET /api/part/test-template/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/test-template/{id}/} ×2
      - `click role:menuitem:"Delete"` → {DELETE /api/part/test-template/{id}/, GET /api/part/test-template/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
        - `click role:button:"Submit"` → {DELETE /api/part/test-template/{id}/, GET /api/part/test-template/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
          - `click role:button:"Delete"` → {DELETE /api/part/test-template/{id}/, GET /api/part/test-template/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
      - `click role:menuitem:"Edit"` → {GET /api/part/test-template/, GET /api/part/test-template/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/test-template/{id}/} ×1
    - `click label:action-button-add-test-template` → {GET /api/part/test-template/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, POST /api/part/test-template/} ×1
  - `goto /web/part/category/index/subcategories` → {GET /api/part/category/, GET /api/part/category/{id}/, POST /api/part/category/} ×2
    - `click role:button:"Submit"` → {GET /api/part/category/, GET /api/part/category/{id}/, POST /api/part/category/} ×1
  - `goto /web/part/category/{id}/parts` → {GET /api/part/, GET /api/part/category/{id}/, POST /api/part/} ×2
    - `click label:action-menu-add-parts` → {GET /api/part/, GET /api/part/category/{id}/, POST /api/part/} ×1
      - `click role:button:"Submit"` → {GET /api/part/, GET /api/part/category/{id}/, POST /api/part/} ×1
  - `goto /web/part/{id}/details` → {DELETE /api/part/{id}/, GET /api/part/category/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/{id}/} ×2
    - `click label:action-menu-part-actions` → {DELETE /api/part/{id}/, GET /api/part/category/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/{id}/} ×2
      - `click label:action-menu-part-actions-edit` → {GET /api/part/category/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/{id}/} ×1
        - `click role:button:"Submit"` → {GET /api/part/category/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/{id}/} ×1
      - `click role:button:"Submit"` → {DELETE /api/part/{id}/, GET /api/part/category/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
        - `click role:button:"Delete"` → {DELETE /api/part/{id}/, GET /api/part/category/{id}/, GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
  - `goto /web/part/{id}/pricing` → {GET /api/part/sale-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/{id}/pricing/} ×2
    - `click label:action-menu-pricing-actions` → {GET /api/part/sale-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/{id}/pricing/} ×1
      - `click label:action-menu-pricing-actions-refresh` → {GET /api/part/sale-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/{id}/pricing/} ×1
        - `click role:button:"Submit"` → {GET /api/part/sale-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/{id}/pricing/} ×1
          - `click role:button:"OK"` → {GET /api/part/sale-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, PATCH /api/part/{id}/pricing/} ×1
  - `goto /web/part/category/{id}/details` → {DELETE /api/part/category/{id}/, GET /api/part/category/{id}/, PATCH /api/part/category/{id}/} ×2
    - `click label:action-menu-category-actions` → {DELETE /api/part/category/{id}/, GET /api/part/category/{id}/, PATCH /api/part/category/{id}/} ×2
      - `click label:action-menu-category-actions-edit` → {GET /api/part/category/{id}/, PATCH /api/part/category/{id}/} ×1
        - `click role:button:"Submit"` → {GET /api/part/category/{id}/, PATCH /api/part/category/{id}/} ×1
      - `click label:action-menu-category-actions-delete` → {DELETE /api/part/category/{id}/, GET /api/part/category/{id}/} ×1
        - `click role:button:"Submit"` → {DELETE /api/part/category/{id}/, GET /api/part/category/{id}/} ×1
          - `click role:button:"Delete"` → {DELETE /api/part/category/{id}/, GET /api/part/category/{id}/} ×1
  - `click label:action-button-add-price-break` → {GET /api/part/internal-price/, GET /api/part/sale-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, POST /api/part/internal-price/, POST /api/part/sale-price/} ×2
    - `click role:button:"Internal Pricing"` → {GET /api/part/internal-price/, GET /api/part/{id}/, GET /api/part/{id}/pricing/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/, POST /api/part/internal-price/} ×1
  - `goto /web/part` → {GET /api/part/category/tree/} ×1
    - `click label:nav-breadcrumb-action` → {GET /api/part/category/tree/} ×1
  - `click label:action-button-add-category-parameter` → {GET /api/part/category/parameters/, GET /api/part/category/{id}/, POST /api/part/category/parameters/} ×1
  - `click label:navigation-menu` ×1
  - `click label:action-menu-add-parameters` → {GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
    - `click label:action-menu-add-parameters-create-parameter` → {GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
  - `click label:action-button-add-stock-item` → {GET /api/part/{id}/, GET /api/part/{id}/requirements/, GET /api/part/{id}/serial-numbers/} ×1
