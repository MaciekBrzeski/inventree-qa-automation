import type { Page, Response } from '@playwright/test';

/**
 * UI path primitives — reusable navigation + interaction building blocks.
 *
 * Every primitive here appeared ≥ 2 times across the automated UI suite (see
 * `docs/qa/ui-paths/primitives.md` for the extraction frequency table). By sharing
 * these, new tests that target a deeper endpoint reuse the climb instead of reinventing
 * it — same-prefix, branch-at-decision-point. When a new branch is needed, add a new
 * primitive or a new recipe in `recipes.ts` — never inline the sequence in the spec.
 *
 * Each primitive ends in a known stable state so the next primitive can assume preconditions
 * instead of re-probing the page.
 */

const NAV_TIMEOUT = 10_000;
const INTERACTION_TIMEOUT = 10_000;
const SETTLE_MS = 800;

/** Wait for the authenticated shell nav to be visible. Baseline for every authed flow. */
export async function waitForShell(page: Page): Promise<void> {
  await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: NAV_TIMEOUT });
}

/** Wait for every visible mantine loader to disappear. */
export async function waitLoadersGone(page: Page, timeout = 8000): Promise<void> {
  await page
    .waitForFunction(
      () => {
        const loaders = Array.from(document.querySelectorAll('.mantine-Loader-root'));
        return loaders.every((el) => {
          const st = window.getComputedStyle(el as HTMLElement);
          return st.display === 'none' || st.visibility === 'hidden';
        });
      },
      null,
      { timeout },
    )
    .catch(() => {});
}

// ── Navigation primitives ─────────────────────────────────────────────

export async function gotoPartDetail(page: Page, partPk: number): Promise<void> {
  await page.goto(`/web/part/${partPk}/details`);
  await page.waitForLoadState('networkidle');
  await waitForShell(page);
  await waitLoadersGone(page);
  await page.waitForTimeout(SETTLE_MS);
}

export async function gotoPartPanel(page: Page, partPk: number, panel: string): Promise<void> {
  await page.goto(`/web/part/${partPk}/${panel}`);
  await page.waitForLoadState('networkidle');
  await waitForShell(page);
  await waitLoadersGone(page);
  await page.waitForTimeout(SETTLE_MS);
}

export async function gotoCategoryDetail(page: Page, categoryPk: number): Promise<void> {
  await page.goto(`/web/part/category/${categoryPk}/details`);
  await page.waitForLoadState('networkidle');
  await waitForShell(page);
  await waitLoadersGone(page);
  await page.waitForTimeout(SETTLE_MS);
}

export async function gotoCategoryPartsPanel(
  page: Page,
  categoryPk: number | 'index' = 'index',
): Promise<void> {
  await page.goto(`/web/part/category/${categoryPk}/parts`);
  await page.waitForLoadState('networkidle');
  await waitForShell(page);
  await waitLoadersGone(page);
  await page.waitForTimeout(SETTLE_MS);
}

export async function gotoSubcategoriesPanel(
  page: Page,
  categoryPk: number | 'index' = 'index',
): Promise<void> {
  await page.goto(`/web/part/category/${categoryPk}/subcategories`);
  await page.waitForLoadState('networkidle');
  await waitForShell(page);
  await waitLoadersGone(page);
  await page.waitForTimeout(SETTLE_MS);
}

// ── Menu open primitives ──────────────────────────────────────────────

export async function openPartActionsMenu(page: Page): Promise<void> {
  await page.getByLabel('action-menu-part-actions').click({ timeout: INTERACTION_TIMEOUT });
  await page.waitForTimeout(400);
}

export async function openCategoryActionsMenu(page: Page): Promise<void> {
  await page.getByLabel('action-menu-category-actions').click({ timeout: INTERACTION_TIMEOUT });
  await page.waitForTimeout(400);
}

