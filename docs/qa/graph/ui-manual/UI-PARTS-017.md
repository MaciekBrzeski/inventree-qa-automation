---
title: "Move a part to a different category"
id: UI-PARTS-017
side: ui
priority: P2
tags: [qa, test, manual, ui]
generated: 2026-04-16T14:45:16.424Z
---

# UI-PARTS-017 — Move a part to a different category

## Preconditions

logged in as admin; part "Resistor" is in category "COMPONENTS"

## Steps

1. Open part "Resistor" detail view<br>2. Edit the part<br>3. Change category to "PASSIVE"<br>4. Save

## Expected

The part is updated successfully.<br>The part's category is now "PASSIVE".

## Tags

`category`, `crud`

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
