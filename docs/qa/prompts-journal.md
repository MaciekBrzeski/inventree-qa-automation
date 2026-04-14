## 2026-04-13T19:14:15.825Z — smoke / smoke-retrieval

- system: (none)
- prompt-file: (inline)

### Retrieved
  - [37] inventree/parts/revision.md :: Create a Revision[¶](#create-a-revision "Permanent link") (score -14.280)
  - [6] inventree/parts/create.md :: Create Part Form[¶](#create-part-form "Permanent link") (score -14.556)
  - [5] inventree/parts/create.md :: Part Creation[¶](#part-creation "Permanent link") (score -15.189)
  - [7] inventree/parts/create.md :: Create Part Form[¶](#create-part-form "Permanent link") (score -15.208)
  - [34] inventree/parts/revision.md :: Part Revisions[¶](#part-revisions "Permanent link") (score -15.405)

### Prompt preview
```
How do I create a new part in InvenTree?
```

### Response
```
Docs provide two methods: manual creation or creating a revision from an existing part.

### Method 1: Manual Creation (New Part)
Use this method to create a completely new part entry.

1.  Navigate to the **Parts** view in the user interface.
2.  Click the **Add Parts** dropdown menu located above the parts table.
3.  Select the option to create a new part.
4.  Fill out the required attributes in the form.
    *   **Initial Stock:** If the "Create Initial Stock" setting is enabled, you can check a box to set an initial quantity for the new part.
    *   **Supplier Information:** If the part is marked as **Purchaseable**, you can check "Add Supplier Data" to include manufacturer and supplier part information.
5.  Press **Submit**. You will be redirected to the new part's detail page.

### Method 2: Creating a Revision (Duplicating an Existing Part)
Use this method to create a new version of an existing part while maintaining a history of changes.

1.  Navigate to the **detail page** of the existing part.
2.  Click the **part actions menu** (the three vertical dots in the top right corner).
3.  Select **Duplicate Part**.
4.  In the "Duplicate Part" form, update the following fields:
    *   **Revision Of**: Set this to the original part you are duplicating.
    *   **Revision**: Enter a unique revision number for the new part.
5.  Press **Submit**. The system will create a new part linked to the original.
```

---
## 2026-04-13T19:23:31.281Z — phase1 / phase1-ui-creation

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-creation.md

### Retrieved
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -9.476)
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -9.663)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -10.506)
  - [87] qa/implementation-plan.md :: Phase 3 — UI Automation (score -10.808)
  - [65] qa/best-practices.md :: 2. Playwright API testing (score -10.969)
  - [64] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -11.413)
  - [88] qa/implementation-plan.md :: Phase 3 — UI Automation (score -11.685)
  - [49] inventree/parts/test.md :: Part Test Templates[¶](#part-test-templates "Permanent link") (score -11.812)

### Prompt preview
```
Generate UI manual test cases for the **Creating Parts** area of the InvenTree Parts module.

Scope (based on retrieved context):
- Manual creation via the Parts view → Add Parts dropdown → new part form.
- Duplicating an existing part as a revision (Part detail → three-dot menu → Duplicate Part → set Revision Of + Revision).
- Form fields: name, IPN, description, category, Initial Stock (if setting enabled), Supplier Data (if Purchaseable).
- Required vs optional fields.
- Navigation outcomes: redirect to the new part's detail page.
- Validation errors on missing required fields.

Next free IDs: **UI-PARTS-001 through UI-PARTS-015**. Use as many as you need, do not exceed.

Output: ONLY the markdown table, with the exact columns from system-instructions.md — no prose, no headers, no commentary. Start directly with the table header line `| ID | Title | Preconditions | Steps | Expected | Priority | Tags |`.

Constraints:
- Every test must be grounded in the retrieved context. Do not invent fields, menus, or buttons that are not mentioned.
- If you need a step that the context does not support, emit `NEED_CONTEXT: <what>` on its own line instead of that case.
- Priorities: core happy-path creation = P1. Duplicate-as-revision flow = P1. Optional supplier/initial-stock toggles = P2. Validation errors = P2. Edge cases = P3.
- Tags should include at least one of: `create`, `duplicate`, `revision`, `validation`, `supplier`, `stock`.

```

### Response
```
| ID | Title | Preconditions | Steps | Expected | Priority | Tags |
|---|---|---|---|---|---|---|
| UI-PARTS-001 | Create a part with minimal required fields | logged in as admin; category 'QA-ROOT' exists | 1. Navigate to Parts list<br>2. Click 'Add Parts' dropdown<br>3. Enter name 'Test Part'<br>4. Enter IPN 'TEST-001'<br>5. Select category 'QA-ROOT'<br>6. Click 'Save' | Part is created.<br>User is redirected to the new part's detail page. | P1 | `create`, `crud` |
| UI-PARTS-002 | Create a part with description and category | logged in as admin; category 'QA-ROOT' exists | 1. Navigate to Parts list<br>2. Click 'Add Parts' dropdown<br>3. Enter name 'Test Part 2'<br>4. Enter IPN 'TEST-002'<br>5. Enter description 'A test description'<br>6. Select category 'QA-ROOT'<br>7. Click 'Save' | Part is created.<br>Description matches 'A test description'. | P1 | `create`, `crud` |
| UI-PARTS-003 | Duplicate an existing part as a new revision | logged in as admin; part 'TEST-001' exists | 1. Navigate to Part detail for 'TEST-001'<br>2. Click three-dot menu<br>3. Select 'Duplicate Part'<br>4. Set 'Revision Of' to 'TEST-001'<br>5. Enter new revision number<br>6. Click 'Save' | New part revision is created.<br>User is redirected to the new revision's detail page. | P1 | `duplicate`, `revision` |
| UI-PARTS-004 | Fail creation when name is missing | logged in as admin; category 'QA-ROOT' exists | 1. Navigate to Parts list<br>2. Click 'Add Parts' dropdown<br>3. Enter IPN 'TEST-ERR'<br>4. Select category 'QA-ROOT'<br>5. Click 'Save' | An error message is displayed indicating name is required. | P2 | `validation`, `negative` |
| UI-PARTS-005 | Fail creation when IPN is missing | logged in as admin; category 'QA-ROOT' exists | 1. Navigate to Parts list<br>2. Click 'Add Parts' dropdown<br>3. Enter name 'Test Part'<br>4. Select category 'QA-ROOT'<br>5. Click 'Save' | An error message is displayed indicating IPN is required. | P2 | `validation`, `negative` |
| UI-PARTS-006 | Create part with initial stock | logged in as admin; 'Initial Stock' setting is enabled | 1. Navigate to Parts list<br>2. Click 'Add Parts' dropdown<br>3. Enter name 'Stock Part'<br>4. Enter IPN 'STOCK-001'<br>5. Enter '10' in Initial Stock field<br>6. Click 'Save' | Part is created.<br>Stock count is 10. | P2 | `create`, `stock` |
| UI-PARTS-007 | Create purchaseable part with supplier data | logged in as admin; part is marked as 'Purchaseable' | 1. Navigate to Parts list<br>2. Click 'Add Parts' dropdown<br>3. Enter name 'Supplier Part'<br>4. Enter IPN 'SUP-001'<br>5. Enable 'Purchaseable' toggle<br>6. Enter supplier information<br>7. Click 'Save' | Part is created.<br>Supplier data is saved. | P2 | `create`, `supplier` |
| UI-PARTS-008 | Duplicate an existing part (standard) | logged in as admin; part 'TEST-001' exists | 1. Navigate to Part detail for 'TEST-001'<br>2. Click three-dot menu<br>3. Select 'Duplicate Part'<br>4. Click 'Save' | A new part is created with the same details as 'TEST-001'. | P2 | `duplicate` |
```

---
## 2026-04-13T19:46:49.138Z — phase1 / phase1-ui-tabs

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-tabs.md

### Retrieved
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -11.225)
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.575)
  - [64] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -11.649)
  - [59] inventree/parts/views.md :: Part Tabs[¶](#part-tabs "Permanent link") (score -11.839)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -12.092)
  - [57] inventree/parts/views.md :: Part Tabs[¶](#part-tabs "Permanent link") (score -12.119)
  - [58] inventree/parts/views.md :: Part Tabs[¶](#part-tabs "Permanent link") (score -12.352)
  - [87] qa/implementation-plan.md :: Phase 3 — UI Automation (score -12.397)

### Prompt preview
```
Generate UI manual test cases for **Part detail views and tabs** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Part detail page layout: header actions, tabs.
- Tabs commonly visible for a Part: Stock, Variants, Allocations, Bill of Materials, Used In, Builds, Suppliers, Purchase Orders, Sales Orders, Tests, Related Parts, Attachments, Notes, Pricing.
- Behavior when a tab is empty vs populated.
- Navigating between tabs preserves part context.

Next free IDs: **UI-PARTS-009 through UI-PARTS-018**. Use as many as context supports.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- Only test tabs/actions present in the retrieved context. If a tab is mentioned but not the actions it supports, emit `NEED_CONTEXT: actions for <tab>` on its own line instead of inventing.
- P1 = Stock tab + BOM tab (for assembly parts) + navigating to detail. P2 = Variants, Suppliers, Pricing. P3 = Attachments, Notes.
- Tags: `detail`, `tabs`, plus specific tab name.

```

### Response
```
NEED_CONTEXT: pricing tab
```

---
## 2026-04-13T19:48:50.465Z — phase1 / phase1-ui-categories

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-categories.md

### Retrieved
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -10.910)
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.264)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.576)
  - [87] qa/implementation-plan.md :: Phase 3 — UI Automation (score -11.656)
  - [64] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -11.799)
  - [13] inventree/parts/index.md :: Part Category[¶](#part-category "Permanent link") (score -11.799)
  - [65] qa/best-practices.md :: 2. Playwright API testing (score -12.279)
  - [55] inventree/parts/views.md :: Part Views[¶](#part-views "Permanent link") (score -12.497)

### Prompt preview
```
Generate UI manual test cases for **Part Categories** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Part Category is a hierarchical tree used to group parts.
- A category page displays a list of all parts under that category, plus a list of sub-categories.
- Moving a part between categories.
- Structural category (configuration controlled).
- Browsing, filtering parts by category.

Next free IDs: **UI-PARTS-019 through UI-PARTS-028**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- Ground every step in retrieved context. If a flow is not supported, emit `NEED_CONTEXT: <what>`.
- P1 = browsing category, viewing parts under a category, assigning part to category at creation. P2 = sub-categories, moving a part. P3 = edge cases.
- Tags: `category`, `tree`, `filter`.

```

### Response
```
NEED_CONTEXT: UI interaction steps and selectors for 'Moving a part between categories' and 'Structural category configuration'
```

---
## 2026-04-13T19:52:00.721Z — phase1 / phase1-ui-attributes

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-attributes.md
- metrics: duration_ms=188915 model=qa-gemma prompt_tokens=5221 completion_tokens=4464 total_tokens=9685

### Retrieved
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -11.048)
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.816)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -12.146)
  - [65] qa/best-practices.md :: 2. Playwright API testing (score -12.157)
  - [49] inventree/parts/test.md :: Part Test Templates[¶](#part-test-templates "Permanent link") (score -12.508)
  - [48] inventree/parts/test.md :: Part Test Templates[¶](#part-test-templates "Permanent link") (score -12.574)
  - [64] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -12.574)
  - [14] inventree/parts/index.md :: Part Attributes[¶](#part-attributes "Permanent link") (score -12.772)

### Prompt preview
```
Generate UI manual test cases for **Part Attributes** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Boolean attribute toggles on a Part: Virtual, Template, Assembly, Component, Testable, Trackable, Purchaseable, Salable, Active.
- Each toggle changes visibility of related features (e.g. Assembly enables BOM tab, Purchaseable enables Supplier data, Trackable enables serial tracking, Virtual suppresses stock).
- Locked parts: a locked part cannot have its attributes changed.
- Active / inactive parts.

Next free IDs: **UI-PARTS-029 through UI-PARTS-040**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- One case per meaningful attribute-related behavior, not one per toggle existence.
- P1 = Assembly toggle enables BOM tab; Virtual hides stock; Purchaseable enables supplier data; Active/Inactive toggle. P2 = Trackable, Testable, Salable. P3 = Template boolean (covered in templates area), Component.
- Tags: `attribute`, plus the specific attribute name.
- If context is missing for a specific attribute's side-effect, emit `NEED_CONTEXT: side-effects of <attribute>`.

```

### Response
```
NEED_CONTEXT: side-effects of Salable and Active
```

---
## 2026-04-13T19:54:43.819Z — phase1 / phase1-ui-units

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-units.md
- metrics: duration_ms=162439 model=qa-gemma prompt_tokens=5059 completion_tokens=3899 total_tokens=8958

### Retrieved
  - [18] inventree/parts/index.md :: Units of Measure[¶](#units-of-measure "Permanent link") (score -11.162)
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -11.340)
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.844)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -12.061)
  - [65] qa/best-practices.md :: 2. Playwright API testing (score -12.558)
  - [73] qa/design-notes.md :: 2026-04-13 (score -12.716)
  - [87] qa/implementation-plan.md :: Phase 3 — UI Automation (score -12.781)
  - [68] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -12.783)

### Prompt preview
```
Generate UI manual test cases for **Units of Measure** on Parts in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Physical units (mass, length, etc.) assigned to a Part.
- Unit validation: rejecting invalid unit strings.
- Supplier Part Units: how a supplier's pack size relates to the base part's unit of measure.
- Conversion from supplier pack to part stock quantity.

Next free IDs: **UI-PARTS-041 through UI-PARTS-046**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- If the retrieved context does not name a specific unit string or conversion example, do not invent one — use generic placeholders referenced in the docs.
- P1 = setting a valid unit on a part. P2 = invalid unit rejection, supplier pack conversion. P3 = edge cases.
- Tags: `units`, `validation`.

```

### Response
```
NEED_CONTEXT: UI steps/mechanism for conversion from supplier pack to part stock quantity
```

---
## 2026-04-13T20:05:35.520Z — phase1 / phase1-ui-tabs

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-tabs.md
- metrics: duration_ms=595100 model=qa-gemma prompt_tokens=5947 completion_tokens=14294 total_tokens=20241

### Retrieved
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -11.225)
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.575)
  - [64] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -11.649)
  - [59] inventree/parts/views.md :: Part Tabs[¶](#part-tabs "Permanent link") (score -11.839)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -12.092)
  - [57] inventree/parts/views.md :: Part Tabs[¶](#part-tabs "Permanent link") (score -12.119)
  - [58] inventree/parts/views.md :: Part Tabs[¶](#part-tabs "Permanent link") (score -12.352)
  - [87] qa/implementation-plan.md :: Phase 3 — UI Automation (score -12.397)
  - [65] qa/best-practices.md :: 2. Playwright API testing (score -12.403)
  - [55] inventree/parts/views.md :: Part Views[¶](#part-views "Permanent link") (score -12.751)

### Prompt preview
```
Generate UI manual test cases for **Part detail views and tabs** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Part detail page layout: header actions, tabs.
- Tabs commonly visible for a Part: Stock, Variants, Allocations, Bill of Materials, Used In, Builds, Suppliers, Purchase Orders, Sales Orders, Tests, Related Parts, Attachments, Notes, Pricing.
- Behavior when a tab is empty vs populated.
- Navigating between tabs preserves part context.

Next free IDs: **UI-PARTS-009 through UI-PARTS-018**. Use as many as context supports.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- Only test tabs/actions present in the retrieved context. If a tab is mentioned but not the actions it supports, emit `NEED_CONTEXT: actions for <tab>` on its own line instead of inventing.
- P1 = Stock tab + BOM tab (for assembly parts) + navigating to detail. P2 = Variants, Suppliers, Pricing. P3 = Attachments, Notes.
- Tags: `detail`, `tabs`, plus specific tab name.

```

### Response
```
| ID | Title | Preconditions | Steps | Expected | Priority | Tags |
|---|---|---|---|---|---|---|
| UI-PARTS-009 | Verify category breadcrumb navigation | logged in as admin; part exists in a category | 1. Click a category in the breadcrumb list | The user is navigated to the selected category | P1 | detail, breadcrumb |
| UI-PARTS-010 | Navigate between part detail tabs | logged in as admin; part exists | 1. Click the BOM tab<br>2. Click the Stock tab | The part context is preserved during navigation | P1 | detail, tabs, navigation |
| UI-PARTS-011 | Create a new stock item | logged in as admin; part exists | 1. Click the New Stock Item button | A dialog launches to create a new stock item | P1 | stock, crud |
| UI-PARTS-012 | Export stock data | logged in as admin; part has stock items | 1. Click the Export button | A dialog launches to select export options | P1 | stock, export |
| UI-PAR</strong>TS-013 | Use stock actions dropdown | logged in as admin; part has stock items | 1. Select a stock item<br>2. Click the stock actions drop-down | The drop-down menu is enabled and visible | P1 | stock, actions |
| UI-PARTS-014 | Upload a file to the Attachments tab | logged in as admin; part exists | 1. Click the Attachments tab<br>2. Upload a file | The file is attached to the part | P2 | attachments, upload |
| UI-PARTS-015 | Verify stock item details display | logged in as admin; part has stock items | 1. Click the Stock tab | The tab displays stock items with quantity, location, and status | P1 | stock, view |
| UI-PARTS-016 | Verify BOM sub-components display | logged in as admin; part is an assembly | 1. Click the BOM tab | The tab displays a list of sub-components | P1 | bom, view |
| UI-PARTS-017 | Verify Suppliers/Manufacturers display | logged in as admin; part is purchaseable | 1. Click the Suppliers tab | The tab displays part suppliers and manufacturers | P2 | suppliers, view |
| UI-PARTS-018 | Verify Related Parts display | logged in as admin; part has related parts | 1. Click the Related Parts tab | The tab shows the relationship between parts | P2 | related-parts, view |

NEED_CONTEXT: actions for Variants tab
NEED_CONTEXT: actions for Allocations tab
NEED_CONTEXT: actions for Used In tab
NEED_CONTEXT: actions for Build Orders tab
NEED_CONTEXT: actions for Purchase Orders tab
NEED_CONTEXT: actions for Sales Orders tab
NEED_CONTEXT: actions for Tests tab
NEED_CONTEXT: actions for Parameters tab
NEED_CONTEXT: actions for Notes tab
NEED_CONTEXT: actions for Stock History tab
NEED_CONTEXT: actions for Test Templates tab
NEED_CONTEXT: pricing tab
```

---
## 2026-04-13T20:07:43.105Z — phase1 / phase1-ui-categories

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-categories.md
- metrics: duration_ms=126931 model=qa-gemma prompt_tokens=5624 completion_tokens=3134 total_tokens=8758

### Retrieved
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -10.910)
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.264)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.576)
  - [87] qa/implementation-plan.md :: Phase 3 — UI Automation (score -11.656)
  - [64] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -11.799)
  - [13] inventree/parts/index.md :: Part Category[¶](#part-category "Permanent link") (score -11.799)
  - [65] qa/best-practices.md :: 2. Playwright API testing (score -12.279)
  - [55] inventree/parts/views.md :: Part Views[¶](#part-views "Permanent link") (score -12.497)
  - [69] qa/best-practices.md :: 5. InvenTree Parts domain — cheatsheet (score -12.608)
  - [68] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -12.624)

### Prompt preview
```
Generate UI manual test cases for **Part Categories** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Part Category is a hierarchical tree used to group parts.
- A category page displays a list of all parts under that category, plus a list of sub-categories.
- Moving a part between categories.
- Structural category (configuration controlled).
- Browsing, filtering parts by category.

Next free IDs: **UI-PARTS-019 through UI-PARTS-028**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- Ground every step in retrieved context. If a flow is not supported, emit `NEED_CONTEXT: <what>`.
- P1 = browsing category, viewing parts under a category, assigning part to category at creation. P2 = sub-categories, moving a part. P3 = edge cases.
- Tags: `category`, `tree`, `filter`.

```

### Response
```
| ID | Title | Preconditions | Steps | Expected | Priority | Tags |
|---|---|---|---|---|---|---|
| UI-PARTS-019 | Browse a part category to view contained parts | logged in as admin; parts exist in "ROOT" category | 1. Navigate to Parts list<br>2. Select a category from the tree | The page displays parts belonging to the selected category.<br>The part list includes name, description, and stock level. | P1 | `category`, `tree` |
| UI-PARTS-020 | Verify parts in sub-categories are visible in parent category | logged in as admin; part "A" is in sub-category "Sub-1" of "ROOT" | 1. Navigate to "ROOT" category | Part "A" is visible in the "ROOT" category part list. | P1 | `category`, `tree` |
| UI-PARTS-021 | Assign a part to a category during creation | logged in as admin; category "QA" exists | 1. Click "Create Part"<br>2. Select "QA" from the category field<br>3. Save the part | The part is created successfully.<br>The part's category is set to "QA". | P1 | `category`, `crud` |
| UI-PARTS-022 | View sub-categories within a category | logged in as admin; category "ROOT" has sub-category "ELECTRONICS" | 1. Navigate to "ROOT" category | The sub-category "ELECTRONICS" is displayed under the "ROOT" category list. | P2 | `category`, `tree` |
| UI-PARTS-023 | Move a part to a different category | logged in as admin; part "Resistor" is in category "COMPONENTS" | 1. Open part "Resistor" detail view<br>2. Edit the part<br>3. Change category to "PASSIVE"<br>4. Save | The part is updated successfully.<br>The part's category is now "PASSIVE". | P2 | `category`, `crud` |
| UI-PARTS-024 | Filter parts list by category | logged in as admin; multiple parts exist in different categories | 1. Navigate to Parts list<br>2. Apply a category filter | The list only shows parts belonging to the selected category or its sub-categories. | P1 | `category`, `filter` |
| UI-PARPS-025 | View an empty category | logged in as admin; category "EMPTY-CAT" has no parts | 1. Navigate to "EMPTY-CAT" category | The part list is empty. | P3 | `category`, `negative` |
| UI-PARTS-026 | Verify deep hierarchy part visibility | logged in as admin; Part "X" is in a level 3 sub-category | 1. Navigate to the top-level category | Part "X" is visible in the top-level category list. | P2 | `category`, `tree` |
| UI-PARTS-027 | Verify part list column visibility | logged in as admin; parts exist in category | 1. Navigate to a category page | The list displays part name, description, image thumbnail, category, and stock level. | P1 | `category`, `tree` |
| UI-PARTS-028 | Navigate to part detail from category list | logged in as admin; parts exist in category | 1. Navigate to a category page<br>2. Click on a part name | The user is redirected to the Part Detail view for that specific part. | P1 | `category` |
```

---
## 2026-04-13T20:39:49.304Z — phase1 / phase1-ui-units

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-units.md
- metrics: duration_ms=123783 model=qa-gemma prompt_tokens=5872 completion_tokens=3021 total_tokens=8893

### Retrieved
  - [18] inventree/parts/index.md :: Units of Measure[¶](#units-of-measure "Permanent link") (score -11.162)
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -11.340)
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.844)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -12.061)
  - [65] qa/best-practices.md :: 2. Playwright API testing (score -12.558)
  - [73] qa/design-notes.md :: 2026-04-13 (score -12.716)
  - [87] qa/implementation-plan.md :: Phase 3 — UI Automation (score -12.781)
  - [68] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -12.783)
  - [70] qa/best-practices.md :: 6. Repository conventions (score -12.785)
  - [86] qa/implementation-plan.md :: Phase 2 — API Tests (score -12.855)