export async function openAddPartsMenu(page: Page): Promise<void> {
  await page.getByLabel('action-menu-add-parts').click({ timeout: INTERACTION_TIMEOUT });
  await page.waitForTimeout(400);
}

// ── Modal-opening items (must be called AFTER the parent menu is open) ─

export async function clickPartActionEdit(page: Page): Promise<void> {
  await page.getByLabel('action-menu-part-actions-edit').click({ timeout: INTERACTION_TIMEOUT });
}

export async function clickPartActionDelete(page: Page): Promise<void> {
  await page.getByLabel('action-menu-part-actions-delete').click({ timeout: INTERACTION_TIMEOUT });
}

export async function clickPartActionDuplicate(page: Page): Promise<void> {
  await page.getByLabel('action-menu-part-actions-duplicate').click({ timeout: INTERACTION_TIMEOUT });
}

export async function clickCategoryActionEdit(page: Page): Promise<void> {
  await page
    .getByLabel('action-menu-category-actions-edit')
    .click({ timeout: INTERACTION_TIMEOUT });
}

export async function clickCategoryActionDelete(page: Page): Promise<void> {
  await page
    .getByLabel('action-menu-category-actions-delete')
    .click({ timeout: INTERACTION_TIMEOUT });
}

export async function clickAddPartsCreatePart(page: Page): Promise<void> {
  await page
    .getByLabel('action-menu-add-parts-create-part')
    .click({ timeout: INTERACTION_TIMEOUT });
}

export async function clickAddPartCategoryButton(page: Page): Promise<void> {
  await page
    .getByLabel('action-button-add-part-category')
    .click({ timeout: INTERACTION_TIMEOUT });
}

// ── Form field fill primitives ────────────────────────────────────────

export async function fillNameField(page: Page, value: string): Promise<void> {
  const input = page.locator('input[name="name"]').first();
  await input.waitFor({ state: 'visible', timeout: INTERACTION_TIMEOUT });
  await input.fill(value);
}

export async function fillIpnField(page: Page, value: string): Promise<void> {
  const input = page.locator('input[name="IPN"]').first();
  if (await input.isVisible().catch(() => false)) await input.fill(value);
}

export async function fillDescriptionField(page: Page, value: string): Promise<void> {
  const input = page
    .locator('textarea[name="description"], input[name="description"]')
    .first();
  if (await input.isVisible().catch(() => false)) await input.fill(value);
}

export async function toggleBooleanField(page: Page, fieldName: string): Promise<void> {
  const cb = page.getByLabel(`boolean-field-${fieldName}`).first();
  await cb.waitFor({ state: 'visible', timeout: INTERACTION_TIMEOUT });
  await cb.click();
}

// ── Submit primitives ─────────────────────────────────────────────────

/** Click the canonical Mantine form Submit button. */
export async function submitModal(page: Page): Promise<void> {
  await page
    .getByRole('button', { name: 'Submit' })
    .first()
    .click({ timeout: INTERACTION_TIMEOUT });
}

/** Click Submit AND wait for a matching API response. Returns the response. */
export async function submitAndWaitForResponse(
  page: Page,
  methodRe: RegExp,
  urlRe: RegExp,
  timeout = 10_000,
): Promise<Response> {
  const [response] = await Promise.all([
    page.waitForResponse(
      (r) => methodRe.test(r.request().method()) && urlRe.test(r.url()),
      { timeout },
    ),
    submitModal(page),
  ]);
  return response;
}

/** Confirm a Mantine delete/confirm dialog. Tries Submit first, falls back to Delete. */
export async function confirmDialog(page: Page): Promise<void> {
  const submit = page.getByRole('button', { name: 'Submit' });
  const del = page.getByRole('button', { name: 'Delete' });
  const btn = (await submit.count().catch(() => 0)) > 0 ? submit.first() : del.first();
  await btn.waitFor({ state: 'visible', timeout: INTERACTION_TIMEOUT });
  await btn.click();
}
