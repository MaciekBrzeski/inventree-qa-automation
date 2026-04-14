---
title: "Toggle Active/Inactive on a Locked Part"
id: UI-PARTS-030
side: ui
priority: P1
tags: [qa, test, manual, ui]
generated: 2026-04-14T20:24:42.874Z
---

# UI-PARTS-030 — Toggle Active/Inactive on a Locked Part

## Preconditions

logged in as admin; category QA-ROOT exists

## Steps

1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Locked" checkbox<br>5. Attempt to change the "Active" checkbox<br>6. Save the part

## Expected

The attribute should not be editable and an error message should be displayed

## Tags

attribute, locked

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
