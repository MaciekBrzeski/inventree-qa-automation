---
title: "Attempt to create a part with an invalid units string"
id: UI-PARTS-065
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T13:54:30.898Z
---

# UI-PARTS-065 — Attempt to create a part with an invalid units string

## Preconditions

logged in as admin; category QA-ROOT exists

## Steps

1. Navigate to the Parts list<br>2. Click "Create Part"<br>3. Enter valid IPN and name<br>4. Set units to an invalid string (e.g., "kg/m")<br>5. Submit form

## Expected

The system should display an error message indicating that the units string is invalid

## Tags

negative

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
