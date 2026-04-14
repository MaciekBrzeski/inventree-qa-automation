---
title: "Set supplier part unit to blank"
id: UI-PARTS-036
side: ui
priority: P3
tags: [qa, test, manual, ui]
generated: 2026-04-14T21:13:09.851Z
---

# UI-PARTS-036 — Set supplier part unit to blank

## Preconditions

logged in as admin; base part has unit "metres"; supplier part exists

## Steps

1. Open supplier part details.<br>2. Edit supplier part unit.<br>3. Clear the unit field.<br>4. Save.

## Expected

Supplier part unit is blank.

## Tags

`units`, `edge-case`

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
