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
