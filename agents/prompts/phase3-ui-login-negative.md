Generate the Playwright spec file `tests/login-negative.spec.ts` — negative paths for the login form.

Read the Context file first.

Scope (each test uses a fresh unauthenticated context via `test.describe` + `test.use({ storageState: { cookies: [], origins: [] } })`):

- `UI-LOGIN-NEG-001 wrong password shows an error` — fill username `admin`, password `wrong-password-xyz`, click Log In, assert the hamburger menu does **not** appear within 4 seconds (i.e. still on the login form). Use a short timeout `.waitFor({ state: 'visible', timeout: 4000 }).catch(() => null)` pattern to avoid long test time.
- `UI-LOGIN-NEG-002 username-only (empty password) does not authenticate` — fill username, leave password empty, click Log In, assert username input is still visible (still on login form).
- `UI-LOGIN-NEG-003 blank form click does not authenticate` — click Log In without filling anything, assert username input is still visible.

Rules:

- `test.describe('UI-LOGIN-NEG login negative paths', () => { test.use({ storageState: { cookies: [], origins: [] } }); ... })`.
- Use the `loginPage` fixture; call `await loginPage.goto()` in each test.
- Do **not** call `loginPage.login(...)` — that helper asserts on successful login. Interact with `loginPage.usernameInput`, `loginPage.passwordInput`, and `loginPage.submitButton` directly.
- Assertions via `await expect(loginPage.usernameInput).toBeVisible()` and similar.
- **Never** use `page.waitForTimeout`. Use `Locator.waitFor({timeout: ...}).catch(() => null)` for negative visibility checks.

Output: only the TypeScript file, compile-ready, no prose, no fences.
