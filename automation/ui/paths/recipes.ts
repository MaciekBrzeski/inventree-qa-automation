import type { Page, Response } from '@playwright/test';
import {
  clickAddPartCategoryButton,
  clickAddPartsCreatePart,
  clickCategoryActionDelete,
  clickCategoryActionEdit,
  clickPartActionDelete,
  clickPartActionEdit,
  confirmDialog,
  fillIpnField,
  fillNameField,
  gotoCategoryDetail,
  gotoCategoryPartsPanel,
  gotoPartDetail,
  gotoSubcategoriesPanel,
  openAddPartsMenu,
  openCategoryActionsMenu,
  openPartActionsMenu,
  submitAndWaitForResponse,
  submitModal,
  toggleBooleanField,
} from './primitives';

/**
 * UI path recipes — compositions of primitives that map 1:1 to API endpoints.
 *
 * Each recipe is "click-chain → API call". The shared prefix in the ui-paths tree
 * shows where two recipes branch. New tests should prefer calling a recipe over
 * writing the chain by hand.
 *
 * Every recipe that causes a backend write returns the Response so the test can
 * assert on status + body.
 */

// ── PART recipes ──────────────────────────────────────────────────────

/**
 * Create a Part via the UI chain
 *   gotoCategoryPartsPanel(root) → openAddPartsMenu → clickAddPartsCreatePart
 *   → fill name + IPN → submitAndWaitForResponse(POST /api/part/)
 */
export async function createPartViaUi(
  page: Page,
  args: { rootCategoryPk: number; name: string; ipn: string },
): Promise<Response> {
  await gotoCategoryPartsPanel(page, args.rootCategoryPk);
  await openAddPartsMenu(page);
  await clickAddPartsCreatePart(page);
  await fillNameField(page, args.name);
  await fillIpnField(page, args.ipn);
  return submitAndWaitForResponse(page, /^POST$/, /\/api\/part\/$/);
}

/**
 * Edit a Part via the UI chain
 *   gotoPartDetail(pk) → openPartActionsMenu → clickPartActionEdit
 *   → run mutator(page) to fill any fields → submitAndWaitForResponse(PATCH /api/part/{id}/)
 */
export async function editPartViaUi(
  page: Page,
  partPk: number,
  mutator: (page: Page) => Promise<void>,
): Promise<Response> {
  await gotoPartDetail(page, partPk);
  await openPartActionsMenu(page);
  await clickPartActionEdit(page);
  await mutator(page);
  return submitAndWaitForResponse(page, /^PATCH$/, /\/api\/part\/\d+\/?$/);
}

/**
 * Flip a boolean attribute on a Part via the Edit modal. Convenience wrapper over
 * editPartViaUi.
 */
export async function togglePartAttributeViaUi(
  page: Page,
  partPk: number,
  fieldName: string,
): Promise<Response> {
  return editPartViaUi(page, partPk, async (p) => {
    await toggleBooleanField(p, fieldName);
  });
}

/**
 * Delete a Part via the UI chain. Because InvenTree rejects DELETE on active parts
 * (see `docs/qa/bugs/INV-PARTS-001-delete-active-part.md`), the caller is responsible
 * for deactivating the part first and reloading the page before calling this recipe.
 *
 *   gotoPartDetail(pk) → openPartActionsMenu → clickPartActionDelete → confirmDialog
 *   → returns the DELETE response
 */
export async function deleteInactivePartViaUi(
  page: Page,
  partPk: number,
): Promise<Response> {
  await gotoPartDetail(page, partPk);
  await openPartActionsMenu(page);
  await clickPartActionDelete(page);
  // Confirm modal opens — install the listener before the click.
  const [response] = await Promise.all([
    page.waitForResponse(
      (r) => r.request().method() === 'DELETE' && /\/api\/part\/\d+\/?$/.test(r.url()),
      { timeout: 10_000 },
    ),
    confirmDialog(page),
  ]);
  return response;
}

// ── CATEGORY recipes ──────────────────────────────────────────────────

/**
 * Create a Part Category via the UI chain
 *   gotoSubcategoriesPanel → clickAddPartCategoryButton → fill name → submit
 */
export async function createCategoryViaUi(
  page: Page,
  args: { name: string },
): Promise<Response> {
  await gotoSubcategoriesPanel(page);
  await clickAddPartCategoryButton(page);
  await fillNameField(page, args.name);
  return submitAndWaitForResponse(page, /^POST$/, /\/api\/part\/category\/$/);
}

/**
 * Rename an existing Part Category via the UI chain
 *   gotoCategoryDetail(pk) → openCategoryActionsMenu → clickCategoryActionEdit
 *   → fill name → submit
 */
export async function renameCategoryViaUi(
  page: Page,
  categoryPk: number,
  newName: string,
): Promise<Response> {
  await gotoCategoryDetail(page, categoryPk);
  await openCategoryActionsMenu(page);
  await clickCategoryActionEdit(page);
  await fillNameField(page, newName);
  return submitAndWaitForResponse(page, /^PATCH$/, /\/api\/part\/category\/\d+\/?$/);
}

/**
 * Delete an existing Part Category via the UI chain
 *   gotoCategoryDetail(pk) → openCategoryActionsMenu → clickCategoryActionDelete
 *   → confirm dialog
 */
export async function deleteCategoryViaUi(
  page: Page,
  categoryPk: number,
): Promise<Response> {
  await gotoCategoryDetail(page, categoryPk);
  await openCategoryActionsMenu(page);
  await clickCategoryActionDelete(page);
  const [response] = await Promise.all([
    page.waitForResponse(
      (r) =>
        r.request().method() === 'DELETE' && /\/api\/part\/category\/\d+\/?$/.test(r.url()),
      { timeout: 10_000 },
    ),
    confirmDialog(page),
  ]);
  return response;
}
