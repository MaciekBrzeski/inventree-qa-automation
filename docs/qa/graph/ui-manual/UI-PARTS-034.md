---
title: "Reject incompatible supplier part unit"
id: UI-PARTS-034
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T20:24:42.874Z
---

# UI-PARTS-034 — Reject incompatible supplier part unit

## Preconditions

logged in as supplier part; base part has unit "metres"; supplier part exists

## Steps

1. Open supplier part details.<br>2. Edit supplier part unit.<br>3. Enter an incompatible unit (e.g., "litres").<br>4. Save.

## Expected

An error message is displayed.

## Tags

`units`, `validation`, `negative`, `supplier`

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
