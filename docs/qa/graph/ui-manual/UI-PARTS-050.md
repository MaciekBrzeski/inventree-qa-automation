---
title: "Negative: Attempt to create a duplicate IPN for a Variant"
id: UI-PARTS-050
side: ui
priority: P3
tags: [qa, test, manual, ui]
generated: 2026-04-14T21:13:09.851Z
---

# UI-PARTS-050 — Negative: Attempt to create a duplicate IPN for a Variant

## Preconditions

logged in as admin; category QA-ROOT exists; template part with variants already created

## Steps

1. Navigate to the Variants tab of an existing template part<br>2. Click on "New Variant"<br>3. Fill out the form with required details (e.g., name, IPN) using an IPN that is already in use by another variant

## Expected

1. The system should prevent creating a duplicate IPN and display an error message

## Tags

negative

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
