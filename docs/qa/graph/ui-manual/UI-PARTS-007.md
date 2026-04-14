---
title: "Create purchaseable part with supplier data"
id: UI-PARTS-007
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T21:13:09.850Z
---

# UI-PARTS-007 — Create purchaseable part with supplier data

## Preconditions

logged in as admin; part is marked as 'Purchaseable'

## Steps

1. Navigate to Parts list<br>2. Click 'Add Parts' dropdown<br>3. Enter name 'Supplier Part'<br>4. Enter IPN 'SUP-001'<br>5. Enable 'Purchaseable' toggle<br>6. Enter supplier information<br>7. Click 'Save'

## Expected

Part is created.<br>Supplier data is saved.

## Tags

`create`, `supplier`

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
