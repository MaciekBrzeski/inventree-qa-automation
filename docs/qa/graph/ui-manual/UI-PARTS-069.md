---
title: "Attempt to edit a part as a read-only user"
id: UI-PARTS-069
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T20:24:42.875Z
---

# UI-PARTS-069 — Attempt to edit a part as a read-only user

## Preconditions

logged in as read-only; category QA-ROOT exists

## Steps

1. Navigate to the Parts list<br>2. Find and click on an existing part<br>3. Click "Edit"<br>4. Make changes and submit form

## Expected

The system should display an error message indicating that you do not have permission to edit a part

## Tags

negative

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