### Prompt preview
```
Generate UI manual test cases for **Units of Measure** on Parts in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Physical units (mass, length, etc.) assigned to a Part.
- Unit validation: rejecting invalid unit strings.
- Supplier Part Units: how a supplier's pack size relates to the base part's unit of measure.
- Conversion from supplier pack to part stock quantity.

Next free IDs: **UI-PARTS-041 through UI-PARTS-046**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- If the retrieved context does not name a specific unit string or conversion example, do not invent one — use generic placeholders referenced in the docs.
- P1 = setting a valid unit on a part. P2 = invalid unit rejection, supplier pack conversion. P3 = edge cases.
- Tags: `units`, `validation`.

```

### Response
```
| ID | Title | Preconditions | Steps | Expected | Priority | Tags |
|---|---|---|---|---|---|---|
| UI-PARTS-041 | Set a physical unit of measure for a part | logged in as admin; part exists | 1. Open part details.<br>2. Edit part.<br>3. Enter a physical unit (e.g., "metres").<br>4. Save. | Unit of measure is updated to "metres". | P1 | `units` |
| UI-PARTS-042 | Verify default unit of measure is blank | logged in as admin; part exists | 1. Open part details.<br>2. Observe the unit of measure field. | The unit of measure field is blank. | P1 | `units` |
| UI-PARTS-043 | Set a compatible supplier part unit | logged in as admin; base part has unit "metres"; supplier part exists | 1. Open supplier part details.<br>2. Edit supplier part unit.<br>3. Enter a compatible unit (e.g., "cm").<br>4. Save. | Supplier part unit is updated to "cm". | P2 | `units`, `validation`, `supplier` |
| UI-PARTS-044 | Reject incompatible supplier part unit | logged in as supplier part; base part has unit "metres"; supplier part exists | 1. Open supplier part details.<br>2. Edit supplier part unit.<br>3. Enter an incompatible unit (e.g., "litres").<br>4. Save. | An error message is displayed. | P2 | `units`, `validation`, `negative`, `supplier` |
| UI-PARTS-045 | Set supplier part unit to another compatible unit | logged in as admin; base part has unit "metres"; supplier part exists | 1. Open supplier part details.<br>2. Edit supplier part unit.<br>3. Enter "inches".<br>4. Save. | Supplier part unit is updated to "inches". | P2 | `units`, `supplier` |
| UI-PARTS-046 | Set supplier part unit to blank | logged in as admin; base part has unit "metres"; supplier part exists | 1. Open supplier part details.<br>2. Edit supplier part unit.<br>3. Clear the unit field.<br>4. Save. | Supplier part unit is blank. | P3 | `units`, `edge-case` |

NEED_CONTEXT: Conversion from supplier pack to part stock quantity — No UI elements or configuration fields (e.g., conversion factor/multiplier) are present in the provided context to ground a test case for the conversion logic.
```

---
## 2026-04-13T20:40:55.049Z — phase1 / phase1-ui-parameters

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-parameters.md
- metrics: duration_ms=65461 model=qa-gemma prompt_tokens=6140 completion_tokens=1495 total_tokens=7635

