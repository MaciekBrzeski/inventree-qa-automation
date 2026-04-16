---
title: "Lock a Part and attempt to change attributes"
id: UI-PARTS-028
side: ui
priority: P1
tags: [qa, test, manual, ui]
generated: 2026-04-16T14:45:16.424Z
---

# UI-PARTS-028 — Lock a Part and attempt to change attributes

## Preconditions

logged in as admin; category QA-ROOT exists

## Steps

1. Navigate to Parts list<br>2. Create a new part<br>3. Go to Attributes tab<br>4. Check the "Locked" checkbox<br>5. Attempt to change any attribute<br>6. Save the part

## Expected

The attributes should not be editable and an error message should be displayed

## Tags

attribute, locked

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
