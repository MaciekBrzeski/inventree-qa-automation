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
