import type { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  get hamburgerMenu(): Locator {
    return this.page.getByLabel('navigation-menu');
  }

  get globalSearchButton(): Locator {
    return this.page.getByLabel('open-search');
  }

  get spotlightButton(): Locator {
    return this.page.getByLabel('open-spotlight');
  }

  get notifications(): Locator {
    return this.page.getByLabel('open-notifications');
  }

  /** A single breadcrumb segment by visible slug, e.g. 'parts'. */
  breadcrumbSegment(slug: string): Locator {
    return this.page.locator(`[aria-label^="breadcrumb-"][aria-label$="-${slug}"]`);
  }
}
