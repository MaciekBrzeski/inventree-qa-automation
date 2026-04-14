import { test, expect } from '../fixtures/auth';

test.describe('UI-LOGIN-NEG login negative paths', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('UI-LOGIN-NEG-001 wrong password does not authenticate', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.usernameInput.fill('admin');
    await loginPage.passwordInput.fill('wrong-password-xyz');
    await loginPage.submitButton.click();
    const navAppeared = await loginPage.hamburgerMenu
      .waitFor({ state: 'visible', timeout: 4000 })
      .then(() => true)
      .catch(() => false);
    expect(navAppeared).toBe(false);
    await expect(loginPage.usernameInput).toBeVisible();
  });

  test('UI-LOGIN-NEG-002 username with empty password does not authenticate', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.usernameInput.fill('admin');
    await loginPage.passwordInput.fill('');
    await loginPage.submitButton.click();
    await expect(loginPage.usernameInput).toBeVisible();
  });

  test('UI-LOGIN-NEG-003 blank form click does not authenticate', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.submitButton.click();
    await expect(loginPage.usernameInput).toBeVisible();
  });
});
