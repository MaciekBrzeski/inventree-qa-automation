---
title: "Validate that adding a parameter with invalid units fails"
id: UI-PARTS-044
side: ui
priority: P3
tags: [qa, test, manual, ui]
generated: 2026-04-14T21:13:09.851Z
---

# UI-PARTS-044 — Validate that adding a parameter with invalid units fails

## Preconditions

logged in as admin; category QA-ROOT exists

## Steps

1. Navigate to the Parts list<br>2. Select an existing part<br>3. Click on "Edit" button<br>4. Go to the "Parameters" tab<br>5. Click on "Add Parameter"<br>6. Enter a parameter name and invalid units (e.g., "kg/m")<br>7. Save changes

## Expected

An error message is displayed indicating that the units are invalid; no new parameter is added

## Tags

parameters

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
