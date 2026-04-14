---
title: "Negative: Attempt to create an inactive part as a Variant"
id: UI-PARTS-051
side: ui
priority: P3
tags: [qa, test, manual, ui]
generated: 2026-04-14T20:24:42.874Z
---

# UI-PARTS-051 — Negative: Attempt to create an inactive part as a Variant

## Preconditions

logged in as admin; category QA-ROOT exists; template part with variants already created

## Steps

1. Navigate to the Parts list<br>2. Click on "New Part"<br>3. Fill out the form with required details (e.g., name, IPN)<br>4. Uncheck the "Active" option<br>5. Submit the form<br>6. Attempt to create a variant under the newly created inactive part

## Expected

1. The system should prevent creating an inactive part as a Variant and display an error message

## Tags

negative

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