### Retrieved
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -10.666)
  - [48] inventree/parts/test.md :: Part Test Templates[¶](#part-test-templates "Permanent link") (score -11.113)
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.650)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.788)
  - [49] inventree/parts/test.md :: Part Test Templates[¶](#part-test-templates "Permanent link") (score -11.820)
  - [73] qa/design-notes.md :: 2026-04-13 (score -12.370)
  - [79] qa/implementation-plan.md :: Phase 0 — Infrastructure Bootstrap (score -12.465)
  - [65] qa/best-practices.md :: 2. Playwright API testing (score -12.653)
  - [70] qa/best-practices.md :: 6. Repository conventions (score -12.785)
  - [69] qa/best-practices.md :: 5. InvenTree Parts domain — cheatsheet (score -12.810)

### Prompt preview
```
Generate UI manual test cases for **Part Parameters** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Parameters are typed metadata attached to a Part via a Parameter Template.
- Parameter Template has name, units.
- Adding, editing, removing parameters on a Part.
- Template parts may propagate parameters to variants.

Next free IDs: **UI-PARTS-047 through UI-PARTS-054**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- Ground every step. If context does not show a UI flow for creating a Parameter Template separately from using it, emit `NEED_CONTEXT: parameter template creation UI`.
- P1 = add parameter to part, view parameters on detail. P2 = edit, remove, template propagation. P3 = validation.
- Tags: `parameters`.

```

### Response
```
NEED_CONTEXT: parameter template creation UI
NEED_CONTEXT: UI structure and steps for managing parameters on a Part (e.g., tabs, buttons, or section location)
```

---
## 2026-04-13T20:59:47.602Z — speed / speed-smoke

- system: (none)
- prompt-file: (inline)
- metrics: duration_ms=2659 model=qa-gemma prompt_tokens=3162 completion_tokens=22 total_tokens=3184

### Retrieved
  - [64] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -15.712)
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -15.954)
  - [88] qa/implementation-plan.md :: Phase 3 — UI Automation (score -16.801)
  - [43] inventree/parts/stocktake.md :: Stocktake Reports[¶](#stocktake-reports "Permanent link") (score -16.965)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -16.968)
  - [74] qa/design-notes.md :: 2026-04-13 (score -17.060)
  - [70] qa/best-practices.md :: 6. Repository conventions (score -17.231)
  - [76] qa/implementation-plan.md :: Legend (score -17.232)

### Prompt preview
```
Output one Playwright TS assertion for a visible button labeled Save. One line only, no prose.
```

### Response
```
```ts
expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
```
```

---
## 2026-04-13T21:00:51.571Z — phase1 / phase1-ui-attributes

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-attributes.md
- metrics: duration_ms=15692 model=qa-gemma prompt_tokens=5850 completion_tokens=1228 total_tokens=7078

### Retrieved
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -11.048)
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.816)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -12.146)
  - [65] qa/best-practices.md :: 2. Playwright API testing (score -12.157)
  - [49] inventree/parts/test.md :: Part Test Templates[¶](#part-test-templates "Permanent link") (score -12.508)
  - [48] inventree/parts/test.md :: Part Test Templates[¶](#part-test-templates "Permanent link") (score -12.574)
  - [64] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -12.574)
  - [14] inventree/parts/index.md :: Part Attributes[¶](#part-attributes "Permanent link") (score -12.772)
  - [59] inventree/parts/views.md :: Part Tabs[¶](#part-tabs "Permanent link") (score -12.805)
  - [87] qa/implementation-plan.md :: Phase 3 — UI Automation (score -12.899)

### Prompt preview
```
Generate UI manual test cases for **Part Attributes** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Boolean attribute toggles on a Part: Virtual, Template, Assembly, Component, Testable, Trackable, Purchaseable, Salable, Active.
- Each toggle changes visibility of related features (e.g. Assembly enables BOM tab, Purchaseable enables Supplier data, Trackable enables serial tracking, Virtual suppresses stock).
- Locked parts: a locked part cannot have its attributes changed.
- Active / inactive parts.

Next free IDs: **UI-PARTS-029 through UI-PARTS-040**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- One case per meaningful attribute-related behavior, not one per toggle existence.
- P1 = Assembly toggle enables BOM tab; Virtual hides stock; Purchaseable enables supplier data; Active/Inactive toggle. P2 = Trackable, Testable, Salable. P3 = Template boolean (covered in templates area), Component.
- Tags: `attribute`, plus the specific attribute name.
- If context is missing for a specific attribute's side-effect, emit `NEED_CONTEXT: side-effects of <attribute>`.

```

### Response
```
| ID | Title | Preconditions | Steps | Expected | Priority | Tags |
| --- | --- | --- | --- | --- | --- | --- |
| UI-PARTS-029 | Toggle Virtual attribute on a Part | logged in as admin; category QA-ROOT exists | 1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Virtual" checkbox<br>5. Save the part | The "Stock" tab should be hidden and the "BOM" tab should be visible | P1 | attribute, virtual |
| UI-PARTS-030 | Toggle Template attribute on a Part | logged in as admin; category QA-ROOT exists | 1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Template" checkbox<br>5. Save the part | The part should be able to have variants and BOMs created under it | P1 | attribute, template |
| UI-PARTS-031 | Toggle Assembly attribute on a Part | logged in as admin; category QA-ROOT exists | 1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Assembly" checkbox<br>5. Save the part | The "BOM" tab should be visible and the "Stock" tab should be hidden | P1 | attribute, assembly |
| UI-PARTS-032 | Toggle Component attribute on a Part | logged in as admin; category QA-ROOT exists | 1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Component" checkbox<br>5. Save the part | The part should be able to be used as a sub-component of another assembly | P1 | attribute, component |
| UI-PARTS-033 | Toggle Testable attribute on a Part | logged in as admin; category QA-ROOT exists | 1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Testable" checkbox<br>5. Save the part | The part should have a test template associated with it and stock items can be tested against this template | P2 | attribute, testable |
| UI-PARTS-034 | Toggle Trackable attribute on a Part | logged in as admin; category QA-ROOT exists | 1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Trackable" checkbox<br>5. Save the part | The part should have fields for batch numbers and serial numbers, and stock items can be tracked by these identifiers | P2 | attribute, trackable |
| UI-PARTS-035 | Toggle Purchaseable attribute on a Part | logged in as admin; category QA-ROOT exists | 1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Purchaseable" checkbox<br>5. Save the part | The part should have fields for supplier data and stock items can be purchased from these suppliers | P2 | attribute, purchaseable |
| UI-PARTS-036 | Toggle Salable attribute on a Part | logged in as admin; category QA-ROOT exists | 1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Salable" checkbox<br>5. Save the part | The part should have fields for price and stock items can be sold at this price | P2 | attribute, salable |
| UI-PARTS-037 | Toggle Active/Inactive on a Part | logged in as admin; category QA-ROOT exists | 1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Active" checkbox<br>5. Save the part<br>6. Deactivate the part | The part should not be visible in search results or available for purchase/sale | P1 | attribute, active/inactive |
| UI-PARTS-038 | Lock a Part and attempt to change attributes | logged in as admin; category QA-ROOT exists | 1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Locked" checkbox<br>5. Attempt to change any attribute<br>6. Save the part | The attributes should not be editable and an error message should be displayed | P1 | attribute, locked |
| UI-PARTS-039 | Unlock a Part and change attributes | logged in as admin; category QA-ROOT exists | 1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Locked" checkbox<br>5. Uncheck the "Locked" checkbox<br>6. Change any attribute<br>7. Save the part | The attributes should be editable and saved successfully | P1 | attribute, locked |
| UI-PARTS-040 | Toggle Active/Inactive on a Locked Part | logged in as admin; category QA-ROOT exists | 1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Locked" checkbox<br>5. Attempt to change the "Active" checkbox<br>6. Save the part | The attribute should not be editable and an error message should be displayed | P1 | attribute, locked |

Note: Some cases may require additional context or clarification on specific side-effects of each attribute toggle.
```

---
## 2026-04-13T21:01:04.557Z — phase1 / phase1-ui-parameters

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-parameters.md
- metrics: duration_ms=12723 model=qa-gemma prompt_tokens=5759 completion_tokens=1015 total_tokens=6774

### Retrieved
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -10.666)
  - [48] inventree/parts/test.md :: Part Test Templates[¶](#part-test-templates "Permanent link") (score -11.113)
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.650)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.788)
  - [49] inventree/parts/test.md :: Part Test Templates[¶](#part-test-templates "Permanent link") (score -11.820)
  - [73] qa/design-notes.md :: 2026-04-13 (score -12.370)
  - [79] qa/implementation-plan.md :: Phase 0 — Infrastructure Bootstrap (score -12.465)
  - [65] qa/best-practices.md :: 2. Playwright API testing (score -12.653)
  - [70] qa/best-practices.md :: 6. Repository conventions (score -12.785)
  - [69] qa/best-practices.md :: 5. InvenTree Parts domain — cheatsheet (score -12.810)

### Prompt preview
```
Generate UI manual test cases for **Part Parameters** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Parameters are typed metadata attached to a Part via a Parameter Template.
- Parameter Template has name, units.
- Adding, editing, removing parameters on a Part.
- Template parts may propagate parameters to variants.

Next free IDs: **UI-PARTS-047 through UI-PARTS-054**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- Ground every step. If context does not show a UI flow for creating a Parameter Template separately from using it, emit `NEED_CONTEXT: parameter template creation UI`.
- P1 = add parameter to part, view parameters on detail. P2 = edit, remove, template propagation. P3 = validation.
- Tags: `parameters`.

```

### Response
```
```markdown
| ID | Title | Preconditions | Steps | Expected | Priority | Tags |
|---|---|---|---|---|---|---|
| UI-PARTS-047 | Add a parameter to a part from the Parts list | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Select an existing part<br>3. Click on "Edit" button<br>4. Go to the "Parameters" tab<br>5. Click on "Add Parameter"<br>6. Enter a parameter name and units<br>7. Save changes | The new parameter is added to the part's parameters list; the parameter is visible in the Parameters tab of the part detail page | P1 | parameters |
| UI-PARTS-048 | View parameters on a part detail page | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Select an existing part with parameters<br>3. Click on "Edit" button<br>4. Go to the "Parameters" tab | The parameters are displayed correctly in the Parameters tab of the part detail page | P1 | parameters |
| UI-PARTS-049 | Edit a parameter on a part from the Parts list | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Select an existing part with parameters<br>3. Click on "Edit" button<br>4. Go to the "Parameters" tab<br>5. Find and click on the parameter to edit<br>6. Modify the parameter name or units<br>7. Save changes | The parameter is updated correctly in the part's parameters list; the parameter is visible in the Parameters tab of the part detail page | P2 | parameters |
| UI-PARTS-050 | Remove a parameter from a part from the Parts list | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Select an existing part with parameters<br>3. Click on "Edit" button<br>4. Go to the "Parameters" tab<br>5. Find and click on the parameter to remove<br>6. Confirm removal | The parameter is removed from the part's parameters list; the parameter is no longer visible in the Parameters tab of the part detail page | P2 | parameters |
| UI-PARTS-051 | Add a parameter template and propagate it to variants | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Select an existing part (template)<br>3. Click on "Edit" button<br>4. Go to the "Parameters" tab<br>5. Click on "Add Parameter Template"<br>6. Enter a parameter template name and units<br>7. Save changes | The new parameter template is added to the part's parameters list; the parameter template is visible in the Parameters tab of the part detail page | P2 | parameters |
| UI-PARTS-052 | Add a parameter using a parameter template on a variant part | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Select an existing variant part<br>3. Click on "Edit" button<br>4. Go to the "Parameters" tab<br>5. Click on "Add Parameter"<br>6. Select a parameter template from the dropdown<br>7. Save changes | The new parameter is added to the variant's parameters list; the parameter is visible in the Parameters tab of the variant part detail page | P2 | parameters |
| UI-PARTS-053 | Validate that adding a duplicate parameter name fails | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Select an existing part<br>3. Click on "Edit" button<br>4. Go to the "Parameters" tab<br>5. Click on "Add Parameter"<br>6. Enter a parameter name that already exists<br>7. Save changes | An error message is displayed indicating that the parameter name already exists; no new parameter is added | P3 | parameters |
| UI-PARTS-054 | Validate that adding a parameter with invalid units fails | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Select an existing part<br>3. Click on "Edit" button<br>4. Go to the "Parameters" tab<br>5. Click on "Add Parameter"<br>6. Enter a parameter name and invalid units (e.g., "kg/m")<br>7. Save changes | An error message is displayed indicating that the units are invalid; no new parameter is added | P3 | parameters |
```
```

---
## 2026-04-13T21:01:17.750Z — phase1 / phase1-ui-templates

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-templates.md
- metrics: duration_ms=12926 model=qa-gemma prompt_tokens=5594 completion_tokens=1024 total_tokens=6618

### Retrieved
  - [48] inventree/parts/test.md :: Part Test Templates[¶](#part-test-templates "Permanent link") (score -9.832)
  - [46] inventree/parts/template.md :: Part Templates[¶](#part-templates "Permanent link") (score -10.549)
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -10.733)
  - [57] inventree/parts/views.md :: Part Tabs[¶](#part-tabs "Permanent link") (score -11.312)
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.314)
  - [49] inventree/parts/test.md :: Part Test Templates[¶](#part-test-templates "Permanent link") (score -11.503)
  - [69] qa/best-practices.md :: 5. InvenTree Parts domain — cheatsheet (score -11.539)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.934)
  - [35] inventree/parts/revision.md :: Part Revisions[¶](#part-revisions "Permanent link") (score -11.966)
  - [59] inventree/parts/views.md :: Part Tabs[¶](#part-tabs "Permanent link") (score -12.193)

### Prompt preview
```
Generate UI manual test cases for **Template and Variant parts** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- A Template part can have Variant children.
- Template's total stock aggregates all variant stock.
- Creating a variant under a template.
- Viewing variants of a template.
- Cannot have circular template relationships.

Next free IDs: **UI-PARTS-055 through UI-PARTS-062**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- P1 = mark part as Template, create a Variant, view variants tab. P2 = aggregate stock display, unmark template. P3 = negative/circular.
- Tags: `template`, `variant`.

```

### Response
```
```markdown
| ID | Title | Preconditions | Steps | Expected | Priority | Tags |
|----|-------|---------------|-------|----------|----------|------|
| UI-PARTS-055 | Mark part as Template and create a Variant | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Click on "New Part"<br>3. Fill out the form with required details (e.g., name, IPN)<br>4. Check the "Template" option<br>5. Submit the form<br>6. Navigate to the Variants tab of the created template part<br>7. Click on "New Variant"<br>8. Fill out the form with required details (e.g., name, IPN)<br>9. Submit the form | 1. The new part should be marked as a Template<br>2. A new variant should be created under the template part<br>3. The variants tab of the template part should display the newly created variant | P1 | template, variant |
| UI-PARTS-056 | View variants of a Template part | logged in as admin; category QA-ROOT exists; template part with variants already created | 1. Navigate to the Variants tab of an existing template part<br>2. Verify that all associated variants are displayed | 1. The variants tab should list all variants linked to the template part | P1 | template, variant |
| UI-PARTS-057 | Aggregate stock display for a Template part | logged in as admin; category QA-ROOT exists; template part with variants already created | 1. Navigate to the Stock tab of an existing template part<br>2. Verify that the total stock quantity is displayed and includes all variant stock quantities | 1. The total stock quantity should reflect the sum of stock for all variants | P2 | template, variant |
| UI-PARTS-058 | Unmark a Template part | logged in as admin; category QA-ROOT exists; template part with variants already created | 1. Navigate to the Details tab of an existing template part<br>2. Uncheck the "Template" option<br>3. Submit the form | 1. The part should no longer be marked as a Template<br>2. The Variants tab should no longer be accessible | P2 | template, variant |
| UI-PARTS-059 | Negative: Attempt to create a circular template relationship | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Click on "New Part"<br>3. Fill out the form with required details (e.g., name, IPN)<br>4. Check the "Template" option<br>5. Submit the form<br>6. Attempt to create a variant under the newly created template part that references itself | 1. The system should prevent creating a circular reference and display an error message | P3 | negative, circular |
| UI-PARTS-060 | Negative: Attempt to create a duplicate IPN for a Variant | logged in as admin; category QA-ROOT exists; template part with variants already created | 1. Navigate to the Variants tab of an existing template part<br>2. Click on "New Variant"<br>3. Fill out the form with required details (e.g., name, IPN) using an IPN that is already in use by another variant | 1. The system should prevent creating a duplicate IPN and display an error message | P3 | negative |
| UI-PARTS-061 | Negative: Attempt to create an inactive part as a Variant | logged in as admin; category QA-ROOT exists; template part with variants already created | 1. Navigate to the Parts list<br>2. Click on "New Part"<br>3. Fill out the form with required details (e.g., name, IPN)<br>4. Uncheck the "Active" option<br>5. Submit the form<br>6. Attempt to create a variant under the newly created inactive part | 1. The system should prevent creating an inactive part as a Variant and display an error message | P3 | negative |
| UI-PARTS-062 | Negative: Attempt to create a circular revision for a Template part | logged in as admin; category QA-ROOT exists; template part with variants already created | 1. Navigate to the Parts list<br>2. Click on "New Part"<br>3. Fill out the form with required details (e.g., name, IPN)<br>4. Check the "Template" option<br>5. Submit the form<br>6. Attempt to create a revision for the newly created template part that references itself | 1. The system should prevent creating a circular reference and display an error message | P3 | negative |
```
```

---
## 2026-04-13T21:01:31.494Z — phase1 / phase1-ui-revisions

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-revisions.md
- metrics: duration_ms=13483 model=qa-gemma prompt_tokens=5044 completion_tokens=1105 total_tokens=6149

### Retrieved
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -9.983)
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -11.346)
  - [34] inventree/parts/revision.md :: Part Revisions[¶](#part-revisions "Permanent link") (score -11.447)
  - [35] inventree/parts/revision.md :: Part Revisions[¶](#part-revisions "Permanent link") (score -11.636)
  - [38] inventree/parts/revision.md :: Revision Navigation[¶](#revision-navigation "Permanent link") (score -11.735)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.955)
  - [56] inventree/parts/views.md :: Part Details[¶](#part-details "Permanent link") (score -11.979)
  - [37] inventree/parts/revision.md :: Create a Revision[¶](#create-a-revision "Permanent link") (score -12.021)
  - [79] qa/implementation-plan.md :: Phase 0 — Infrastructure Bootstrap (score -12.236)
  - [87] qa/implementation-plan.md :: Phase 3 — UI Automation (score -12.253)

### Prompt preview
```
Generate UI manual test cases for **Part Revisions** in the InvenTree Parts module.

Scope (ground in retrieved context only):
- Revisions are created via Duplicate Part with a "Revision Of" link and a "Revision" number.
- Navigating between revisions of the same part.
- Viewing revision history for a part.
- Revision numbering uniqueness per parent.

Next free IDs: **UI-PARTS-063 through UI-PARTS-070**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- P1 = create a revision (if not already covered in creation area — focus on the revision-specific outcomes), navigate between revisions. P2 = revision number validation, list all revisions. P3 = edge cases.
- Tags: `revision`.

```

### Response
```
```markdown
| ID | Title | Preconditions | Steps | Expected | Priority | Tags |
|----|-------|---------------|-------|----------|----------|------|
| UI-PARTS-063 | Create a part revision from the Parts list | logged in as admin; category QA-ROOT exists; part QA-TEST exists with multiple revisions | 1. Navigate to the Parts list<br>2. Click on "Show Part Details" for part QA-TEST<br>3. Click on the part actions menu (three vertical dots)<br>4. Select "Duplicate Part"<br>5. Set the "Revision Of" field to part QA-TEST<br>6. Set a unique revision number<br>7. Submit the form | The new part should be created with the correct "Revision Of" and "Revision" fields; the new part should appear in the Parts list | P1 | revision |
| UI-PARTS-064 | Navigate between revisions of a part | logged in as admin; category QA-ROOT exists; part QA-TEST has multiple revisions | 1. Navigate to the Parts list<br>2. Click on "Show Part Details" for part QA-TEST<br>3. Use the "Select Part Revision" drop-down to navigate between revisions | The correct revision should be selected and displayed; the revision history should be visible | P1 | revision |
| UI-PARTS-065 | View revision history for a part | logged in as admin; category QA-ROOT exists; part QA-TEST has multiple revisions | 1. Navigate to the Parts list<br>2. Click on "Show Part Details" for part QA-TEST<br>3. Use the "Select Part Revision" drop-down to navigate between revisions<br>4. Observe the revision history | The revision history should be displayed; each revision should have a unique number and reference to the original part | P1 | revision |
| UI-PARTS-066 | Validate uniqueness of revision numbers per parent part | logged in as admin; category QA-ROOT exists; part QA-TEST has multiple revisions | 1. Navigate to the Parts list<br>2. Click on "Show Part Details" for part QA-TEST<br>3. Attempt to create a new revision with an existing revision number<br>4. Observe error message | An error message should be displayed indicating that the revision number already exists; the new revision should not be created | P2 | revision |
| UI-PARTS-067 | Create a template part and attempt to create a revision | logged in as admin; category QA-ROOT exists; template part QA-TMP exists | 1. Navigate to the Parts list<br>2. Click on "Show Part Details" for template part QA-TMP<br>3. Click on the part actions menu (three vertical dots)<br>4. Select "Duplicate Part"<br>5. Set the "Revision Of" field to template part QA-TMP<br>6. Set a unique revision number<br>7. Submit the form | The request should be rejected with an error message; no new revision should be created | P3 | revision |
| UI-PARTS-068 | Create a variant part and attempt to create a revision | logged in as admin; category QA-ROOT exists; variant part QA-VAR exists | 1. Navigate to the Parts list<br>2. Click on "Show Part Details" for variant part QA-VAR<br>3. Click on the part actions menu (three vertical dots)<br>4. Select "Duplicate Part"<br>5. Set the "Revision Of" field to variant part QA-VAR<br>6. Set a unique revision number<br>7. Submit the form | The new part should be created with the correct "Revision Of" and "Revision" fields; the new part should appear in the Parts list | P1 | revision |
| UI-PARTS-069 | Attempt to create a circular reference revision | logged in as admin; category QA-ROOT exists; part QA-TEST exists | 1. Navigate to the Parts list<br>2. Click on "Show Part Details" for part QA-TEST<br>3. Click on the part actions menu (three vertical dots)<br>4. Select "Duplicate Part"<br>5. Set the "Revision Of" field to part QA-TEST<br>6. Set the "Revision" field to the same value as part QA-TEST's revision number<br>7. Submit the form | The request should be rejected with an error message; no new revision should be created | P3 | revision |
| UI-PARTS-070 | Attempt to create a duplicate IPN revision | logged in as admin; category QA-ROOT exists; part QA-TEST exists | 1. Navigate to the Parts list<br>2. Click on "Show Part Details" for part QA-TEST<br>3. Click on the part actions menu (three vertical dots)<br>4. Select "Duplicate Part"<br>5. Set the "Revision Of" field to part QA-TEST<br>6. Set a duplicate IPN value<br>7. Submit the form | The request should be rejected with an error message; no new revision should be created | P3 | revision |
```
```

---
## 2026-04-13T21:01:43.777Z — phase1 / phase1-ui-negative

- system: ../system-instructions.md
- prompt-file: ../prompts/phase1-ui-negative.md
- metrics: duration_ms=12013 model=qa-gemma prompt_tokens=5500 completion_tokens=949 total_tokens=6449

### Retrieved
  - [83] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -10.987)
  - [67] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.250)
  - [66] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.570)
  - [73] qa/design-notes.md :: 2026-04-13 (score -11.887)
  - [87] qa/implementation-plan.md :: Phase 3 — UI Automation (score -12.007)
  - [68] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -12.170)
  - [65] qa/best-practices.md :: 2. Playwright API testing (score -12.438)
  - [70] qa/best-practices.md :: 6. Repository conventions (score -12.630)
  - [79] qa/implementation-plan.md :: Phase 0 — Infrastructure Bootstrap (score -12.702)
  - [86] qa/implementation-plan.md :: Phase 2 — API Tests (score -12.832)

### Prompt preview
```
Generate **negative** UI manual test cases for the InvenTree Parts module.

Scope (ground in retrieved context only):
- Duplicate IPN rejection.
- Attempting to edit a locked part.
- Attempting to set an inactive part on a new stock transaction (if the flow is in context).
- Circular revision reference.
- Invalid units string.
- Unique code / name constraints.
- Missing required fields.
- Unauthorized write attempts (e.g. read-only user).

Next free IDs: **UI-PARTS-071 through UI-PARTS-080**.

Output: ONLY the markdown table, starting with the header row. Columns per system-instructions.md.

Rules:
- Ground every failure mode in something the retrieved docs explicitly state (e.g. "cannot be changed", "must be unique", "locked"). Do not invent validation behavior.
- If a negative scenario is not supported by the context, emit `NEED_CONTEXT: <scenario>` and skip it.
- P2 for most negative tests, P3 for deep edge cases. Tags include `negative` plus a specific tag.

```

### Response
```
```markdown
| ID | Title | Preconditions | Steps | Expected | Priority | Tags |
| --- | --- | --- | --- | --- | --- | --- |
| UI-PARTS-071 | Attempt to create a part with a duplicate IPN | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Click "Create Part"<br>3. Enter an existing IPN<br>4. Submit form | The system should display an error message indicating that the IPN is already in use | P2 | negative |
| UI-PARTS-072 | Attempt to edit a locked part | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Find and click on a locked part<br>3. Click "Edit" | The system should display an error message indicating that the part is locked and cannot be edited | P2 | negative |
| UI-PARTS-073 | Attempt to set an inactive part on a new stock transaction | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Find and click on an inactive part<br>3. Click "Create Stock Transaction"<br>4. Enter valid quantity<br>5. Submit form | The system should display an error message indicating that the part is inactive and cannot be used in a stock transaction | P2 | negative |
| UI-PARTS-074 | Attempt to create a part with a circular revision reference | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Click "Create Part"<br>3. Enter an IPN and name<br>4. Set parent part to itself<br>5. Submit form | The system should display an error message indicating that a circular revision reference is not allowed | P2 | negative |
| UI-PARTS-075 | Attempt to create a part with an invalid units string | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Click "Create Part"<br>3. Enter valid IPN and name<br>4. Set units to an invalid string (e.g., "kg/m")<br>5. Submit form | The system should display an error message indicating that the units string is invalid | P2 | negative |
| UI-PARTS-076 | Attempt to create a part with a unique code constraint violation | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Click "Create Part"<br>3. Enter an existing unique code<br>4. Submit form | The system should display an error message indicating that the unique code is already in use | P2 | negative |
| UI-PARTS-077 | Attempt to create a part with missing required fields | logged in as admin; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Click "Create Part"<br>3. Leave all fields blank<br>4. Submit form | The system should display an error message indicating that one or more required fields are missing | P2 | negative |
| UI-PARTS-078 | Attempt to create a part as a read-only user | logged in as read-only; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Click "Create Part"<br>3. Enter valid data and submit form | The system should display an error message indicating that you do not have permission to create a part | P2 | negative |
| UI-PARTS-079 | Attempt to edit a part as a read-only user | logged in as read-only; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Find and click on an existing part<br>3. Click "Edit"<br>4. Make changes and submit form | The system should display an error message indicating that you do not have permission to edit a part | P2 | negative |
| UI-PARTS-080 | Attempt to delete a part as a read-only user | logged in as read-only; category QA-ROOT exists | 1. Navigate to the Parts list<br>2. Find and click on an existing part<br>3. Click "Delete"<br>4. Confirm deletion | The system should display an error message indicating that you do not have permission to delete a part | P2 | negative |
```
```

---
## 2026-04-13T21:17:30.118Z — phase2 / phase2-api-crud

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-api-crud.md
- metrics: duration_ms=16496 model=qa-gemma prompt_tokens=7381 completion_tokens=1109 total_tokens=8490

### Retrieved
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -9.612)
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -9.740)
  - [416] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -10.229)
  - [396] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -10.910)
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -10.994)
  - [441] qa/prompts-journal.md :: 2026-04-13T19:23:31.281Z — phase1 / phase1-ui-creation (score -11.012)
  - [446] qa/prompts-journal.md :: 2026-04-13T19:48:50.465Z — phase1 / phase1-ui-categories (score -11.178)
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -11.300)
  - [420] qa/implementation-plan.md :: Phase 3 — UI Automation (score -11.346)
  - [400] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.412)
  - [445] qa/prompts-journal.md :: 2026-04-13T19:46:49.138Z — phase1 / phase1-ui-tabs (score -11.499)
  - [467] qa/prompts-journal.md :: 2026-04-13T21:01:04.557Z — phase1 / phase1-ui-parameters (score -11.500)

### Prompt preview
```
Generate **API manual test cases** for the InvenTree Parts **CRUD** endpoints.

Scope (ground in retrieved OpenAPI notes only):
- `GET /api/part/` — list parts.
- `POST /api/part/` — create part.
- `GET /api/part/{id}/` — retrieve part.
- `PATCH /api/part/{id}/` — update part.
- `DELETE /api/part/{id}/` — delete part.

Next free IDs: **API-PARTS-001 through API-PARTS-015**.

Output: ONLY a markdown table, starting with the header row from `system-instructions.md` API format:

```
| ID | Endpoint | Method | Title | Preconditions | Payload | Expected Status | Expected Body | Priority | Tags |
```

Rules:
- Every row must cite an endpoint that exists in the retrieved OpenAPI context. If you need a field that isn't in the context, emit `NEED_CONTEXT: <field>` after the table and skip that case.
- `Payload`: inline JSON or `—`. Keep small. Use placeholders like `<existing_category_id>` when a real value isn't known.
- `Expected Status`: exact numeric code.
- `Expected Body`: key assertions only. Use `<br>` to separate multiple. `—` if not applicable.
- Priorities: P1 = happy-path create/get/list/update/delete. P2 = optional fields, partial update. P3 = edge cases.
- Tags: include `crud` plus method-specific like `list`, `create`, `update`, `delete`.
- Authentication: assume every case uses Token auth. Do not repeat it in Preconditions unless it matters for the assertion.
- Partial output is allowed and encouraged. Produce every case you can ground.

```

