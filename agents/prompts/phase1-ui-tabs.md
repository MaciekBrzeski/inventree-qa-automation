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
