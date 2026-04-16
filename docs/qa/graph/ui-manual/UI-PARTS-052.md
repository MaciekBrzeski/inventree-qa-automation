---
title: "Negative: Attempt to create a circular revision for a Template part"
id: UI-PARTS-052
side: ui
priority: P3
tags: [qa, test, manual, ui]
generated: 2026-04-16T14:45:16.425Z
---

# UI-PARTS-052 — Negative: Attempt to create a circular revision for a Template part

## Preconditions

logged in as admin; category QA-ROOT exists; template part with variants already created

## Steps

1. Navigate to the Parts list<br>2. Click on "New Part"<br>3. Fill out the form with required details (e.g., name, IPN)<br>4. Check the "Template" option<br>5. Submit the form<br>6. Attempt to create a revision for the newly created template part that references itself

## Expected

1. The system should prevent creating a circular reference and display an error message

## Tags

negative

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
