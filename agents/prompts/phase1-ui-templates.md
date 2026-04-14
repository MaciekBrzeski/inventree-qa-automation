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
