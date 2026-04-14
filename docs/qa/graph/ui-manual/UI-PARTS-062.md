---
title: "Attempt to edit a locked part"
id: UI-PARTS-062
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T15:01:44.848Z
---

# UI-PARTS-062 — Attempt to edit a locked part

## Preconditions

logged in as admin; category QA-ROOT exists

## Steps

1. Navigate to the Parts list<br>2. Find and click on a locked part<br>3. Click "Edit"

## Expected

The system should display an error message indicating that the part is locked and cannot be edited

## Tags

negative

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
