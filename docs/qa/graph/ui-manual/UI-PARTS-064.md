---
title: "Attempt to create a part with a circular revision reference"
id: UI-PARTS-064
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T13:54:30.898Z
---

# UI-PARTS-064 — Attempt to create a part with a circular revision reference

## Preconditions

logged in as admin; category QA-ROOT exists

## Steps

1. Navigate to the Parts list<br>2. Click "Create Part"<br>3. Enter an IPN and name<br>4. Set parent part to itself<br>5. Submit form

## Expected

The system should display an error message indicating that a circular revision reference is not allowed

## Tags

negative

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
