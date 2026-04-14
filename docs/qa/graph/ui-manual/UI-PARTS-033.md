---
title: "Set a compatible supplier part unit"
id: UI-PARTS-033
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T15:01:44.848Z
---

# UI-PARTS-033 — Set a compatible supplier part unit

## Preconditions

logged in as admin; base part has unit "metres"; supplier part exists

## Steps

1. Open supplier part details.<br>2. Edit supplier part unit.<br>3. Enter a compatible unit (e.g., "cm").<br>4. Save.

## Expected

Supplier part unit is updated to "cm".

## Tags

`units`, `validation`, `supplier`

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
