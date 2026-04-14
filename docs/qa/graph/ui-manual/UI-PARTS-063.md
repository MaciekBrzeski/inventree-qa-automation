---
title: "Attempt to set an inactive part on a new stock transaction"
id: UI-PARTS-063
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T15:01:44.848Z
---

# UI-PARTS-063 — Attempt to set an inactive part on a new stock transaction

## Preconditions

logged in as admin; category QA-ROOT exists

## Steps

1. Navigate to the Parts list<br>2. Find and click on an inactive part<br>3. Click "Create Stock Transaction"<br>4. Enter valid quantity<br>5. Submit form

## Expected

The system should display an error message indicating that the part is inactive and cannot be used in a stock transaction

## Tags

negative

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