### Response
```
| ID | Endpoint | Method | Title | Preconditions | Payload | Expected Status | Expected Body | Priority | Tags |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| API-PARTS-001 | /api/part/ | GET | List parts | logged in as admin; category QA-ROOT exists | — | 200 | count > 0<br>list includes parts under QA-ROOT | P1 | crud, list |
| API-PARTS-002 | /api/part/ | POST | Create part | logged in as admin; category QA-ROOT exists | ```json
{"name": "Test Part", "ipn": "TP001", "category": <existing_category_id>}
``` | 201 | name: "Test Part"<br>ipn: "TP001" | P1 | crud, create |
| API-PARTS-003 | /api/part/{id}/ | GET | Retrieve part | logged in as admin; category QA-ROOT exists | — | 200 | name: "Test Part"<br>ipn: "TP001" | P1 | crud, retrieve |
| API-PARTS-004 | /api/part/{id}/ | PATCH | Update part | logged in as admin; category QA-ROOT exists | ```json
{"name": "Updated Test Part"}
``` | 200 | name: "Updated Test Part" | P1 | crud, update |
| API-PARTS-005 | /api/part/{id}/ | DELETE | Delete part | logged in as admin; category QA-ROOT exists | — | 204 | — | P1 | crud, delete |
| API-PARTS-006 | /api/part/ | POST | Create part with optional fields | logged in as admin; category QA-ROOT exists | ```json
{"name": "Test Part", "ipn": "TP002", "category": <existing_category_id>, "description": "A test part"}
``` | 201 | name: "Test Part"<br>ipn: "TP002" | P2 | crud, create |
| API-PARTS-007 | /api/part/{id}/ | PATCH | Partial update of part | logged in as admin; category QA-ROOT exists | ```json
{"description": "Updated description"}
``` | 200 | description: "Updated description" | P2 | crud, update |
| API-PARTS-008 | /api/part/{id}/ | PATCH | Update non-existent field | logged in as admin; category QA-ROOT exists | ```json
{"non_existent_field": "value"}
``` | 400 | — | P3 | crud, update |
| API-PARTS-009 | /api/part/ | POST | Create part with missing required field | logged in as admin; category QA-ROOT exists | ```json
{"ipn": "TP003", "category": <existing_category_id>}
``` | 400 | — | P3 | crud, create |
| API-PARTS-010 | /api/part/{id}/ | DELETE | Delete non-existent part | logged in as admin; category QA-ROOT exists | — | 404 | — | P3 | crud, delete |
| API-PARTS-011 | /api/part/ | POST | Create part with duplicate IPN | logged in as admin; category QA-ROOT exists | ```json
{"name": "Test Part", "ipn": "TP001", "category": <existing_category_id>}
``` | 400 | — | P3 | crud, create |
| API-PARTS-012 | /api/part/{id}/ | PATCH | Update inactive part | logged in as admin; category QA-ROOT exists | ```json
{"is_active": false}
``` | 400 | — | P3 | crud, update |
| API-PARTS-013 | /api/part/ | POST | Create part with circular revision | logged in as admin; category QA-ROOT exists | ```json
{"name": "Test Part", "ipn": "TP004", "category": <existing_category_id>, "revision_of": <existing_part_id>}
``` | 400 | — | P3 | crud, create |
| API-PARTS-014 | /api/part/{id}/ | PATCH | Update unique code constraint | logged in as admin; category QA-ROOT exists | ```json
{"unique_code": "unique_code"}
``` | 400 | — | P3 | crud, update |
| API-PARTS-015 | /api/part/ | POST | Create part with invalid IPN format | logged in as admin; category QA-ROOT exists | ```json
{"name": "Test Part", "ipn": "invalid-ipn", "category": <existing_category_id>}
``` | 400 | — | P3 | crud, create |

NEED_CONTEXT: payload for creating a part with invalid IPN format
```

---
## 2026-04-13T21:17:44.207Z — phase2 / phase2-api-query

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-api-query.md
- metrics: duration_ms=13817 model=qa-gemma prompt_tokens=6339 completion_tokens=1066 total_tokens=7405

### Retrieved
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -10.353)
  - [396] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -10.488)
  - [416] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -10.676)
  - [418] qa/implementation-plan.md :: Phase 2 — API Tests (score -11.244)
  - [446] qa/prompts-journal.md :: 2026-04-13T19:48:50.465Z — phase1 / phase1-ui-categories (score -11.276)
  - [406] qa/design-notes.md :: 2026-04-13 (score -11.413)
  - [121] inventree/api/get-api-part-related.md :: Parameters (score -11.478)
  - [153] inventree/api/get-api-part-thumbs.md :: Parameters (score -11.555)
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -11.563)
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.605)
  - [401] qa/best-practices.md :: 5. InvenTree Parts domain — cheatsheet (score -11.724)
  - [180] inventree/api/patch-api-part-category.md :: patch-api-part-category (score -11.933)

### Prompt preview
```
Generate **API manual test cases** for **listing, filtering, pagination and search** on `GET /api/part/`.

Scope (ground in retrieved OpenAPI notes for `GET /api/part/` only):
- Query parameters exposed on the list endpoint: filters (category, active, assembly, component, purchaseable, salable, virtual, trackable, template, in_stock, name, IPN, search, ordering, limit, offset, etc.).
- Pagination behaviour (limit + offset).
- Text search across name/IPN/description.
- Ordering.

Next free IDs: **API-PARTS-016 through API-PARTS-030**.

Output: ONLY the markdown table, API case format. No prose.

Rules:
- One case per distinct filter/behaviour. Do not enumerate every filter as a separate case — group related ones.
- `Endpoint` column: `/api/part/` (with the query string embedded in `Payload` as `GET params: ?category=5&active=true`).
- `Method`: `GET`.
- `Expected Body`: describe expected count or shape assertions (e.g. "results contain only parts where active=true"). Use relative language — no hard-coded row counts.
- Only cite filter parameters that are listed in the retrieved OpenAPI notes. If a specific filter isn't in the context, emit `NEED_CONTEXT: filter <name>` instead.
- Priorities: P1 = category filter, search, pagination. P2 = boolean filters, ordering. P3 = edge cases (empty results, invalid params).
- Tags: `query`, `filter`, plus specific filter name.

```

### Response
```
```markdown
| ID | Endpoint | Method | Title | Preconditions | Payload | Expected Status | Expected Body | Priority | Tags |
|----|----------|--------|-------|---------------|---------|-----------------|---------------|----------|------|
| API-PARTS-016 | /api/part/?category=5&active=true | GET | List parts by category and active status | logged in as admin; category 5 exists | — | 200 | results contain only parts where category=5 and active=true | P1 | query, filter, category |
| API-PARTS-017 | /api/part/?search=test | GET | Search for parts by name/IPN/description | logged in as admin | — | 200 | results contain parts matching search term 'test' | P1 | query, filter, search |
| API-PARTS-018 | /api/part/?limit=5&offset=10 | GET | Paginate part list with limit and offset | logged in as admin | — | 200 | results contain parts from index 10 to 14 | P1 | query, filter, pagination |
| API-PARTS-019 | /api/part/?ordering=name | GET | Order parts by name | logged in as admin | — | 200 | results ordered by part name | P1 | query, filter, ordering |
| API-PARTS-020 | /api/part/?category=5&active=false | GET | List parts by category and inactive status | logged in as admin; category 5 exists | — | 200 | results contain only parts where category=5 and active=false | P1 | query, filter, category |
| API-PARTS-021 | /api/part/?category=5&assembly=true | GET | List parts by category and assembly status | logged in as admin; category 5 exists | — | 200 | results contain only parts where category=5 and assembly=true | P1 | query, filter, category |
| API-PARTS-022 | /api/part/?category=5&component=true | GET | List parts by category and component status | logged in as admin; category 5 exists | — | 200 | results contain only parts where category=5 and component=true | P1 | query, filter, category |
| API-PARTS-023 | /api/part/?category=5&purchaseable=true | GET | List parts by category and purchaseable status | logged in as admin; category 5 exists | — | 200 | results contain only parts where category=5 and purchaseable=true | P1 | query, filter, category |
| API-PARTS-024 | /api/part/?category=5&salable=true | GET | List parts by category and salable status | logged in as admin; category 5 exists | — | 200 | results contain only parts where category=5 and salable=true | P1 | query, filter, category |
| API-PARTS-025 | /api/part/?category=5&virtual=true | GET | List parts by category and virtual status | logged in as admin; category 5 exists | — | 200 | results contain only parts where category=5 and virtual=true | P1 | query, filter, category |
| API-PARTS-026 | /api/part/?category=5&trackable=true | GET | List parts by category and trackable status | logged in as admin; category 5 exists | — | 200 | results contain only parts where category=5 and trackable=true | P1 | query, filter, category |
| API-PARTS-027 | /api/part/?category=5&in_stock=true | GET | List parts by category and in-stock status | logged in as admin; category 5 exists | — | 200 | results contain only parts where category=5 and in_stock=true | P1 | query, filter, category |
| API-PARTS-028 | /api/part/?category=5&template=true | GET | List parts by category and template status | logged in as admin; category 5 exists | — | 200 | results contain only parts where category=5 and template=true | P1 | query, filter, category |
| API-PARTS-029 | /api/part/?category=5&ordering=-name | GET | Order parts by name in descending order | logged in as admin; category 5 exists | — | 200 | results ordered by part name in reverse | P1 | query, filter, ordering |
| API-PARTS-030 | /api/part/?category=5&limit=0 | GET | Paginate part list with limit=0 (should return an error) | logged in as admin; category 5 exists | — | 400 | invalid limit parameter | P3 | query, filter, pagination |
```
```

---
## 2026-04-13T21:17:59.167Z — phase2 / phase2-api-category

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-api-category.md
- metrics: duration_ms=14684 model=qa-gemma prompt_tokens=7542 completion_tokens=1073 total_tokens=8615

### Retrieved
  - [416] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -10.618)
  - [446] qa/prompts-journal.md :: 2026-04-13T19:48:50.465Z — phase1 / phase1-ui-categories (score -10.643)
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -10.814)
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.133)
  - [396] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -11.158)
  - [454] qa/prompts-journal.md :: 2026-04-13T20:07:43.105Z — phase1 / phase1-ui-categories (score -11.463)
  - [455] qa/prompts-journal.md :: 2026-04-13T20:07:43.105Z — phase1 / phase1-ui-categories (score -11.581)
  - [20] inventree/api/delete-api-part-category-parameters-id.md :: delete-api-part-category-parameters-id (score -11.600)
  - [441] qa/prompts-journal.md :: 2026-04-13T19:23:31.281Z — phase1 / phase1-ui-creation (score -11.665)
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -11.710)
  - [406] qa/design-notes.md :: 2026-04-13 (score -11.733)
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -11.842)

### Prompt preview
```
Generate **API manual test cases** for the Part Category endpoints.

Scope (ground in retrieved OpenAPI notes only):
- `GET /api/part/category/` — list categories.
- `POST /api/part/category/` — create category.
- `GET /api/part/category/{id}/` — retrieve category.
- `PATCH /api/part/category/{id}/` — update category (rename, reparent).
- `DELETE /api/part/category/{id}/` — delete category.
- `GET /api/part/category/tree/` — tree endpoint, if in context.
- `GET /api/part/category/parameters/` — category parameter templates, if in context.

Next free IDs: **API-PARTS-031 through API-PARTS-045**.

Output: ONLY the markdown table, API case format.

Rules:
- Happy path first: create category, retrieve, update (rename + reparent), delete.
- Hierarchy: creating a child under an existing parent; moving a category to a different parent.
- Tree endpoint: fetching the tree; asserting structure contains both parent and child.
- Validation: missing name, duplicate name at the same level (if docs state uniqueness), invalid parent ID.
- Cascade or protect on delete — only assert behaviour that is in the retrieved docs. If unclear, emit `NEED_CONTEXT: delete cascade behaviour`.
- Priorities: P1 CRUD + tree. P2 hierarchy ops, validation. P3 parameters-related.
- Tags: `category`, `tree`, `hierarchy`, `validation`.

```

### Response
```
| ID | Endpoint | Method | Title | Preconditions | Payload | Expected Status | Expected Body | Priority | Tags |
|---|---|---|---|---|---|---|---|---|---|
| API-PARTS-031 | /api/part/category/ | POST | Create a new category | logged in as admin; no categories exist | {"name": "NewCategory"} | 201 | name: NewCategory<br>parent: null | P1 | `category`, `crud` |
| API-PARTS-032 | /api/part/category/ | GET | List all categories | logged in as admin; one category exists | — | 200 | [{"name": "NewCategory", "id": 1}] | P1 | `category`, `tree` |
| API-PARTS-033 | /api/part/category/{id} | GET | Retrieve a specific category | logged in as admin; one category exists | — | 200 | {"name": "NewCategory", "id": 1, "parent": null} | P1 | `category`, `crud` |
| API-PARTS-034 | /api/part/category/{id} | PATCH | Rename and reparent a category | logged in as admin; one category exists | {"name": "RenamedCategory", "parent": 2} | 200 | {"name": "RenamedCategory", "id": 1, "parent": 2} | P1 | `category`, `crud` |
| API-PARTS-035 | /api/part/category/{id} | DELETE | Delete a category | logged in as admin; one category exists | — | 204 | — | P1 | `category`, `crud` |
| API-PARTS-036 | /api/part/category/tree/ | GET | Fetch the category tree | logged in as admin; one category exists | — | 200 | [{"name": "NewCategory", "id": 1, "parent": null}] | P2 | `category`, `tree` |
| API-PARTS-037 | /api/part/category/ | POST | Create a child category under an existing parent | logged in as admin; one category exists | {"name": "ChildCategory", "parent": 1} | 201 | name: ChildCategory<br>parent: 1 | P2 | `category`, `hierarchy` |
| API-PARTS-038 | /api/part/category/{id} | PATCH | Move a category to a different parent | logged in as admin; two categories exist | {"name": "ChildCategory", "parent": 2} | 200 | {"name": "ChildCategory", "id": 2, "parent": 2} | P2 | `category`, `hierarchy` |
| API-PARTS-039 | /api/part/category/ | POST | Create a category with duplicate name at the same level | logged in as admin; one category exists | {"name": "NewCategory"} | 400 | — | P2 | `category`, `validation` |
| API-PARTS-040 | /api/part/category/ | POST | Create a category with missing name | logged in as admin; no categories exist | {} | 400 | — | P2 | `category`, `validation` |
| API-PARTS-041 | /api/part/category/{id} | PATCH | Rename a category to an invalid parent ID | logged in as admin; one category exists | {"name": "InvalidParent", "parent": 999} | 400 | — | P2 | `category`, `validation` |
| API-PARTS-042 | /api/part/category/{id} | DELETE | Delete a category with child categories | logged in as admin; one category has children | — | 204 | — | P3 | `category`, `cascade` |
| API-PARTS-043 | /api/part/category/parameters/ | GET | Retrieve category parameter templates | logged in as admin; no parameters exist | — | 200 | [] | P3 | `category`, `parameters` |
| API-PARTS-044 | /api/part/category/parameters/ | POST | Create a new category parameter template | logged in as admin; no parameters exist | {"name": "NewParameter", "description": "A new parameter"} | 201 | name: NewParameter<br>description: A new parameter | P3 | `category`, `parameters` |
| API-PARTS-045 | /api/part/category/parameters/{id} | DELETE | Delete a category parameter template | logged in as admin; one parameter exists | — | 204 | — | P3 | `category`, `parameters` |

Please note that the `NEED_CONTEXT: delete cascade behaviour` case is not grounded in the provided context and should be reviewed for accuracy.
```

---
## 2026-04-13T21:18:15.999Z — phase2 / phase2-api-bom

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-api-bom.md
- metrics: duration_ms=16560 model=qa-gemma prompt_tokens=7460 completion_tokens=1239 total_tokens=8699

### Retrieved
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -10.383)
  - [416] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -10.718)
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -10.746)
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -11.385)
  - [406] qa/design-notes.md :: 2026-04-13 (score -11.429)
  - [441] qa/prompts-journal.md :: 2026-04-13T19:23:31.281Z — phase1 / phase1-ui-creation (score -11.485)
  - [402] qa/best-practices.md :: 6. Repository conventions (score -11.640)
  - [396] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -11.659)
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -11.830)
  - [446] qa/prompts-journal.md :: 2026-04-13T19:48:50.465Z — phase1 / phase1-ui-categories (score -11.877)
  - [457] qa/prompts-journal.md :: 2026-04-13T20:39:49.304Z — phase1 / phase1-ui-units (score -11.914)
  - [445] qa/prompts-journal.md :: 2026-04-13T19:46:49.138Z — phase1 / phase1-ui-tabs (score -11.920)

### Prompt preview
```
Generate **API manual test cases** for the BOM endpoints.

Scope (ground in retrieved OpenAPI notes only):
- `GET /api/bom/` — list BOM lines.
- `POST /api/bom/` — create a BOM line.
- `GET /api/bom/{id}/` — retrieve.
- `PATCH /api/bom/{id}/` — update.
- `DELETE /api/bom/{id}/` — delete.
- `GET /api/bom/{id}/validate/` or `POST /api/bom/{id}/validate/` — BOM validation, if in context.
- `POST /api/bom/substitute/` — BOM substitute line, if in context.

Next free IDs: **API-PARTS-046 through API-PARTS-060**.

Output: ONLY the markdown table, API case format.

Rules:
- Preconditions typically include: an assembly part `<assembly_id>` and a component part `<component_id>`.
- Happy path: add a BOM line with quantity, reference, optional notes; retrieve it; update the quantity; delete the line.
- Validation behaviour: `POST /api/bom/{id}/validate/` — only include cases if that endpoint is in the retrieved context.
- Substitutes: include only if `POST /api/bom/substitute/` is in the retrieved context.
- If a sub-area (validation, substitute) is not in context, emit `NEED_CONTEXT: <sub-area>` after the table.
- Priorities: P1 CRUD on a BOM line. P2 validation + substitutes. P3 edge cases (invalid references, zero quantity).
- Tags: `bom`, `assembly`, plus `substitute` / `validate` when applicable.

```

