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
