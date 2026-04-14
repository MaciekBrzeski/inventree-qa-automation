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
