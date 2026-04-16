---
title: "Set supplier part unit to another compatible unit"
id: UI-PARTS-035
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-16T14:45:16.424Z
---

# UI-PARTS-035 — Set supplier part unit to another compatible unit

## Preconditions

logged in as admin; base part has unit "metres"; supplier part exists

## Steps

1. Open supplier part details.<br>2. Edit supplier part unit.<br>3. Enter "inches".<br>4. Save.

## Expected

Supplier part unit is updated to "inches".

## Tags

`units`, `supplier`

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
