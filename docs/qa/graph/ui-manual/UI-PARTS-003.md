---
title: "Duplicate an existing part as a new revision"
id: UI-PARTS-003
side: ui
priority: P1
tags: [qa, test, manual, ui]
generated: 2026-04-16T14:45:16.424Z
---

# UI-PARTS-003 — Duplicate an existing part as a new revision

## Preconditions

logged in as admin; part 'TEST-001' exists

## Steps

1. Navigate to Part detail for 'TEST-001'<br>2. Click three-dot menu<br>3. Select 'Duplicate Part'<br>4. Set 'Revision Of' to 'TEST-001'<br>5. Enter new revision number<br>6. Click 'Save'

## Expected

New part revision is created.<br>User is redirected to the new revision's detail page.

## Tags

`duplicate`, `revision`

## Automated by

_(not automated)_

## Endpoints touched via the automated sibling(s)

_(none traced — case may not yet be automated or automation does not hit /api/part|/api/bom)_
