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
