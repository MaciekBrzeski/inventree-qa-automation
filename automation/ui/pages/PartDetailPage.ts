import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PartDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async gotoById(pk: number): Promise<void> {
    await this.page.goto(`/web/part/${pk}`);
    await this.page.waitForLoadState('networkidle');
  }

  get openInAdminButton(): Locator {
    return this.page.getByLabel('action-button-open-in-admin-interface');
  }

  get subscribeButton(): Locator {
    return this.page.getByLabel('action-button-subscribe-to-notifications');
  }

  get barcodeActionsMenu(): Locator {
    return this.page.getByLabel('action-menu-barcode-actions');
  }

  async expectTitleContains(substring: string): Promise<void> {
    await this.page.waitForFunction(
      (s) => document.title.includes(s),
      substring,
      { timeout: 10_000 },
    );
  }
}
