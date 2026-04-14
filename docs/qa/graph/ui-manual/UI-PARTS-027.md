---
title: "Toggle Active/Inactive on a Part"
id: UI-PARTS-027
side: ui
priority: P1
tags: [qa, test, manual, ui]
generated: 2026-04-14T20:24:42.874Z
---

# UI-PARTS-027 — Toggle Active/Inactive on a Part

## Preconditions

logged in as admin; category QA-ROOT exists

## Steps

1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Active" checkbox<br>5. Save the part<br>6. Deactivate the part

## Expected

The part should not be visible in search results or available for purchase/sale

## Tags

attribute, active/inactive

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