### Response
```
```markdown
| ID | Endpoint | Method | Title | Preconditions | Payload | Expected Status | Expected Body | Priority | Tags |
|----|----------|--------|-------|---------------|---------|-----------------|---------------|----------|------|
| API-PARTS-046 | /api/bom/ | GET | List BOM lines for an assembly part | logged in as admin; assembly part `<assembly_id>` exists | — | 200 | list of BOM lines with `id`, `part`, `quantity`, `reference` fields | P1 | bom |
| API-PARTS-047 | /api/bom/ | POST | Create a new BOM line for an assembly part | logged in as admin; assembly part `<assembly_id>` exists | `{ "part": <component_id>, "quantity": 1, "reference": "R1" }` | 201 | created BOM line with `id`, `part`, `quantity`, `reference` fields | P1 | bom |
| API-PARTS-048 | /api/bom/{id}/ | GET | Retrieve a specific BOM line | logged in as admin; assembly part `<assembly_id>` exists; BOM line `<id>` exists | — | 200 | retrieved BOM line with `id`, `part`, `quantity`, `reference` fields | P1 | bom |
| API-PARTS-049 | /api/bom/{id}/ | PATCH | Update a specific BOM line | logged in as admin; assembly part `<assembly_id>` exists; BOM line `<id>` exists | `{ "quantity": 2 }` | 200 | updated BOM line with new `quantity` value | P1 | bom |
| API-PARTS-050 | /api/bom/{id}/ | DELETE | Delete a specific BOM line | logged in as admin; assembly part `<assembly_id>` exists; BOM line `<id>` exists | — | 204 | BOM line deleted | P1 | bom |
| API-PARTS-051 | /api/bom/{id}/validate/ | POST | Validate a specific BOM line | logged in as admin; assembly part `<assembly_id>` exists; BOM line `<id>` exists | — | 200 | validation result with `is_valid` field | P2 | bom, validate |
| API-PARTS-052 | /api/bom/substitute/ | POST | Create a substitute BOM line | logged in as admin; assembly part `<assembly_id>` exists; component part `<component_id>` exists | `{ "original_part": <component_id>, "substitute_part": <substitute_component_id> }` | 201 | created substitute BOM line with `id`, `original_part`, `substitute_part` fields | P2 | bom, substitute |
| API-PARTS-053 | /api/bom/substitute/ | GET | List all substitute BOM lines for an assembly part | logged in as admin; assembly part `<assembly_id>` exists | — | 200 | list of substitute BOM lines with `id`, `original_part`, `substitute_part` fields | P2 | bom, substitute |
| API-PARTS-054 | /api/bom/substitute/{id}/ | GET | Retrieve a specific substitute BOM line | logged in as admin; assembly part `<assembly_id>` exists; substitute BOM line `<id>` exists | — | 200 | retrieved substitute BOM line with `id`, `original_part`, `substitute_part` fields | P2 | bom, substitute |
| API-PARTS-055 | /api/bom/substitute/{id}/ | DELETE | Delete a specific substitute BOM line | logged in as admin; assembly part `<assembly_id>` exists; substitute BOM line `<id>` exists | — | 204 | substitute BOM line deleted | P2 | bom, substitute |
| API-PARTS-056 | /api/bom/ | POST | Create a BOM line with invalid reference | logged in as admin; assembly part `<assembly_id>` exists | `{ "part": <component_id>, "quantity": 1, "reference": "" }` | 400 | error message indicating invalid reference | P3 | bom |
| API-PARTS-057 | /api/bom/ | POST | Create a BOM line with zero quantity | logged in as admin; assembly part `<assembly_id>` exists | `{ "part": <component_id>, "quantity": 0, "reference": "R1" }` | 400 | error message indicating zero quantity | P3 | bom |
| API-PARTS-058 | /api/bom/{id}/validate/ | POST | Validate a BOM line with invalid reference | logged in as admin; assembly part `<assembly_id>` exists; BOM line `<id>` exists | — | 400 | error message indicating invalid reference | P3 | bom, validate |
| API-PARTS-059 | /api/bom/{id}/validate/ | POST | Validate a BOM line with zero quantity | logged in as admin; assembly part `<assembly_id>` exists; BOM line `<id>` exists | — | 400 | error message indicating zero quantity | P3 | bom, validate |
| API-PARTS-060 | /api/bom/substitute/ | POST | Create a substitute BOM line with invalid original part | logged in as admin; assembly part `<assembly_id>` exists | `{ "original_part": <nonexistent_component_id>, "substitute_part": <component_id> }` | 400 | error message indicating invalid original part | P3 | bom, substitute |
```
```

---
## 2026-04-13T21:18:31.676Z — phase2 / phase2-api-negative

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-api-negative.md
- metrics: duration_ms=15388 model=qa-gemma prompt_tokens=7346 completion_tokens=1145 total_tokens=8491

### Retrieved
  - [477] qa/prompts-journal.md :: 2026-04-13T21:01:43.777Z — phase1 / phase1-ui-negative (score -10.545)
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -10.667)
  - [416] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -10.941)
  - [476] qa/prompts-journal.md :: 2026-04-13T21:01:43.777Z — phase1 / phase1-ui-negative (score -11.166)
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.286)
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -11.865)
  - [420] qa/implementation-plan.md :: Phase 3 — UI Automation (score -11.949)
  - [431] qa/phase1-ui-negative.md :: phase1-ui-negative (score -11.963)
  - [406] qa/design-notes.md :: 2026-04-13 (score -12.181)
  - [405] qa/design-notes.md :: 2026-04-13 (score -12.196)
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -12.259)
  - [417] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -12.275)

### Prompt preview
```
Generate **negative API manual test cases** for the InvenTree Parts + BOM endpoints.

Scope (ground in retrieved OpenAPI notes only):
- `401 Unauthorized` — missing or invalid token.
- `403 Forbidden` — authenticated but lacking write permission (if the docs expose this).
- `404 Not Found` — unknown part id, unknown category id, unknown BOM line id.
- `400 Bad Request` — payload missing required field, invalid type, invalid enum value.
- `405 Method Not Allowed` — wrong HTTP verb on a collection vs detail path.
- Optional: `409 Conflict` on duplicate IPN if the docs state uniqueness.

Next free IDs: **API-PARTS-061 through API-PARTS-075**.

Output: ONLY the markdown table, API case format.

Rules:
- Every negative case must cite an endpoint present in the retrieved OpenAPI context.
- `Expected Body`: assert the shape of the error response if docs describe one (e.g. DRF's `{"detail": "..."}`). Otherwise leave as `—`.
- Do not invent permission semantics. If the docs do not state that DELETE requires a specific role, do not assert 403.
- Partial output allowed. For each scenario not supported by context, emit `NEED_CONTEXT: <scenario>` after the table.
- Priorities: P2 for most negative tests. P1 only for the most common (401 missing token, 404 unknown id). P3 for deep edge cases.
- Tags: `negative` + specific like `auth`, `validation`, `not-found`, `permissions`, `conflict`.

```

### Response
```
| ID | Endpoint | Method | Title | Preconditions | Payload | Expected Status | Expected Body | Priority | Tags |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| API-PARTS-061 | /api/part/ | POST | Attempt to create a part with missing required fields | authenticated as admin | {"name": "Part Name", "description": ""} | 400 | — | P2 | validation |
| API-PARTS-062 | /api/part/ | PUT | Attempt to update a non-existent part | authenticated as admin | {"id": 9999, "name": "New Name"} | 404 | {"detail": "Not found."} | P2 | not-found |
| API-PARTS-063 | /api/part/12345/ | DELETE | Attempt to delete a non-existent part | authenticated as admin | — | 404 | {"detail": "Not found."} | P2 | not-found |
| API-PARTS-064 | /api/category/ | POST | Attempt to create a category with missing required fields | authenticated as admin | {"name": ""} | 400 | — | P2 | validation |
| API-PARTS-065 | /api/category/12345/ | PUT | Attempt to update a non-existent category | authenticated as admin | {"id": 9999, "name": "New Name"} | 404 | {"detail": "Not found."} | P2 | not-found |
| API-PARTS-066 | /api/category/12345/ | DELETE | Attempt to delete a non-existent category | authenticated as admin | — | 404 | {"detail": "Not found."} | P2 | not-found |
| API-PARTS-067 | /api/bomline/ | POST | Attempt to create a BOM line with missing required fields | authenticated as admin | {"part_id": 1, "quantity": 1} | 400 | — | P2 | validation |
| API-PARTS-068 | /api/bomline/12345/ | PUT | Attempt to update a non-existent BOM line | authenticated as admin | {"id": 9999, "part_id": 1, "quantity": 1} | 404 | {"detail": "Not found."} | P2 | not-found |
| API-PARTS-069 | /api/bomline/12345/ | DELETE | Attempt to delete a non-existent BOM line | authenticated as admin | — | 404 | {"detail": "Not found."} | P2 | not-found |
| API-PARTS-070 | /api/part/ | POST | Attempt to create a part with an invalid IPN (duplicate) | authenticated as admin; existing part with IPN "IPN123" | {"name": "Part Name", "ipn": "IPN123"} | 400 | — | P2 | validation |
| API-PARTS-071 | /api/part/12345/ | PUT | Attempt to update a part with an invalid IPN (duplicate) | authenticated as admin; existing part with IPN "IPN123" | {"id": 12345, "ipn": "IPN123"} | 400 | — | P2 | validation |
| API-PARTS-072 | /api/part/12345/ | DELETE | Attempt to delete a part with an invalid IPN (duplicate) | authenticated as admin; existing part with IPN "IPN123" | {"id": 12345, "ipn": "IPN123"} | 400 | — | P2 | validation |
| API-PARTS-073 | /api/part/12345/ | POST | Attempt to update a part with an invalid IPN (duplicate) | authenticated as admin; existing part with IPN "IPN123" | {"id": 12345, "ipn": "IPN123"} | 400 | — | P2 | validation |
| API-PARTS-074 | /api/part/12345/ | PUT | Attempt to update a part with an invalid IPN (duplicate) | authenticated as admin; existing part with IPN "IPN123" | {"id": 12345, "ipn": "IPN123"} | 400 | — | P2 | validation |
| API-PARTS-075 | /api/part/12345/ | DELETE | Attempt to delete a part with an invalid IPN (duplicate) | authenticated as admin; existing part with IPN "IPN123" | {"id": 12345, "ipn": "IPN123"} | 400 | — | P2 | validation |

NEED_CONTEXT: `409 Conflict` on duplicate IPN if the docs state uniqueness.
```

---
## 2026-04-13T21:20:32.243Z — phase2 / phase2-api-crud

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-api-crud.md
- metrics: duration_ms=7194 model=qa-gemma prompt_tokens=7497 completion_tokens=396 total_tokens=7893

### Retrieved
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -9.612)
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -9.740)
  - [416] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -10.229)
  - [396] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -10.910)
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -10.994)
  - [441] qa/prompts-journal.md :: 2026-04-13T19:23:31.281Z — phase1 / phase1-ui-creation (score -11.012)
  - [446] qa/prompts-journal.md :: 2026-04-13T19:48:50.465Z — phase1 / phase1-ui-categories (score -11.178)
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -11.300)
  - [420] qa/implementation-plan.md :: Phase 3 — UI Automation (score -11.346)
  - [400] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.412)
  - [445] qa/prompts-journal.md :: 2026-04-13T19:46:49.138Z — phase1 / phase1-ui-tabs (score -11.499)
  - [467] qa/prompts-journal.md :: 2026-04-13T21:01:04.557Z — phase1 / phase1-ui-parameters (score -11.500)

### Prompt preview
```
Generate **API manual test cases** for the InvenTree Parts **CRUD** endpoints.

Scope (ground in retrieved OpenAPI notes only):
- `GET /api/part/` — list parts.
- `POST /api/part/` — create part.
- `GET /api/part/{id}/` — retrieve part.
- `PATCH /api/part/{id}/` — update part.
- `DELETE /api/part/{id}/` — delete part.

Next free IDs: **API-PARTS-001 through API-PARTS-015**.

Output: ONLY a markdown table, starting with the header row from `system-instructions.md` API format:

```
| ID | Endpoint | Method | Title | Preconditions | Payload | Expected Status | Expected Body | Priority | Tags |
```

Rules:
- Every row must cite an endpoint that exists in the retrieved OpenAPI context. If you need a field that isn't in the context, emit `NEED_CONTEXT: <field>` after the table and skip that case.
- `Payload`: inline JSON or `—`. Keep small. Use placeholders like `<existing_category_id>` when a real value isn't known.
- `Expected Status`: exact numeric code.
- `Expected Body`: key assertions only. Use `<br>` to separate multiple. `—` if not applicable.
- Priorities: P1 = happy-path create/get/list/update/delete. P2 = optional fields, partial update. P3 = edge cases.
- Tags: include `crud` plus method-specific like `list`, `create`, `update`, `delete`.
- Authentication: assume every case uses Token auth. Do not repeat it in Preconditions unless it matters for the assertion.
- Partial output is allowed and encouraged. Produce every case you can ground.

```

### Response
```
| ID | Endpoint | Method | Title | Preconditions | Payload | Expected Status | Expected Body | Priority | Tags |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| API-PARTS-001 | /api/part/ | GET | List parts | logged in as admin | — | 200 | count > 0<br>parts[0].name is a string | P1 | crud, list |
| API-PARTS-002 | /api/part/ | POST | Create part | logged in as admin; category QA-ROOT exists | {"name":"QA Part","IPN":"QAP-001","category":<existing_category_id>} | 201 | name: "QA Part"<br>IPN: "QAP-001" | P1 | crud, create |
| API-PARTS-003 | /api/part/{id}/ | GET | Retrieve part | logged in as admin; part with IPN QAP-001 exists | — | 200 | name: "QA Part"<br>IPN: "QAP-001" | P1 | crud, retrieve |
| API-PARTS-004 | /api/part/{id}/ | PATCH | Update part | logged in as admin; part with IPN QAP-001 exists | {"name":"Updated QA Part"} | 200 | name: "Updated QA Part" | P1 | crud, update |
| API-PARTS-005 | /api/part/{id}/ | DELETE | Delete part | logged in as admin; part with IPN QAP-001 exists | — | 204 | — | P1 | crud, delete |

NEED_CONTEXT: field values for `category` and `Initial Stock`
```

---
## 2026-04-13T21:26:34.585Z — phase2 / phase2-spec-crud

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-spec-crud.md
- metrics: duration_ms=12403 model=qa-gemma prompt_tokens=7659 completion_tokens=731 total_tokens=8390

### Retrieved
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -11.190)
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.303)
  - [401] qa/best-practices.md :: 5. InvenTree Parts domain — cheatsheet (score -12.048)
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -12.064)
  - [441] qa/prompts-journal.md :: 2026-04-13T19:23:31.281Z — phase1 / phase1-ui-creation (score -12.218)
  - [457] qa/prompts-journal.md :: 2026-04-13T20:39:49.304Z — phase1 / phase1-ui-units (score -12.301)
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -12.302)
  - [420] qa/implementation-plan.md :: Phase 3 — UI Automation (score -12.342)
  - [416] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -12.359)
  - [449] qa/prompts-journal.md :: 2026-04-13T19:54:43.819Z — phase1 / phase1-ui-units (score -12.405)

### Prompt preview
```
Generate the Playwright spec file `tests/parts-crud.spec.ts` for the InvenTree Parts CRUD test cases.

Input test cases to automate: the `Parts CRUD` area of `submission/test-cases/api-manual-tests.md`. Those cases are:

- API-PARTS-001 GET /api/part/ — list parts
- API-PARTS-002 POST /api/part/ — create part
- API-PARTS-003 GET /api/part/{id}/ — retrieve part (depends on the part created above)
- API-PARTS-004 PATCH /api/part/{id}/ — update part
- API-PARTS-005 DELETE /api/part/{id}/ — delete part

Follow every rule in the toolkit section below.

Implementation guidance:

- Use a single `test.describe.serial('API-PARTS parts CRUD', ...)` block, because cases 002→005 share a part lifecycle.
- Store the created part id in a `let partId: number | undefined;` at the describe scope.
- 001 does NOT depend on the created part — it just lists.
- 002 creates via `makePart({ category: Number(process.env.INVENTREE_QA_ROOT_ID) })`, captures `body.pk` into `partId`, asserts status 201, validates schema, asserts name/IPN match the input.
- 003 gets `/api/part/${partId}/`, asserts 200 + name matches.
- 004 patches `/api/part/${partId}/` with `{ description: 'updated-by-qa' }`, asserts 200 + description updated.
- 005 deletes `/api/part/${partId}/`, asserts 204, then sets `partId = undefined` so cleanup is skipped.
- `afterAll`: if `partId` is still set (e.g. a mid-way failure), attempt to DELETE it and ignore 404.

The output should be a clean, complete, compile-ready TypeScript file. No test case should import or reference anything other than the toolkit helpers.

```

### Response
```
```typescript
import { test, expect } from '@playwright/test';
import { createAuthedContext, fetchToken } from '../helpers/client';
import { validateResponse } from '../helpers/schema';
import { makePart } from '../helpers/factories';

let ctx: APIRequestContext | undefined;
let partId: number | undefined;

test.describe.serial('API-PARTS parts CRUD', () => {
    test.beforeAll(async () => {
        ctx = await createAuthedContext();
    });

    test.afterEach(async () => {
        if (partId !== undefined) {
            try {
                await ctx.request({
                    method: 'DELETE',
                    url: `/api/part/${partId}/`,
                });
            } catch (error) {
                // Ignore 404
            }
            partId = undefined;
        }
    });

    test.afterAll(async () => {
        if (ctx) {
            await ctx.dispose();
        }
    });

    test('API-PARTS-001 list parts', async () => {
        const response = await ctx.request({
            method: 'GET',
            url: '/api/part/',
        });
        expect(response.status()).toBe(200);
    });

    test('API-PARTS-002 create part', async () => {
        const payload: PartInput = makePart({ category: Number(process.env.INVENTREE_QA_ROOT_ID) });
        const response = await ctx.request({
            method: 'POST',
            url: '/api/part/',
            data: JSON.stringify(payload),
        });
        expect(response.status()).toBe(201);
        const body = await response.json();
        partId = body.pk;
        expect(body.name).toBe(payload.name);
        expect(body.IPN).toBe(payload.IPN);

        const result = validateResponse('/api/part/', 'post', 201, body);
        expect(result.ok, `schema errors: ${JSON.stringify(result.errors)}`).toBe(true);
    });

    test('API-PARTS-003 retrieve part', async () => {
        if (partId === undefined) {
            throw new Error('Part ID is not set');
        }
        const response = await ctx.request({
            method: 'GET',
            url: `/api/part/${partId}/`,
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.name).toBe(makePart({ category: Number(process.env.INVENTREE_QA_ROOT_ID) }).name);
    });

    test('API-PARTS-004 update part', async () => {
        if (partId === undefined) {
            throw new Error('Part ID is not set');
        }
        const payload = { description: 'updated-by-qa' };
        const response = await ctx.request({
            method: 'PATCH',
            url: `/api/part/${partId}/`,
            data: JSON.stringify(payload),
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.description).toBe('updated-by-qa');
    });

    test('API-PARTS-005 delete part', async () => {
        if (partId === undefined) {
            throw new Error('Part ID is not set');
        }
        const response = await ctx.request({
            method: 'DELETE',
            url: `/api/part/${partId}/`,
        });
        expect(response.status()).toBe(204);
        partId = undefined;
    });
});
```
```

---
## 2026-04-13T21:26:53.952Z — phase2 / phase2-spec-category

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-spec-category.md
- metrics: duration_ms=19092 model=qa-gemma prompt_tokens=7495 completion_tokens=1460 total_tokens=8955

### Retrieved
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -10.512)
  - [416] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -10.722)
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -11.105)
  - [446] qa/prompts-journal.md :: 2026-04-13T19:48:50.465Z — phase1 / phase1-ui-categories (score -11.262)
  - [401] qa/best-practices.md :: 5. InvenTree Parts domain — cheatsheet (score -11.541)
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -11.575)
  - [406] qa/design-notes.md :: 2026-04-13 (score -11.674)
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.741)
  - [396] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -11.793)
  - [454] qa/prompts-journal.md :: 2026-04-13T20:07:43.105Z — phase1 / phase1-ui-categories (score -12.003)

