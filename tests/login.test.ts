import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('User Login Tests', () => {
    let loginPage: LoginPage;

    // Before each test, navigate to the login page
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
    });

    // Positive Login Scenarios
    test.describe('Positive Login Scenarios', () => {
        test('Valid User logging in with Remember Me ticked', async () => {
            await loginPage.fillLoginForm('john11.doe@example.com', 'password123');
            await loginPage.withRememberMe();
            await loginPage.validateRememberMe(true);
            await loginPage.login();
            await loginPage.validateLoginSuccess('john11.doe@example.com');
        });

        test('Valid User logging in without Remember Me ticked', async () => {
            await loginPage.fillLoginForm('john11.doe@example.com', 'password123');
            await loginPage.validateRememberMe(false);
            await loginPage.login();
            await loginPage.validateLoginSuccess('john11.doe@example.com');
        });

        test('User has forgotten the password and setting it up by forget password', async () => {
            await loginPage.clickForgotPassword();
            await loginPage.enterEmail('john11.doe@example.com');
            await loginPage.clickRecoverButton();
            await loginPage.validateRecoveryMessage();
        });
    });

    // Negative Login Scenarios
    test.describe('Negative Login Scenarios', () => {
        test('User tries to login without filling any details', async () => {
            await loginPage.login();
            await loginPage.validateEmptyLoginDetails('Login was unsuccessful. Please correct the errors and try again.');
        });

        test('User tries to login with invalid password', async () => {
            await loginPage.fillLoginForm('john11.doe@example.com', 'invalid123');
            await loginPage.login();
            await loginPage.validateEmptyLoginDetails('Login was unsuccessful. Please correct the errors and try again.');
        });

        test('User tries to login with invalid username', async () => {
            await loginPage.fillLoginForm('john11.invalid@example.com', 'password123');
            await loginPage.login();
            await loginPage.validateEmptyLoginDetails('Login was unsuccessful. Please correct the errors and try again.');
        });
    });
});
