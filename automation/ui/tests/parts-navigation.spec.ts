import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';

test.describe('UI-PARTS-NAV global navigation', () => {
  test.beforeEach(async ({ partsListPage }) => {
    await partsListPage.goto();
    await partsListPage.expectLoaded();
  });

  test('UI-PARTS-NAV-001 navigation menu button is visible on the authenticated shell', async ({
    page,
  }) => {
    const navMenu = page.getByLabel('navigation-menu');
    await expect(navMenu).toBeVisible();
  });

  test('UI-PARTS-NAV-002 top-level nav shows Dashboard, Parts, Stock, Manufacturing, Purchasing, Sales', async ({
    page,
  }) => {
    // Top-level nav lives inside the hamburger drawer. Open it first.
    await page.getByLabel('navigation-menu').click();
    for (const label of ['Dashboard', 'Parts', 'Stock', 'Manufacturing', 'Purchasing', 'Sales']) {
      await expect(page.getByRole('button', { name: label }).first()).toBeVisible({
        timeout: 5000,
      });
    }
  });

  test('UI-PARTS-NAV-003 breadcrumb action button is visible on parts list', async ({
    page,
  }) => {
    const breadcrumbAction = page.getByLabel('nav-breadcrumb-action');
    await expect(breadcrumbAction).toBeVisible();
  });

  test('UI-PARTS-NAV-004 global search button is reachable', async ({ page }) => {
    const searchButton = page.getByLabel('open-search');
    await expect(searchButton).toBeVisible();
    await searchButton.click();
    expect(page.url()).toContain('/web/part');
  });

  test('UI-PARTS-NAV-005 notifications button is visible', async ({ page }) => {
    const notificationsButton = page.getByLabel('open-notifications');
    await expect(notificationsButton).toBeVisible();
  });
});