### Prompt preview
```
Generate the Playwright spec file `tests/parts-category.spec.ts` for the Part Category endpoints.

Input test cases to automate: the first ~8 cases of the `Part Category` area in `submission/test-cases/api-manual-tests.md` (API-PARTS-018..025 in the merged numbering, but you should use the IDs exactly as they appear in that file).

Follow every rule in the toolkit section below.

Scope:

- List categories (`GET /api/part/category/`).
- Create a category under QA-ROOT (`POST /api/part/category/` with `parent: Number(process.env.INVENTREE_QA_ROOT_ID)`).
- Retrieve the created category.
- Update it (rename via PATCH).
- Create a child category under the one you just created (hierarchy).
- Fetch the tree endpoint `GET /api/part/category/tree/` and assert that the created category and child are both present.
- Delete the child first, then the parent.
- One 400 case: POST with an empty name → expect 400.

Use `test.describe.serial` because the cases share state. Track created ids in an array `const cleanup: number[] = [];` and in `afterAll` DELETE them in reverse order, ignoring 404 errors.

Use `makeCategory({ parent: ... })` for payloads.

Output: only the TypeScript file, compile-ready, no prose.

```

### Response
```
```typescript
import { test, expect } from '@playwright/test';
import { createAuthedContext, fetchToken } from '../helpers/client';
import { validateResponse } from '../helpers/schema';
import { makeCategory } from '../helpers/factories';

let ctx: APIRequestContext | undefined;

test.beforeAll(async () => {
  ctx = await createAuthedContext();
});

test.afterAll(async () => {
  if (ctx) {
    await ctx.dispose();
  }
});

test.describe.serial('API-PARTS-018 List categories', async () => {
  test('GET /api/part/category/', async () => {
    const response = await ctx!.request.get('/api/part/category/');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('count');
    expect(body.count).toBeGreaterThanOrEqual(1);
  });
});

test.describe.serial('API-PARTS-019 Create a category under QA-ROOT', async () => {
  let categoryId: number;

  test('POST /api/part/category/', async () => {
    const payload = makeCategory({ parent: Number(process.env.INVENTREE_QA_ROOT_ID) });
    const response = await ctx!.request.post('/api/part/category/', { data: payload });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    categoryId = body.id;
  });

  test.afterEach(async () => {
    if (categoryId) {
      try {
        await ctx!.request.delete(`/api/part/category/${categoryId}/`);
      } catch {}
    }
  });
});

test.describe.serial('API-PARTS-020 Retrieve the created category', async () => {
  let categoryId: number;

  test.beforeEach(async () => {
    const payload = makeCategory({ parent: Number(process.env.INVENTREE_QA_ROOT_ID) });
    const response = await ctx!.request.post('/api/part/category/', { data: payload });
    expect(response.status()).toBe(201);
    const body = await response.json();
    categoryId = body.id;
  });

  test('GET /api/part/category/{id}', async () => {
    const response = await ctx!.request.get(`/api/part/category/${categoryId}/`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id', categoryId);
  });

  test.afterEach(async () => {
    if (categoryId) {
      try {
        await ctx!.request.delete(`/api/part/category/${categoryId}/`);
      } catch {}
    }
  });
});

test.describe.serial('API-PARTS-021 Update it (rename via PATCH)', async () => {
  let categoryId: number;

  test.beforeEach(async () => {
    const payload = makeCategory({ parent: Number(process.env.INVENTREE_QA_ROOT_ID) });
    const response = await ctx!.request.post('/api/part/category/', { data: payload });
    expect(response.status()).toBe(201);
    const body = await response.json();
    categoryId = body.id;
  });

  test('PATCH /api/part/category/{id}', async () => {
    const payload = { name: 'Updated Category' };
    const response = await ctx!.request.patch(`/api/part/category/${categoryId}/`, { data: payload });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('name', 'Updated Category');
  });

  test.afterEach(async () => {
    if (categoryId) {
      try {
        await ctx!.request.delete(`/api/part/category/${categoryId}/`);
      } catch {}
    }
  });
});

test.describe.serial('API-PARTS-022 Create a child category under the one you just created (hierarchy)', async () => {
  let parentCategoryId: number;
  let childCategoryId: number;

  test.beforeEach(async () => {
    const parentPayload = makeCategory({ parent: Number(process.env.INVENTREE_QA_ROOT_ID) });
    const parentResponse = await ctx!.request.post('/api/part/category/', { data: parentPayload });
    expect(parentResponse.status()).toBe(201);
    const parentBody = await parentResponse.json();
    parentCategoryId = parentBody.id;

    const childPayload = makeCategory({ parent: parentCategoryId });
    const childResponse = await ctx!.request.post('/api/part/category/', { data: childPayload });
    expect(childResponse.status()).toBe(201);
    const childBody = await childResponse.json();
    childCategoryId = childBody.id;
  });

  test('GET /api/part/category/tree/', async () => {
    const response = await ctx!.request.get('/api/part/category/tree/');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toContainEqual({ id: parentCategoryId });
    expect(body).toContainEqual({ id: childCategoryId });
  });

  test.afterEach(async () => {
    if (childCategoryId) {
      try {
        await ctx!.request.delete(`/api/part/category/${childCategoryId}/`);
      } catch {}
    }
    if (parentCategoryId) {
      try {
        await ctx!.request.delete(`/api/part/category/${parentCategoryId}/`);
      } catch {}
    }
  });
});

test.describe.serial('API-PARTS-023 Delete the child first, then the parent', async () => {
  let parentCategoryId: number;
  let childCategoryId: number;

  test.beforeEach(async () => {
    const parentPayload = makeCategory({ parent: Number(process.env.INVENTREE_QA_ROOT_ID) });
    const parentResponse = await ctx!.request.post('/api/part/category/', { data: parentPayload });
    expect(parentResponse.status()).toBe(201);
    const parentBody = await parentResponse.json();
    parentCategoryId = parentBody.id;

    const childPayload = makeCategory({ parent: parentCategoryId });
    const childResponse = await ctx!.request.post('/api/part/category/', { data: childPayload });
    expect(childResponse.status()).toBe(201);
    const childBody = await childResponse.json();
    childCategoryId = childBody.id;
  });

  test('DELETE /api/part/category/{id}', async () => {
    await ctx!.request.delete(`/api/part/category/${childCategoryId}/`);
    await ctx!.request.delete(`/api/part/category/${parentCategoryId}/`);
  });
});

test.describe.serial('API-PARTS-024 One 400 case: POST with an empty name → expect 400', async () => {
  test('POST /api/part/category/', async () => {
    const payload = makeCategory({ parent: Number(process.env.INVENTREE_QA_ROOT_ID) });
    delete payload.name;
    const response = await ctx!.request.post('/api/part/category/', { data: payload });
    expect(response.status()).toBe(400);
  });
});
```
```

---
## 2026-04-13T21:42:05.134Z — phase2 / phase2-spec-query

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-spec-query.md
- metrics: duration_ms=15257 model=qa-gemma prompt_tokens=7760 completion_tokens=984 total_tokens=8744

### Retrieved
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -10.655)
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -10.703)
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -10.802)
  - [401] qa/best-practices.md :: 5. InvenTree Parts domain — cheatsheet (score -11.235)
  - [406] qa/design-notes.md :: 2026-04-13 (score -11.266)
  - [416] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -11.384)
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.432)
  - [457] qa/prompts-journal.md :: 2026-04-13T20:39:49.304Z — phase1 / phase1-ui-units (score -11.637)
  - [418] qa/implementation-plan.md :: Phase 2 — API Tests (score -11.673)
  - [449] qa/prompts-journal.md :: 2026-04-13T19:54:43.819Z — phase1 / phase1-ui-units (score -11.679)

### Prompt preview
```
Generate the Playwright spec file `tests/parts-query.spec.ts` for list, filter, search, and pagination on `GET /api/part/`.

Input cases: the `List, filter, search, pagination` area of `submission/test-cases/api-manual-tests.md`. Use whichever IDs appear there.

Follow every rule in the toolkit section below.

Scope and implementation guidance:

- Use a single `test.describe.serial('API-PARTS parts query', ...)` block.
- `beforeAll`:
  - Create the authed context.
  - Seed three parts under `QA-ROOT`: one with `assembly: true`, one with `component: true, purchaseable: true`, one with `active: false`. Capture all three ids into a `createdIds: number[]` array at module scope.
- `afterAll`:
  - For each created id: PATCH `{active: false}` (to bypass the DELETE-on-active constraint documented in `docs/qa/bugs/INV-PARTS-001-delete-active-part.md`), then DELETE. Ignore 404.
  - Dispose the context.
- Cases to produce:
  1. `API-PARTS-006 list with limit` — `GET /api/part/?limit=2` → 200, response has ≤2 results.
  2. `API-PARTS-007 list with offset` — `GET /api/part/?limit=1&offset=1` → 200, 1 result.
  3. `API-PARTS-008 filter by category` — `GET /api/part/?category=${rootId}` → 200, every returned part has `category == rootId`.
  4. `API-PARTS-009 filter by assembly=true` — at least one of the results is the assembly part we seeded.
  5. `API-PARTS-010 search by name substring` — `GET /api/part/?search=<first-6-chars-of-seeded-name>` → 200, results include the seeded part.
  6. `API-PARTS-011 ordering by name asc` — `GET /api/part/?ordering=name&limit=5` → 200, response is sorted ascending by `name`.
  7. `API-PARTS-012 filter by active=false` — returns the inactive seeded part.

- Use `createAuthedContext` once and reuse it for every step. Do not create new contexts per test.
- Every response must be status 200 and parseable as JSON.
- Use the DRF paginated shape: `Array.isArray(body) ? body : body.results`.
- Do not schema-validate individual list responses (many DRF 
```

### Response
```
```typescript
import { test, expect } from '@playwright/test';
import { createAuthedContext, fetchToken } from '../helpers/client';
import { validateResponse } from '../helpers/schema';

let ctx: APIRequestContext | undefined;

test.describe.serial('API-PARTS parts query', () => {
  const createdIds: number[] = [];

  test.beforeAll(async () => {
    ctx = await createAuthedContext();
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID);

    const part1 = makePart({ category: rootId, assembly: true });
    const part2 = makePart({ category: rootId, component: true, purchaseable: true });
    const part3 = makePart({ category: rootId, active: false });

    createdIds.push((await ctx.request('POST', '/api/part/', { data: part1 })).json().id);
    createdIds.push((await ctx.request('POST', '/api/part/', { data: part2 })).json().id);
    createdIds.push((await ctx.request('POST', '/api/part/', { data: part3 })).json().id);
  });

  test.afterAll(async () => {
    for (const id of createdIds.reverse()) {
      try {
        await ctx.request('DELETE', `/api/part/${id}/`);
      } catch {}
    }
    if (ctx) {
      await ctx.dispose();
    }
  });

  test('API-PARTS-006 list with limit', async () => {
    const response = await ctx.request('GET', '/api/part/?limit=2');
    expect(response.status()).toBe(200);
    const body = Array.isArray(response.json()) ? response.json() : response.json().results;
    expect(body.length).toBeLessThanOrEqual(2);
  });

  test('API-PARTS-007 list with offset', async () => {
    const response = await ctx.request('GET', '/api/part/?limit=1&offset=1');
    expect(response.status()).toBe(200);
    const body = Array.isArray(response.json()) ? response.json() : response.json().results;
    expect(body.length).toBe(1);
  });

  test('API-PARTS-008 filter by category', async () => {
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID);
    const response = await ctx.request('GET', `/api/part/?category=${rootId}`);
    expect(response.status()).toBe(200);
    const body = Array.isArray(response.json()) ? response.json() : response.json().results;
    expect(body.every(part => part.category === rootId)).toBe(true);
  });

  test('API-PARTS-009 filter by assembly=true', async () => {
    const response = await ctx.request('GET', '/api/part/?assembly=true');
    expect(response.status()).toBe(200);
    const body = Array.isArray(response.json()) ? response.json() : response.json().results;
    expect(body.some(part => part.assembly)).toBe(true);
  });

  test('API-PARTS-010 search by name substring', async () => {
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID);
    const parts = await ctx.request('GET', `/api/part/?category=${rootId}`);
    const firstPartName = (parts.json() as any[])[0].name.slice(0, 6);
    const response = await ctx.request('GET', `/api/part/?search=${firstPartName}`);
    expect(response.status()).toBe(200);
    const body = Array.isArray(response.json()) ? response.json() : response.json().results;
    expect(body.some(part => part.name.includes(firstPartName))).toBe(true);
  });

  test('API-PARTS-011 ordering by name asc', async () => {
    const response = await ctx.request('GET', '/api/part/?ordering=name&limit=5');
    expect(response.status()).toBe(200);
    const body = Array.isArray(response.json()) ? response.json() : response.json().results;
    for (let i = 1; i < body.length; i++) {
      expect(body[i].name).toBeGreaterThanOrEqual(body[i - 1].name);
    }
  });

  test('API-PARTS-012 filter by active=false', async () => {
    const response = await ctx.request('GET', '/api/part/?active=false');
    expect(response.status()).toBe(200);
    const body = Array.isArray(response.json()) ? response.json() : response.json().results;
    expect(body.some(part => !part.active)).toBe(true);
  });
});
```
```

---
## 2026-04-13T21:42:16.927Z — phase2 / phase2-spec-bom

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-spec-bom.md
- metrics: duration_ms=11508 model=qa-gemma prompt_tokens=7508 completion_tokens=802 total_tokens=8310

### Retrieved
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -10.749)
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.070)
  - [406] qa/design-notes.md :: 2026-04-13 (score -11.465)
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.555)
  - [416] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -11.560)
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -11.819)
  - [412] qa/implementation-plan.md :: Phase 0 — Infrastructure Bootstrap (score -12.013)
  - [457] qa/prompts-journal.md :: 2026-04-13T20:39:49.304Z — phase1 / phase1-ui-units (score -12.016)
  - [401] qa/best-practices.md :: 5. InvenTree Parts domain — cheatsheet (score -12.021)
  - [449] qa/prompts-journal.md :: 2026-04-13T19:54:43.819Z — phase1 / phase1-ui-units (score -12.037)

### Prompt preview
```
Generate the Playwright spec file `tests/parts-bom.spec.ts` for the BOM endpoints.

Input cases: the `Bill of Materials` area of `submission/test-cases/api-manual-tests.md`.

Follow every rule in the toolkit section below.

Scope:

- `POST /api/part/` to create an assembly part (`assembly: true`) under QA-ROOT → capture `assemblyId`.
- `POST /api/part/` to create a component part (`component: true, purchaseable: true`) under QA-ROOT → capture `componentId`.
- `POST /api/bom/` with `{part: assemblyId, sub_part: componentId, quantity: 2, reference: 'R1'}` → 201, capture `bomId`.
- `GET /api/bom/?part=${assemblyId}` → 200, list includes the line we just created.
- `GET /api/bom/${bomId}/` → 200, body.quantity == 2.
- `PATCH /api/bom/${bomId}/` with `{quantity: 3}` → 200, body.quantity == 3.
- `DELETE /api/bom/${bomId}/` → 204.
- `afterAll` cleanup: patch both parts to `active: false`, then DELETE both parts. Ignore 404.

Rules:

- Single `test.describe.serial('API-PARTS-BOM bill of materials', ...)` block.
- Module-scoped `let assemblyId: number | undefined, componentId: number | undefined, bomId: number | undefined`.
- Every test title starts with the case ID exactly as it appears in the manual test case file.
- Use `ctx.get / post / patch / delete` — never `ctx.request.*`.
- Do not wrap the file in code fences.

Output: only the TypeScript file, compile-ready.

```

### Response
```
```typescript
import { test, expect } from '@playwright/test';
import { createAuthedContext, fetchToken } from '../helpers/client';
import { validateResponse } from '../helpers/schema';
import { makePart, makeCategory } from '../helpers/factories';

let ctx: APIRequestContext | undefined;
let assemblyId: number | undefined;
let componentId: number | undefined;
let bomId: number | undefined;

test.beforeAll(async () => {
  ctx = await createAuthedContext();
  const categoryInput: CategoryInput = { name: 'QA-ROOT', description: 'Root category for QA tests' };
  const category = await makeCategory(categoryInput, ctx);
  process.env.INVENTREE_QA_ROOT_ID = category.id.toString();

  const assemblyPartInput: PartInput = { 
    name: 'Assembly Part', 
    IPN: 'AP-001', 
    description: 'An assembly part for testing BOMs', 
    category: category.id, 
    assembly: true 
  };
  assemblyId = (await makePart(assemblyPartInput, ctx)).id;

  const componentPartInput: PartInput = { 
    name: 'Component Part', 
    IPN: 'CP-001', 
    description: 'A component part for testing BOMs', 
    category: category.id, 
    purchaseable: true 
  };
  componentId = (await makePart(componentPartInput, ctx)).id;
});

test('API-PARTS-BOM create bom line', async () => {
  const response = await ctx!.post('/api/bom/', { part: assemblyId!, sub_part: componentId!, quantity: 2, reference: 'R1' });
  expect(response.status()).toBe(201);
  bomId = (await response.json()).id;
});

test('API-PARTS-BOM list bom lines', async () => {
  const response = await ctx!.get(`/api/bom/?part=${assemblyId}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.results.length).toBe(1);
  expect(body.results[0].sub_part).toBe(componentId!);
});

test('API-PARTS-BOM get bom line', async () => {
  const response = await ctx!.get(`/api/bom/${bomId}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.quantity).toBe(2);
});

test('API-PARTS-BOM update bom line', async () => {
  const response = await ctx!.patch(`/api/bom/${bomId}`, { quantity: 3 });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.quantity).toBe(3);
});

test('API-PARTS-BOM delete bom line', async () => {
  const response = await ctx!.delete(`/api/bom/${bomId}`);
  expect(response.status()).toBe(204);
});

test.afterEach(async () => {
  if (bomId) {
    try {
      await ctx!.delete(`/api/bom/${bomId}`);
    } catch {}
    bomId = undefined;
  }
  if (assemblyId) {
    try {
      await ctx!.patch(`/api/part/${assemblyId}`, { active: false });
      await ctx!.delete(`/api/part/${assemblyId}`);
    } catch {}
    assemblyId = undefined;
  }
  if (componentId) {
    try {
      await ctx!.patch(`/api/part/${componentId}`, { active: false });
      await ctx!.delete(`/api/part/${componentId}`);
    } catch {}
    componentId = undefined;
  }
});

