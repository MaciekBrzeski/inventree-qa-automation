---
title: "Create a variant part and attempt to create a revision"
id: UI-PARTS-058
side: ui
priority: P1
tags: [qa, test, manual, ui]
generated: 2026-04-14T13:54:30.898Z
---

# UI-PARTS-058 — Create a variant part and attempt to create a revision

## Preconditions

logged in as admin; category QA-ROOT exists; variant part QA-VAR exists

## Steps

1. Navigate to the Parts list<br>2. Click on "Show Part Details" for variant part QA-VAR<br>3. Click on the part actions menu (three vertical dots)<br>4. Select "Duplicate Part"<br>5. Set the "Revision Of" field to variant part QA-VAR<br>6. Set a unique revision number<br>7. Submit the form

## Expected

The new part should be created with the correct "Revision Of" and "Revision" fields; the new part should appear in the Parts list

## Tags

revision

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
