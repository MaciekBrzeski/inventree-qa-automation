---
title: "Create part with initial stock"
id: UI-PARTS-006
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T20:24:42.873Z
---

# UI-PARTS-006 — Create part with initial stock

## Preconditions

logged in as admin; 'Initial Stock' setting is enabled

## Steps

1. Navigate to Parts list<br>2. Click 'Add Parts' dropdown<br>3. Enter name 'Stock Part'<br>4. Enter IPN 'STOCK-001'<br>5. Enter '10' in Initial Stock field<br>6. Click 'Save'

## Expected

Part is created.<br>Stock count is 10.

## Tags

`create`, `stock`

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