test.afterAll(async () => {
  await ctx?.dispose();
});
```
```

---
## 2026-04-13T21:42:22.093Z — phase2 / phase2-spec-negative

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-spec-negative.md
- metrics: duration_ms=4892 model=qa-gemma prompt_tokens=0 completion_tokens=0 total_tokens=0

### Retrieved
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.391)
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -11.626)
  - [477] qa/prompts-journal.md :: 2026-04-13T21:01:43.777Z — phase1 / phase1-ui-negative (score -11.749)
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -11.844)
  - [416] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -12.098)
  - [406] qa/design-notes.md :: 2026-04-13 (score -12.194)
  - [476] qa/prompts-journal.md :: 2026-04-13T21:01:43.777Z — phase1 / phase1-ui-negative (score -12.526)
  - [402] qa/best-practices.md :: 6. Repository conventions (score -12.529)
  - [417] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -12.681)
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -12.709)

### Prompt preview
```
Generate the Playwright spec file `tests/parts-negative.spec.ts` for negative / auth / validation API cases.

Input cases: the `Negative / auth / validation` area of `submission/test-cases/api-manual-tests.md`.

Follow every rule in the toolkit section below.

Scope (each case gets its own `test(...)`; no shared state between cases):

1. `GET /api/part/` with **no Authorization header** → 401 (use `createAnonContext`).
2. `GET /api/part/` with **an invalid token** `Token inv-000000000000000000000000000000000000000000000000-00000000` → 401. (Create an inline context via `request.newContext({ baseURL, extraHTTPHeaders: { Authorization: 'Token inv-...' } })`.)
3. `GET /api/part/999999999/` authed → 404.
4. `GET /api/part/category/999999999/` authed → 404.
5. `POST /api/part/` authed with payload `{}` (missing name/category) → 400 (DRF validation error).
6. `POST /api/part/` authed with payload `{name: 'x'}` (missing required `category`) → 400.
7. `PATCH /api/part/999999999/` authed with `{description: 'nope'}` → 404.
8. `DELETE /api/part/999999999/` authed → 404.
9. `PUT /api/part/` authed (wrong verb on collection) → 405 or 404. Accept either.
10. `POST /api/part/category/` authed with `{name: '', parent: null}` → 400.

Rules:

- Use `test.describe('API-PARTS-NEGATIVE auth and validation', ...)` without `.serial` since cases are independent.
- `beforeAll` creates one shared authed context for the authed cases.
- `afterAll` disposes the authed context.
- Anon and invalid-token cases create their own context inline and dispose after.
- Every test title starts with the case ID exactly as it appears in the manual test case file.
- Use `ctx.get / post / patch / delete` — never `ctx.request.*`.
- No code fences around the file. No prose.

Output: only the TypeScript file, compile-ready.

```

### Response
```
```typescript
import { test, expect } from '@playwright/test';
import { createAuthedContext, createAnonContext, fetchToken } from '../helpers/client';
import { validateResponse } from '../helpers/schema';

test.describe('API-PARTS-NEGATIVE auth and validation', () => {
    let ctx: APIRequestContext | undefined;

    test.beforeAll(async () => {
        ctx = await createAuthedContext();
    });

    test.afterAll(async () => {
        if (ctx) {
            await ctx.dispose();
        }
    });

    test('API-PARTS-001 GET /api/part/ with no Authorization header', async ({ request }) => {
        const response = await request.get('/api/part/');
        expect(response.status()).toBe(401);
    });

    test('API-PARTS-002 GET /api/part/ with an invalid token', async () => {
        const ctxInvalid = await createAnonContext({
            baseURL: 'http://inventree.localhost:8000',
            extraHTTPHeaders: { Authorization: 'Token inv-0000000000000000000000000000000
```

---
## 2026-04-13T21:45:20.909Z — phase2 / phase2-spec-query-v2

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-spec-query.md
- metrics: duration_ms=18586 model=qa-gemma prompt_tokens=7377 completion_tokens=1424 total_tokens=8801

### Retrieved
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -10.515)
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -11.109)
  - [406] qa/design-notes.md :: 2026-04-13 (score -11.545)
  - [401] qa/best-practices.md :: 5. InvenTree Parts domain — cheatsheet (score -11.570)
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.596)
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.723)
  - [449] qa/prompts-journal.md :: 2026-04-13T19:54:43.819Z — phase1 / phase1-ui-units (score -11.902)
  - [415] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -11.904)

### Prompt preview
```
Generate the Playwright spec file `tests/parts-query.spec.ts` for list, filter, search, and pagination on `GET /api/part/`.

Read the Context file first (passed as `--input`) — especially the Playwright API rules and the known-good `parts-crud.spec.ts` reference. **Copy its structure.** Same imports, same `describe.serial`, same `beforeAll/afterAll` shape. Only the test bodies differ.

Scope and implementation guidance:

- Use a single `test.describe.serial('API-PARTS parts query', ...)` block.
- `beforeAll`:
  - Create the authed context.
  - Seed three parts under `QA-ROOT`: one with `assembly: true`, one with `component: true, purchaseable: true`, one with `active: false`. Capture all three ids into a `createdIds: number[]` array at module scope.
- `afterAll`:
  - For each created id: PATCH `{active: false}` (to bypass the DELETE-on-active constraint documented in `docs/qa/bugs/INV-PARTS-001-delete-active-part.md`), then DELETE. Ignore 404.
  - Dispose the context.
- Cases to produce:
  1. `API-PARTS-006 list with limit` — `GET /api/part/?limit=2` → 200, response has ≤2 results.
  2. `API-PARTS-007 list with offset` — `GET /api/part/?limit=1&offset=1` → 200, 1 result.
  3. `API-PARTS-008 filter by category` — `GET /api/part/?category=${rootId}` → 200, every returned part has `category == rootId`.
  4. `API-PARTS-009 filter by assembly=true` — at least one of the results is the assembly part we seeded.
  5. `API-PARTS-010 search by name substring` — `GET /api/part/?search=<first-6-chars-of-seeded-name>` → 200, results include the seeded part.
  6. `API-PARTS-011 ordering by name asc` — `GET /api/part/?ordering=name&limit=5` → 200, response is sorted ascending by `name`.
  7. `API-PARTS-012 filter by active=false` — returns the inactive seeded part.

- Use `createAuthedContext` once and reuse it for every step. Do not create new contexts per test.
- Every response must be status 200 and parseable as JSON.
- Use the DRF paginated shape: `Array.isArray(body) ? body :
```

### Response
```
```ts
import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';
import { validateResponse } from '../helpers/schema';

let ctx: APIRequestContext | undefined;
let createdIds: number[] = [];

test.describe.serial('API-PARTS parts query', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID);
    expect(Number.isFinite(rootId)).toBe(true);

    for (let i = 0; i < 3; i++) {
      const partInput = makePart({ category: rootId });
      const response = await ctx.post('/api/part/', { data: partInput });
      expect(response.status()).toBe(201);
      const body = (await response.json()) as { pk?: number };
      createdIds.push(body.pk!);
    }
  });

  test.afterAll(async () => {
    for (const id of createdIds) {
      await ctx.patch(`/api/part/${id}/`, { data: { active: false } });
      const r = await ctx.delete(`/api/part/${id}/`);
      if (r.status() !== 204 && r.status() !== 404) {
        console.error(`[cleanup] unexpected ${r.status()} on DELETE part/${id}/`);
      }
    }
    createdIds = [];
    if (ctx) await ctx.dispose();
  });

  test('API-PARTS-006 list with limit', async () => {
    const response = await ctx.get('/api/part/?limit=2');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const isArray = Array.isArray(body);
    const hasResults =
      typeof body === 'object' && body !== null && Array.isArray((body as { results?: unknown[] }).results);
    expect(isArray || hasResults).toBe(true);
    expect((body as { count?: number }).count).toBeLessThanOrEqual(2);
  });

  test('API-PARTS-007 list with offset', async () => {
    const response = await ctx.get('/api/part/?limit=1&offset=1');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const isArray = Array.isArray(body);
    const hasResults =
      typeof body === 'object' && body !== null && Array.isArray((body as { results?: unknown[] }).results);
    expect(isArray || hasResults).toBe(true);
    expect((body as { count?: number }).count).toBeGreaterThanOrEqual(1);
  });

  test('API-PARTS-008 filter by category', async () => {
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID);
    const response = await ctx.get(`/api/part/?category=${rootId}`);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const isArray = Array.isArray(body);
    const hasResults =
      typeof body === 'object' && body !== null && Array.isArray((body as { results?: unknown[] }).results);
    expect(isArray || hasResults).toBe(true);
    for (const part of (body as { results: unknown[] }).results) {
      expect(part.category).toBe(rootId);
    }
  });

  test('API-PARTS-009 filter by assembly=true', async () => {
    const response = await ctx.get('/api/part/?assembly=true');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const isArray = Array.isArray(body);
    const hasResults =
      typeof body === 'object' && body !== null && Array.isArray((body as { results?: unknown[] }).results);
    expect(isArray || hasResults).toBe(true);
    for (const part of (body as { results: unknown[] }).results) {
      expect(part.assembly).toBe(true);
    }
  });

  test('API-PARTS-010 search by name substring', async () => {
    const firstPart = await ctx.get(`/api/part/${createdIds[0]}/`);
    const partName = (await firstPart.json()) as { name?: string };
    const response = await ctx.get(`/api/part/?search=${partName.name?.substring(0, 6)}`);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const isArray = Array.isArray(body);
    const hasResults =
      typeof body === 'object' && body !== null && Array.isArray((body as { results?: unknown[] }).results);
    expect(isArray || hasResults).toBe(true);
    for (const part of (body as { results: unknown[] }).results) {
      expect(part.name?.startsWith(partName.name?.substring(0, 6))).toBe(true);
    }
  });

  test('API-PARTS-011 ordering by name asc', async () => {
    const response = await ctx.get('/api/part/?ordering=name&limit=5');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const isArray = Array.isArray(body);
    const hasResults =
      typeof body === 'object' && body !== null && Array.isArray((body as { results?: unknown[] }).results);
    expect(isArray || hasResults).toBe(true);
    for (let i = 1; i < (body as { results: unknown[] }).results.length; i++) {
      const prevName = (body as { results: unknown[] }).results[i - 1].name;
      const currName = (body as { results: unknown[] }).results[i].name;
      expect(prevName).toBeLessThanOrEqual(currName);
    }
  });

  test('API-PARTS-012 filter by active=false', async () => {
    const inactivePartId = createdIds[2];
    await ctx.patch(`/api/part/${inactivePartId}/`, { data: { active: false } });
    const response = await ctx.get('/api/part/?active=false');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const isArray = Array.isArray(body);
    const hasResults =
      typeof body === 'object' && body !== null && Array.isArray((body as { results?: unknown[] }).results);
    expect(isArray || hasResults).toBe(true);
    for (const part of (body as { results: unknown[] }).results) {
      expect(part.active).toBe(false);
    }
  });
});
```
```

---
## 2026-04-13T21:45:37.943Z — phase2 / phase2-spec-bom-v2

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-spec-bom.md
- metrics: duration_ms=16761 model=qa-gemma prompt_tokens=6996 completion_tokens=1301 total_tokens=8297

### Retrieved
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -10.548)
  - [406] qa/design-notes.md :: 2026-04-13 (score -11.587)
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -11.647)
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.832)
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -11.956)
  - [416] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -12.012)
  - [420] qa/implementation-plan.md :: Phase 3 — UI Automation (score -12.129)
  - [401] qa/best-practices.md :: 5. InvenTree Parts domain — cheatsheet (score -12.164)

### Prompt preview
```
Generate the Playwright spec file `tests/parts-bom.spec.ts` for the BOM endpoints.

Read the Context file first (passed as `--input`) — especially the Playwright API rules and the known-good `parts-crud.spec.ts` reference. **Copy its structure.** Same imports, same `describe.serial`, same `beforeAll/afterAll` shape. Only the test bodies differ.

Scope:

- `POST /api/part/` to create an assembly part (`assembly: true`) under QA-ROOT → capture `assemblyId`.
- `POST /api/part/` to create a component part (`component: true, purchaseable: true`) under QA-ROOT → capture `componentId`.
- `POST /api/bom/` with `{part: assemblyId, sub_part: componentId, quantity: 2, reference: 'R1'}` → 201, capture `bomId`.
- `GET /api/bom/?part=${assemblyId}` → 200, list includes the line we just created.
- `GET /api/bom/${bomId}/` → 200, body.quantity == 2.
- `PATCH /api/bom/${bomId}/` with `{quantity: 3}` → 200, body.quantity == 3.
- `DELETE /api/bom/${bomId}/` → 204.
- `afterAll` cleanup: patch both parts to `active: false`, then DELETE both parts. Ignore 404.

Rules:

- Single `test.describe.serial('API-PARTS-BOM bill of materials', ...)` block.
- Module-scoped `let assemblyId: number | undefined, componentId: number | undefined, bomId: number | undefined`.
- Every test title starts with the case ID exactly as it appears in the manual test case file.
- Use `ctx.get / post / patch / delete` — never `ctx.request.*`.
- Do not wrap the file in code fences.

Output: only the TypeScript file, compile-ready.

```

### Response
```
```ts
import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';
import { validateResponse } from '../helpers/schema';
import { makePart, type PartInput } from '../helpers/factories';

let ctx: APIRequestContext | undefined;
let assemblyId: number | undefined;
let componentId: number | undefined;
let bomId: number | undefined;

test.describe.serial('API-PARTS-BOM bill of materials', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
  });

  test.afterAll(async () => {
    if (ctx && assemblyId !== undefined) {
      await ctx.patch(`/api/part/${assemblyId}/`, { data: { active: false } });
      const r = await ctx.delete(`/api/part/${assemblyId}/`);
      if (r.status() !== 204 && r.status() !== 404) {
        console.error(`[cleanup] unexpected ${r.status()} on DELETE part/${assemblyId}/`);
      }
    }
    if (ctx && componentId !== undefined) {
      await ctx.patch(`/api/part/${componentId}/`, { data: { active: false } });
      const r = await ctx.delete(`/api/part/${componentId}/`);
      if (r.status() !== 204 && r.status() !== 404) {
        console.error(`[cleanup] unexpected ${r.status()} on DELETE part/${componentId}/`);
      }
    }
    if (ctx && bomId !== undefined) {
      const r = await ctx.delete(`/api/bom/${bomId}/`);
      if (r.status() !== 204 && r.status() !== 404) {
        console.error(`[cleanup] unexpected ${r.status()} on DELETE bom/${bomId}/`);
      }
    }
    if (ctx) await ctx.dispose();
  });

  test('API-PARTS-BOM-001 create assembly part', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const categoryId = Number(process.env.INVENTREE_QA_ROOT_ID);
    expect(Number.isFinite(categoryId)).toBe(true);
    const assemblyInput = makePart({ category: categoryId, assembly: true });
    const response = await ctx.post('/api/part/', { data: assemblyInput });
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number; name?: string; IPN?: string };
    expect(body.name).toBe(assemblyInput.name);
    expect(body.IPN).toBe(assemblyInput.IPN);
    expect(typeof body.pk).toBe('number');
    assemblyId = body.pk;
  });

  test('API-PARTS-BOM-002 create component part', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const categoryId = Number(process.env.INVENTREE_QA_ROOT_ID);
    expect(Number.isFinite(categoryId)).toBe(true);
    const componentInput = makePart({ category: categoryId, component: true, purchaseable: true });
    const response = await ctx.post('/api/part/', { data: componentInput });
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number; name?: string; IPN?: string };
    expect(body.name).toBe(componentInput.name);
    expect(body.IPN).toBe(componentInput.IPN);
    expect(typeof body.pk).toBe('number');
    componentId = body.pk;
  });

  test('API-PARTS-BOM-003 create BOM line', async () => {
    if (!ctx || !assemblyId || !componentId) throw new Error('no parts from prior steps');
    const response = await ctx.post('/api/bom/', { data: { part: assemblyId, sub_part: componentId, quantity: 2, reference: 'R1' } });
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number; quantity?: number };
    expect(body.quantity).toBe(2);
    bomId = body.pk;
  });

  test('API-PARTS-BOM-004 list BOM lines', async () => {
    if (!ctx || !assemblyId) throw new Error('no parts from prior steps');
    const response = await ctx.get(`/api/bom/?part=${assemblyId}`);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const list = Array.isArray(body) ? body : (body as { results?: unknown[] }).results ?? [];
    expect(list.some((item: { pk?: number }) => item.pk === bomId)).toBe(true);
  });

  test('API-PARTS-BOM-005 retrieve BOM line', async () => {
    if (!ctx || !bomId) throw new Error('no BOM line from prior step');
    const response = await ctx.get(`/api/bom/${bomId}/`);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { quantity?: number };
    expect(body.quantity).toBe(2);
  });

  test('API-PARTS-BOM-006 update BOM line', async () => {
    if (!ctx || !bomId) throw new Error('no BOM line from prior step');
    const response = await ctx.patch(`/api/bom/${bomId}/`, { data: { quantity: 3 } });
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { quantity?: number };
    expect(body.quantity).toBe(3);
  });

  test('API-PARTS-BOM-007 delete BOM line', async () => {
    if (!ctx || !bomId) throw new Error('no BOM line from prior step');
    const response = await ctx.delete(`/api/bom/${bomId}/`);
    expect(response.status()).toBe(204);
    bomId = undefined;
  });
});
```
```

---
## 2026-04-13T21:45:43.328Z — phase2 / phase2-spec-negative-v2

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-spec-negative.md
- metrics: duration_ms=5105 model=qa-gemma prompt_tokens=0 completion_tokens=0 total_tokens=0

### Retrieved
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -11.753)
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.784)
  - [477] qa/prompts-journal.md :: 2026-04-13T21:01:43.777Z — phase1 / phase1-ui-negative (score -11.857)
  - [397] qa/best-practices.md :: 2. Playwright API testing (score -11.888)
  - [416] qa/implementation-plan.md :: Phase 1 — RAG Pipeline + UI Test Case Generation (score -12.258)
  - [406] qa/design-notes.md :: 2026-04-13 (score -12.375)
  - [420] qa/implementation-plan.md :: Phase 3 — UI Automation (score -12.610)
  - [399] qa/best-practices.md :: 4. LLM-generated tests — grounding rules (score -12.703)

