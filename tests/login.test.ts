import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('User Login Tests', () => {
    test('Valid User logging in with Remember Me ticked', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();

        await loginPage.fillLoginForm('john11.doe@example.com', 'password123');
        // Tick the checkbox
        await loginPage.withRememberMe();
        // Validate that Remember Me is checked
        await loginPage.validateRememberMe(true);
        await loginPage.login();

        // Validation after login
        await loginPage.validateLoginSuccess('john11.doe@example.com');

    });

    test('Valid User logging in without Remember Me ticked', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();

        await loginPage.fillLoginForm('john11.doe@example.com', 'password123');
        // Validate that Remember Me is unchecked
        await loginPage.validateRememberMe(false);
        await loginPage.login();

        // Validation after login
        await loginPage.validateLoginSuccess('john11.doe@example.com');

    });
});
