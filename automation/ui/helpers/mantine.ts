import type { Page, Locator } from '@playwright/test';

/**
 * Fill a Mantine `related-field-*` combobox by typing a search string and picking the first
 * option that matches. InvenTree uses this pattern for every foreign-key form field.
 */
export async function fillRelatedField(
  page: Page,
  fieldName: string,
  searchText: string,
): Promise<void> {
  const combo = page.getByLabel(`related-field-${fieldName}`).first();
  await combo.waitFor({ state: 'visible', timeout: 10_000 });
  await combo.click();
  await combo.fill(searchText);
  await page.waitForTimeout(500); // Mantine async search debounce
  // Options render with role="option" in a Mantine-Combobox popover.
  const opt = page.getByRole('option').first();
  await opt.waitFor({ state: 'visible', timeout: 5000 });
  await opt.click();
}

/**
 * Fill a Mantine `text-field-*` input by name.
 */
export async function fillTextField(page: Page, fieldName: string, value: string): Promise<void> {
  const f = page.getByLabel(`text-field-${fieldName}`).first();
  await f.waitFor({ state: 'visible', timeout: 5000 });
  await f.fill(value);
}

/**
 * Fill a Mantine `number-field-*` input by name.
 */
export async function fillNumberField(
  page: Page,
  fieldName: string,
  value: number | string,
): Promise<void> {
  const f = page.getByLabel(`number-field-${fieldName}`).first();
  await f.waitFor({ state: 'visible', timeout: 5000 });
  await f.fill(String(value));
}

/**
 * Click the canonical form submit button inside a Mantine modal.
 */
export function submitButton(page: Page): Locator {
  return page.getByRole('button', { name: 'Submit' }).first();
}
