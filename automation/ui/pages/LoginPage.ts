import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get usernameInput(): Locator {
    return this.page.getByLabel('login-username');
  }

  get passwordInput(): Locator {
    return this.page.getByLabel('login-password');
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Log In' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.usernameInput.waitFor({ state: 'visible' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    // Wait for the nav bar to appear — proves login succeeded.
    await this.hamburgerMenu.waitFor({ state: 'visible', timeout: 15_000 });
  }
}
