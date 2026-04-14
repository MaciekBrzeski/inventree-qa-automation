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
