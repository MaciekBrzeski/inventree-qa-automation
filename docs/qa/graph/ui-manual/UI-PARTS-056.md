---
title: "Validate uniqueness of revision numbers per parent part"
id: UI-PARTS-056
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-14T15:01:44.848Z
---

# UI-PARTS-056 — Validate uniqueness of revision numbers per parent part

## Preconditions

logged in as admin; category QA-ROOT exists; part QA-TEST has multiple revisions

## Steps

1. Navigate to the Parts list<br>2. Click on "Show Part Details" for part QA-TEST<br>3. Attempt to create a new revision with an existing revision number<br>4. Observe error message

## Expected

An error message should be displayed indicating that the revision number already exists; the new revision should not be created

## Tags

revision

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
