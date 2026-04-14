---
title: UI selector inventory — InvenTree web app
tags: [qa, hackathon, ui, selectors, playwright]
created: 2026-04-13
source: data/dom-snapshots/*.html captured by `submission/automation/ui/tests/_snapshot.spec.ts`
---

# Selector inventory — InvenTree `/web/` React app

Authoritative locators for all UI automation. Every entry was harvested from a live DOM snapshot in `submission/data/dom-snapshots/`, not invented.

**Selector priority**: `getByRole` with name > `getByLabel` > `getByPlaceholder` > `getByTestId` > CSS. Mantine renders `aria-label` on most interactive elements — `getByLabel` works for both real `<label>` elements and `aria-label` attributes.

## Login page (`/web/` unauthenticated)

Source: `01-landing-before-login.html`

| Element | Locator | Notes |
|---|---|---|
| Username input | `getByLabel('login-username')` or `getByPlaceholder('Your username')` | Mantine `TextInput`, `data-path="username"` |
| Password input | `getByLabel('login-password')` or `getByPlaceholder('Your password')` | Mantine `PasswordInput`, `data-path="password"` |
| Submit button | `getByRole('button', { name: 'Log In' })` | `<button type="submit">Log In</button>` |
| Language toggle | `getByLabel('Language toggle')` | secondary, avoid in tests |
| Reset password link | `getByRole('button', { name: 'Reset password' })` | not part of happy path |

## Global navigation (present on every authenticated page)

Source: `03-parts-list.html`, `06-part-detail.html`

| Element | Locator | Notes |
|---|---|---|
| Hamburger menu | `getByLabel('navigation-menu')` | opens side nav drawer |
| Global search | `getByLabel('open-search')` | top bar search icon |
| Spotlight | `getByLabel('open-spotlight')` | Mantine spotlight (Cmd+K) |
| Barcode scanner | `getByLabel('barcode-scan-button-any')` | scan-any-barcode entry |
| Notifications bell | `getByLabel('open-notifications')` | |
| Alerts | `getByLabel('open-alerts')` | |
| Breadcrumb action | `getByLabel('nav-breadcrumb-action')` | three-dot menu on breadcrumb |
| Breadcrumb segment | `getByLabel('breadcrumb-<n>-<slug>')` | e.g. `breadcrumb-0-parts`, `breadcrumb-1-qa-root` |

## Parts list page (`/web/part`)

Source: `03-parts-list.html`

| Element | Locator | Notes |
|---|---|---|
| Page title | `page.title()` returns `"Parts"` | |
| Category panel | `getByLabel('partcategory')` or `getByLabel('panel-group-partcategory')` | |
| Category tree tab | `getByRole('tab', { name: /part categories/i })` | role=tab, tabindex=0 |

The actual list rows render in a virtualized table (no `data-testid` per row). For row-level assertions, prefer:
- Filter/search to narrow to one row, then assert on the row's visible text.
- Or navigate directly to `/web/part/<pk>` for single-part operations.

## Part detail page (`/web/part/<pk>`)

Source: `06-part-detail.html` (108 KB — the richest snapshot)

| Element | Locator | Notes |
|---|---|---|
| Page title | `page.title()` returns `"Part: <IPN> \| <name>"` | |
| Open-in-admin button | `getByLabel('action-button-open-in-admin-interface')` | top-right action bar |
| Subscribe button | `getByLabel('action-button-subscribe-to-notifications')` | |
| Barcode actions menu | `getByLabel('action-menu-barcode-actions')` | dropdown trigger |
| Tabs | `getByRole('tab', { name: ... })` | Mantine tab list — tab names not yet inventoried; capture when needed |

**Action menu pattern**: InvenTree consistently uses `aria-label="action-menu-<name>"` for dropdown triggers and `aria-label="action-button-<name>"` for buttons. Search the snapshot for `action-(button|menu)-` to discover new ones.

## Part category page (`/web/partcategory`)

Source: `05-categories.html` (10 KB — small, mostly empty shell)

Snapshot taken before the category tree rendered. Re-run the snapshot harness after login to get the populated DOM, then extend this inventory.

## Reusable Mantine patterns

- **Form inputs** live in `<input class="mantine-Input-input">` wrapped in `<div class="mantine-TextInput-root">`. Each has an `aria-label` and `data-path` attribute — `getByLabel` is reliable.
- **Buttons** are `<button class="mantine-Button-root">`, with visible text inside. `getByRole('button', { name: '<text>' })` works.
- **ActionIcon buttons** (icon-only) have `aria-label` set and no visible text → use `getByLabel`.
- **Toasts / notifications** use Mantine's `role="alert"` — `getByRole('alert')` for assertions.
- **Modals** use Mantine's `role="dialog"` with a `aria-labelledby` pointing to the title text. Use `getByRole('dialog', { name: /create.*part/i })`.

## Re-capturing the inventory

```
cd submission/automation/ui
npx playwright test tests/_snapshot.spec.ts
```

Output goes to `submission/data/dom-snapshots/`. Update this file when new selectors surface.