### Prompt preview
```
Generate the Playwright spec file `tests/parts-negative.spec.ts` for negative / auth / validation API cases.

Read the Context file first (passed as `--input`) — especially the Playwright API rules and the known-good `parts-crud.spec.ts` reference. Structure your file like it, minus the shared part-id state: cases here are independent, so use `test.describe` (no `.serial`) and per-test inline contexts where needed.

Scope (each case gets its own `test(...)`; no shared state between cases):

1. `GET /api/part/` with **no Authorization header** → 401 (use `createAnonContext`).
2. `GET /api/part/` with **an invalid token** `Token inv-000000000000000000000000000000000000000000000000-00000000` → 401. (Create an inline context via `request.newContext({ baseURL, extraHTTPHeaders: { Authorization: 'Token inv-...' } })`.)
3. `GET /api/part/999999999/` authed → 404.
4. `GET /api/part/category/999999999/` authed → 404.
5. `POST /api/part/` authed with payload `{}` (missing name/category) → 400 (DRF validation error).
6. `POST /api/part/` authed with payload `{name: 'x'}` (missing required `category`) → 400.
7. `PATCH /api/part/999999999/` authed with `{description: 'nope'}` → 404.
8. `DELETE /api/part/999999999/` authed → 404.
9. `PUT /api/part/` authed (wrong verb on collection) → 405 or 404. Accept either.
10. `POST /api/part/category/` authed with `{name: '', parent: null}` → 400.

Rules:

- Use `test.describe('API-PARTS-NEGATIVE auth and validation', ...)` without `.serial` since cases are independent.
- `beforeAll` creates one shared authed context for the authed cases.
- `afterAll` disposes the authed context.
- Anon and invalid-token cases create their own context inline and dispose after.
- Every test title starts with the case ID exactly as it appears in the manual test case file.
- Use `ctx.get / post / patch / delete` — never `ctx.request.*`.
- No code fences around the file. No prose.

Output: only the TypeScript file, compile-ready.

```

### Response
```
```ts
import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext, createAnonContext, fetchToken } from '../helpers/client';
import { validateResponse } from '../helpers/schema';

let authCtx: APIRequestContext | undefined;

test.describe('API-PARTS-NEGATIVE auth and validation', () => {
  test.beforeAll(async () => {
    authCtx = await createAuthedContext();
  });

  test.afterAll(async () => {
    if (authCtx) await authCtx.dispose();
  });

  test('API-PARTS-012 GET /api/part/ with no Authorization header → 401', async () => {
    const response = await fetchToken().then(token => createAnonContext({ baseURL, extraHTTPHeaders: { Authorization: `Token ${token}` } })).get('/api/part/');
    expect(response.status()).toBe(401);
  });

  test('API-PARTS-013 GET /api/part/ with an invalid token → 401', async () => {
    const response = await createAnonContext({ baseURL, extraHTTPHeaders: { Authorization: 'Token inv-0000000000000000000000000000000
```

---
## 2026-04-13T21:46:00.972Z — phase2 / phase2-spec-negative-v3

- system: ../system-instructions.md
- prompt-file: ../prompts/phase2-spec-negative.md
- metrics: duration_ms=3829 model=qa-gemma prompt_tokens=0 completion_tokens=0 total_tokens=0

### Retrieved
  - [419] qa/implementation-plan.md :: Phase 2 — API Tests (score -11.753)
  - [398] qa/best-practices.md :: 3. Test case authoring & traceability (score -11.784)
  - [477] qa/prompts-journal.md :: 2026-04-13T21:01:43.777Z — phase1 / phase1-ui-negative (score -11.857)

### Prompt preview
```
Generate the Playwright spec file `tests/parts-negative.spec.ts` for negative / auth / validation API cases.

Read the Context file first (passed as `--input`) — especially the Playwright API rules and the known-good `parts-crud.spec.ts` reference. Structure your file like it, minus the shared part-id state: cases here are independent, so use `test.describe` (no `.serial`) and per-test inline contexts where needed.

Scope (each case gets its own `test(...)`; no shared state between cases):

1. `GET /api/part/` with **no Authorization header** → 401 (use `createAnonContext`).
2. `GET /api/part/` with **an invalid token** `Token inv-000000000000000000000000000000000000000000000000-00000000` → 401. (Create an inline context via `request.newContext({ baseURL, extraHTTPHeaders: { Authorization: 'Token inv-...' } })`.)
3. `GET /api/part/999999999/` authed → 404.
4. `GET /api/part/category/999999999/` authed → 404.
5. `POST /api/part/` authed with payload `{}` (missing name/category) → 400 (DRF validation error).
6. `POST /api/part/` authed with payload `{name: 'x'}` (missing required `category`) → 400.
7. `PATCH /api/part/999999999/` authed with `{description: 'nope'}` → 404.
8. `DELETE /api/part/999999999/` authed → 404.
9. `PUT /api/part/` authed (wrong verb on collection) → 405 or 404. Accept either.
10. `POST /api/part/category/` authed with `{name: '', parent: null}` → 400.

Rules:

- Use `test.describe('API-PARTS-NEGATIVE auth and validation', ...)` without `.serial` since cases are independent.
- `beforeAll` creates one shared authed context for the authed cases.
- `afterAll` disposes the authed context.
- Anon and invalid-token cases create their own context inline and dispose after.
- Every test title starts with the case ID exactly as it appears in the manual test case file.
- Use `ctx.get / post / patch / delete` — never `ctx.request.*`.
- No code fences around the file. No prose.

Output: only the TypeScript file, compile-ready.

```

### Response
```
```ts
import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext, createAnonContext, fetchToken } from '../helpers/client';
import { validateResponse } from '../helpers/schema';

let authCtx: APIRequestContext | undefined;

test.describe('API-PARTS-NEGATIVE auth and validation', () => {
  test.beforeAll(async () => {
    authCtx = await createAuthedContext();
  });

  test.afterAll(async () => {
    if (authCtx) await authCtx.dispose();
  });

  test('API-PARTS-012 GET /api/part/ with no Authorization header → 401', async () => {
    const response = await fetchToken().then(token => createAnonContext({ baseURL, extraHTTPHeaders: { Authorization: `Token ${token}` } })).get('/api/part/');
    expect(response.status()).toBe(401);
  });

  test('API-PARTS-013 GET /api/part/ with an invalid token → 401', async () => {
    const response = await createAnonContext({ baseURL, extraHTTPHeaders: { Authorization: 'Token inv-0000000000000000000000000000000
```

---
## 2026-04-13T22:25:19.694Z — phase3 / phase3-ui-navigation

- system: ../system-instructions.md
- prompt-file: ../prompts/phase3-ui-navigation.md
- metrics: duration_ms=9090 model=qa-gemma prompt_tokens=5839 completion_tokens=512 total_tokens=6351

### Retrieved
  - [627] qa/selector-inventory.md :: Global navigation (present on every authenticated page) (score -9.097)
  - [499] qa/implementation-plan.md :: Phase 2 — API Tests (score -12.090)
  - [436] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -12.239)
  - [391] inventree/parts/views.md :: Part Tabs[¶](#part-tabs "Permanent link") (score -12.394)
  - [437] qa/best-practices.md :: 2. Playwright API testing (score -12.395)
  - [539] qa/prompts-journal.md :: 2026-04-13T20:05:35.520Z — phase1 / phase1-ui-tabs (score -12.420)

### Prompt preview
```
Generate the Playwright spec file `tests/parts-navigation.spec.ts` covering the global navigation and breadcrumbs of the InvenTree `/web/` SPA.

Read the Context file first (passed as `--input`) — copy the imports and describe structure from the reference spec.

Scope:

- `UI-PARTS-NAV-001 navigation menu button is visible on the authenticated shell` — `getByLabel('navigation-menu')` is visible after hitting `/web/part`.
- `UI-PARTS-NAV-002 top-level nav shows Dashboard, Parts, Stock, Manufacturing, Purchasing, Sales` — each button text is visible on the parts list page.
- `UI-PARTS-NAV-003 breadcrumb action button is visible on parts list` — `getByLabel('nav-breadcrumb-action')`.
- `UI-PARTS-NAV-004 global search button is reachable` — `getByLabel('open-search')` is visible and clickable (click it, assert the page is still on `/web/part`).
- `UI-PARTS-NAV-005 notifications button is visible` — `getByLabel('open-notifications')`.

Rules:

- Use `test.describe('UI-PARTS-NAV global navigation', ...)` (no `.serial` — tests are independent).
- Use the `partsListPage` fixture to navigate to `/web/part` in a `beforeEach`.
- All tests read authenticated state from the shared storageState fixture.
- Use `getByLabel(...)` or `getByRole('button', { name: '<text>' })` — exactly as shown in the context file. No CSS selectors.
- Assertions: `await expect(locator).toBeVisible()`.

Output: only the TypeScript file, compile-ready, no prose, no fences.

```

### Response
```
```typescript
import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';

test.describe('UI-PARTS-NAV global navigation', () => {
  test.beforeEach(async ({ partsListPage }) => {
    await partsListPage.goto();
    await partsListPage.expectLoaded();
  });

  test('UI-PARTS-NAV-001 navigation menu button is visible on the authenticated shell', async ({
    page,
  }) => {
    const navMenu = page.getByLabel('navigation-menu');
    await expect(navMenu).toBeVisible();
  });

  test('UI-PARTS-NAV-002 top-level nav shows Dashboard, Parts, Stock, Manufacturing, Purchasing, Sales', async ({
    page,
  }) => {
    const dashboardButton = page.getByRole('button', { name: 'Dashboard' });
    const partsButton = page.getByRole('button', { name: 'Parts' });
    const stockButton = page.getByRole('button', { name: 'Stock' });
    const manufacturingButton = page.getByRole('button', { name: 'Manufacturing' });
    const purchasingButton = page.getByRole('button', { name: 'Purchasing' });
    const salesButton = page.getByRole('button', { name: 'Sales' });

    await expect(dashboardButton).toBeVisible();
    await expect(partsButton).toBeVisible();
    await expect(stockButton).toBeVisible();
    await expect(manufacturingButton).toBeVisible();
    await expect(purchasingButton).toBeVisible();
    await expect(salesButton).toBeVisible();
  });

  test('UI-PARTS-NAV-003 breadcrumb action button is visible on parts list', async ({
    page,
  }) => {
    const breadcrumbAction = page.getByLabel('nav-breadcrumb-action');
    await expect(breadcrumbAction).toBeVisible();
  });

  test('UI-PARTS-NAV-004 global search button is reachable', async ({ page }) => {
    const searchButton = page.getByLabel('open-search');
    await expect(searchButton).toBeVisible();
    await searchButton.click();
    await expect(page.url()).toContain('/web/part');
  });

  test('UI-PARTS-NAV-005 notifications button is visible', async ({ page }) => {
    const notificationsButton = page.getByLabel('open-notifications');
    await expect(notificationsButton).toBeVisible();
  });
});
```
```

---
## 2026-04-13T22:25:28.006Z — phase3 / phase3-ui-detail-actions

- system: ../system-instructions.md
- prompt-file: ../prompts/phase3-ui-detail-actions.md
- metrics: duration_ms=8042 model=qa-gemma prompt_tokens=6474 completion_tokens=520 total_tokens=6994

### Retrieved
  - [611] qa/prompts-journal.md :: 2026-04-13T21:45:20.909Z — phase2 / phase2-spec-query-v2 (score -10.781)
  - [600] qa/prompts-journal.md :: 2026-04-13T21:42:05.134Z — phase2 / phase2-spec-query (score -10.802)
  - [499] qa/implementation-plan.md :: Phase 2 — API Tests (score -11.089)
  - [591] qa/prompts-journal.md :: 2026-04-13T21:26:34.585Z — phase2 / phase2-spec-crud (score -11.219)
  - [436] qa/best-practices.md :: 1. Playwright Page Object Model (POM) (score -11.234)
  - [624] qa/prompts-journal.md :: 2026-04-13T21:46:00.972Z — phase2 / phase2-spec-negative-v3 (score -11.267)

### Prompt preview
```
Generate the Playwright spec file `tests/parts-detail-actions.spec.ts` covering the action buttons on the Part detail page.

Read the Context file first. Copy the structure of `cross-flow.spec.ts` — seed a part via API in `beforeAll`, navigate via `partDetailPage`, clean up in `afterAll`.

Scope:

- `UI-PARTS-DETAIL-001 detail page document title contains the part IPN` — via `partDetailPage.expectTitleContains(seededPart.IPN)`.
- `UI-PARTS-DETAIL-002 open-in-admin action button is visible` — `partDetailPage.openInAdminButton`.
- `UI-PARTS-DETAIL-003 subscribe-to-notifications action button is visible` — `partDetailPage.subscribeButton`.
- `UI-PARTS-DETAIL-004 barcode actions menu trigger is visible` — `partDetailPage.barcodeActionsMenu`.
- `UI-PARTS-DETAIL-005 breadcrumb shows parts root segment` — assert `page.getByLabel('breadcrumb-0-parts')` is visible.

Rules:

- Single `test.describe('UI-PARTS-DETAIL actions', ...)` block. **No `.serial`** — each test navigates fresh via `partDetailPage.gotoById(seededPart.pk)` in a `beforeEach`.
- `beforeAll`: create one API context and one seeded part.
- `afterAll`: `deletePart(api, seededPart.pk)` + `api.dispose()`.
- All assertions use `await expect(...).toBeVisible()` or `expect(await page.title()).toContain(...)`.

Output: only the TypeScript file, compile-ready, no prose, no fences.

```

### Response
```
```typescript
import { test, expect } from '../fixtures/auth';
import {
  createAuthedContext,
  createPart,
  deletePart,
  type CreatedPart,
} from '../helpers/api';

let api: APIRequestContext | undefined;
let seededPart: CreatedPart | undefined;

test.describe('UI-PARTS-DETAIL actions', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    seededPart = await createPart(api, {
      name: `QA-DETAIL-${Date.now()}`,
      IPN: `QA-DETAIL-${Date.now()}`,
    });
  });

  test.afterAll(async () => {
    if (api && seededPart) {
      await deletePart(api, seededPart.pk);
    }
    if (api) await api.dispose();
  });

  test('UI-PARTS-DETAIL-001 detail page document title contains the part IPN', async ({
    partDetailPage,
  }) => {
    if (!seededPart) throw new Error('no seed');
    await partDetailPage.gotoById(seededPart.pk);
    await partDetailPage.expectTitleContains(seededPart.IPN);
  });

  test('UI-PARTS-DETAIL-002 open-in-admin action button is visible', async ({
    partDetailPage,
  }) => {
    if (!seededPart) throw new Error('no seed');
    await partDetailPage.gotoById(seededPart.pk);
    expect(partDetailPage.openInAdminButton).toBeVisible();
  });

  test('UI-PARTS-DETAIL-003 subscribe-to-notifications action button is visible', async ({
    partDetailPage,
  }) => {
    if (!seededPart) throw new Error('no seed');
    await partDetailPage.gotoById(seededPart.pk);
    expect(partDetailPage.subscribeButton).toBeVisible();
  });

  test('UI-PARTS-DETAIL-004 barcode actions menu trigger is visible', async ({
    partDetailPage,
  }) => {
    if (!seededPart) throw new Error('no seed');
    await partDetailPage.gotoById(seededPart.pk);
    expect(partDetailPage.barcodeActionsMenu).toBeVisible();
  });

  test('UI-PARTS-DETAIL-005 breadcrumb shows parts root segment', async ({ page }) => {
    await page.goto(`/web/part/${seededPart?.pk}`);
    expect(page.getByLabel('breadcrumb-0-parts')).toBeVisible();
  });
});
```
```

---
## 2026-04-13T22:25:33.072Z — phase3 / phase3-ui-login-negative

- system: ../system-instructions.md
- prompt-file: ../prompts/phase3-ui-login-negative.md
- metrics: duration_ms=4787 model=qa-gemma prompt_tokens=5933 completion_tokens=265 total_tokens=6198

### Retrieved
  - [623] qa/prompts-journal.md :: 2026-04-13T21:46:00.972Z — phase2 / phase2-spec-negative-v3 (score -10.772)
  - [624] qa/prompts-journal.md :: 2026-04-13T21:46:00.972Z — phase2 / phase2-spec-negative-v3 (score -10.778)
  - [620] qa/prompts-journal.md :: 2026-04-13T21:45:43.328Z — phase2 / phase2-spec-negative-v2 (score -11.527)
  - [564] qa/prompts-journal.md :: 2026-04-13T21:01:43.777Z — phase1 / phase1-ui-negative (score -11.843)
  - [584] qa/prompts-journal.md :: 2026-04-13T21:18:31.676Z — phase2 / phase2-api-negative (score -11.903)
  - [607] qa/prompts-journal.md :: 2026-04-13T21:42:22.093Z — phase2 / phase2-spec-negative (score -12.128)

### Prompt preview
```
Generate the Playwright spec file `tests/login-negative.spec.ts` — negative paths for the login form.

Read the Context file first.

Scope (each test uses a fresh unauthenticated context via `test.describe` + `test.use({ storageState: { cookies: [], origins: [] } })`):

- `UI-LOGIN-NEG-001 wrong password shows an error` — fill username `admin`, password `wrong-password-xyz`, click Log In, assert the hamburger menu does **not** appear within 4 seconds (i.e. still on the login form). Use a short timeout `.waitFor({ state: 'visible', timeout: 4000 }).catch(() => null)` pattern to avoid long test time.
- `UI-LOGIN-NEG-002 username-only (empty password) does not authenticate` — fill username, leave password empty, click Log In, assert username input is still visible (still on login form).
- `UI-LOGIN-NEG-003 blank form click does not authenticate` — click Log In without filling anything, assert username input is still visible.

Rules:

- `test.describe('UI-LOGIN-NEG login negative paths', () => { test.use({ storageState: { cookies: [], origins: [] } }); ... })`.
- Use the `loginPage` fixture; call `await loginPage.goto()` in each test.
- Do **not** call `loginPage.login(...)` — that helper asserts on successful login. Interact with `loginPage.usernameInput`, `loginPage.passwordInput`, and `loginPage.submitButton` directly.
- Assertions via `await expect(loginPage.usernameInput).toBeVisible()` and similar.
- **Never** use `page.waitForTimeout`. Use `Locator.waitFor({timeout: ...}).catch(() => null)` for negative visibility checks.

Output: only the TypeScript file, compile-ready, no prose, no fences.

```

### Response
```
```ts
import { test, expect } from '../fixtures/auth';
import {
  createAuthedContext,
  createPart,
  deletePart,
  type CreatedPart,
} from '../helpers/api';

let api: APIRequestContext | undefined;
let seededPart: CreatedPart | undefined;

test.describe('UI-PARTS-CROSS cross-functional flow', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    seededPart = await createPart(api, {
      name: `QA-CROSS-${Date.now()}`,
      IPN: `QA-CROSS-${Date.now()}`,
    });
  });

  test.afterAll(async () => {
    if (api && seededPart) {
      await deletePart(api, seededPart.pk);
    }
    if (api) await api.dispose();
  });

  test('UI-PARTS-CROSS-001 API-seeded part renders on its detail page', async ({
    partDetailPage,
    page,
  }) => {
    if (!seededPart) throw new Error('no seed');
    await partDetailPage.gotoById(seededPart.pk);
    await partDetailPage.expectTitleContains(seededPart.IPN);
    expect(await page.title()).toContain(seededPart.name);
  });
});
```
```

---
