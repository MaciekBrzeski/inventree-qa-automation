---
title: "Attempt to create a part with a unique code constraint violation"
id: UI-PARTS-066
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T20:24:42.875Z
---

# UI-PARTS-066 — Attempt to create a part with a unique code constraint violation

## Preconditions

logged in as admin; category QA-ROOT exists

## Steps

1. Navigate to the Parts list<br>2. Click "Create Part"<br>3. Enter an existing unique code<br>4. Submit form

## Expected

The system should display an error message indicating that the unique code is already in use

## Tags

negative

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
