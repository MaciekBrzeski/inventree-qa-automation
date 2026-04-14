---
title: "Create a template part and attempt to create a revision"
id: UI-PARTS-057
side: ui
priority: P3
tags: [qa, test, manual, ui]
generated: 2026-04-14T20:24:42.875Z
---

# UI-PARTS-057 — Create a template part and attempt to create a revision

## Preconditions

logged in as admin; category QA-ROOT exists; template part QA-TMP exists

## Steps

1. Navigate to the Parts list<br>2. Click on "Show Part Details" for template part QA-TMP<br>3. Click on the part actions menu (three vertical dots)<br>4. Select "Duplicate Part"<br>5. Set the "Revision Of" field to template part QA-TMP<br>6. Set a unique revision number<br>7. Submit the form

## Expected

The request should be rejected with an error message; no new revision should be created

## Tags

revision

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
