---
title: "Create a part with description and category"
id: UI-PARTS-002
side: ui
priority: P1
tags: [qa, test, manual, ui]
generated: 2026-04-14T15:01:44.847Z
---

# UI-PARTS-002 — Create a part with description and category

## Preconditions

logged in as admin; category 'QA-ROOT' exists

## Steps

1. Navigate to Parts list<br>2. Click 'Add Parts' dropdown<br>3. Enter name 'Test Part 2'<br>4. Enter IPN 'TEST-002'<br>5. Enter description 'A test description'<br>6. Select category 'QA-ROOT'<br>7. Click 'Save'

## Expected

Part is created.<br>Description matches 'A test description'.

## Tags

`create`, `crud`

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
