---
title: "Mark part as Template and create a Variant"
id: UI-PARTS-045
side: ui
priority: P1
tags: [qa, test, manual, ui]
generated: 2026-04-14T20:24:42.874Z
---

# UI-PARTS-045 — Mark part as Template and create a Variant

## Preconditions

logged in as admin; category QA-ROOT exists

## Steps

1. Navigate to the Parts list<br>2. Click on "New Part"<br>3. Fill out the form with required details (e.g., name, IPN)<br>4. Check the "Template" option<br>5. Submit the form<br>6. Navigate to the Variants tab of the created template part<br>7. Click on "New Variant"<br>8. Fill out the form with required details (e.g., name, IPN)<br>9. Submit the form

## Expected

1. The new part should be marked as a Template<br>2. A new variant should be created under the template part<br>3. The variants tab of the template part should display the newly created variant

## Tags

template, variant

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
