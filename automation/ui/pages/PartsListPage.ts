import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PartsListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/web/part');
    await this.page.waitForLoadState('networkidle');
  }

  get categoryPanel(): Locator {
    return this.page.getByLabel('partcategory');
  }

  /** Whatever rendered page title is present — InvenTree sets document title to "Parts". */
  async expectLoaded(): Promise<void> {
    await this.page.waitForFunction(() => document.title === 'Parts', { timeout: 10_000 });
  }
}
