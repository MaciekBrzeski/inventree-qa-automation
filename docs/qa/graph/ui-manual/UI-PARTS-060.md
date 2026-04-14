---
title: "Attempt to create a duplicate IPN revision"
id: UI-PARTS-060
side: ui
priority: P3
tags: [qa, test, manual, ui]
generated: 2026-04-14T13:54:30.898Z
---

# UI-PARTS-060 — Attempt to create a duplicate IPN revision

## Preconditions

logged in as admin; category QA-ROOT exists; part QA-TEST exists

## Steps

1. Navigate to the Parts list<br>2. Click on "Show Part Details" for part QA-TEST<br>3. Click on the part actions menu (three vertical dots)<br>4. Select "Duplicate Part"<br>5. Set the "Revision Of" field to part QA-TEST<br>6. Set a duplicate IPN value<br>7. Submit the form

## Expected

The request should be rejected with an error message; no new revision should be created

## Tags

revision

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
