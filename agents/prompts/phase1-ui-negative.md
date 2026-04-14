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
