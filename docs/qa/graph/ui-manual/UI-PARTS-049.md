---
title: "Negative: Attempt to create a circular template relationship"
id: UI-PARTS-049
side: ui
priority: P3
tags: [qa, test, manual, ui]
generated: 2026-04-14T21:13:09.851Z
---

# UI-PARTS-049 — Negative: Attempt to create a circular template relationship

## Preconditions

logged in as admin; category QA-ROOT exists

## Steps

1. Navigate to the Parts list<br>2. Click on "New Part"<br>3. Fill out the form with required details (e.g., name, IPN)<br>4. Check the "Template" option<br>5. Submit the form<br>6. Attempt to create a variant under the newly created template part that references itself

## Expected

1. The system should prevent creating a circular reference and display an error message

## Tags

negative, circular

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
