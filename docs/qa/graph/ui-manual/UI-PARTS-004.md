---
title: "Fail creation when name is missing"
id: UI-PARTS-004
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T20:24:42.873Z
---

# UI-PARTS-004 — Fail creation when name is missing

## Preconditions

logged in as admin; category 'QA-ROOT' exists

## Steps

1. Navigate to Parts list<br>2. Click 'Add Parts' dropdown<br>3. Enter IPN 'TEST-ERR'<br>4. Select category 'QA-ROOT'<br>5. Click 'Save'

## Expected

An error message is displayed indicating name is required.

## Tags

`validation`, `negative`

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
