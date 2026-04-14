---
title: "Attempt to create a part as a read-only user"
id: UI-PARTS-068
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T20:24:42.875Z
---

# UI-PARTS-068 — Attempt to create a part as a read-only user

## Preconditions

logged in as read-only; category QA-ROOT exists

## Steps

1. Navigate to the Parts list<br>2. Click "Create Part"<br>3. Enter valid data and submit form

## Expected

The system should display an error message indicating that you do not have permission to create a part

## Tags

negative

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
