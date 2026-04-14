---
title: "Attempt to create a part with missing required fields"
id: UI-PARTS-067
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T15:01:44.848Z
---

# UI-PARTS-067 — Attempt to create a part with missing required fields

## Preconditions

logged in as admin; category QA-ROOT exists

## Steps

1. Navigate to the Parts list<br>2. Click "Create Part"<br>3. Leave all fields blank<br>4. Submit form

## Expected

The system should display an error message indicating that one or more required fields are missing

## Tags

negative

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
