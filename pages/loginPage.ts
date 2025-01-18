import { Page, expect } from '@playwright/test';

const TIMEOUT = 5000;

export class LoginPage {
    constructor(private page: Page) { }

    // Locators
    private readonly rememberMeCheckboxSelector = '#RememberMe';
    private readonly accountLinkSelector = 'a.account';
    private readonly emailSelector = '#Email';
    private readonly passwordSelector = '#Password';
    private readonly errorSelector = '.validation-summary-errors span';
    private readonly recoveryMessageSelector = '.result';
    private readonly forgotPasswordLink = 'a[href="/passwordrecovery"]';
    private readonly recoverButtonSelector = 'input[name="send-email"]';
    private readonly loginButtonSelector = `//input[@class='button-1 login-button' and @type='submit' and @value='Log in']`;

    // Navigate to Login Page
    async navigateToLoginPage() {
        console.log('Navigating to the login page...');
        await this.page.goto('https://demowebshop.tricentis.com/login');
    }

    // Fill the login form
    async fillLoginForm(email: string, password: string) {
        console.log(`Filling login form with email: ${email}`);
        await this.page.fill(this.emailSelector, email);
        await this.page.fill(this.passwordSelector, password);
    }

    // Toggle "Remember Me" checkbox
    async withRememberMe() {
        console.log('Toggling "Remember Me" checkbox...');
        await this.page.locator(this.rememberMeCheckboxSelector).click();
    }

    // Click the login button
    async login() {
        console.log('Clicking the login button...');
        await this.page.locator(this.loginButtonSelector).click();
    }

    // Validate login success
    async validateLoginSuccess(expectedEmail: string) {
        console.log('Validating successful login...');
        await this.page.waitForSelector(this.accountLinkSelector, { timeout: TIMEOUT });
        const actualEmail = await this.page.textContent(this.accountLinkSelector);

        if (actualEmail?.trim() !== expectedEmail.trim()) {
            throw new Error(`Login validation failed! Expected: ${expectedEmail}, but got: ${actualEmail}`);
        }
    }

    // Validate "Remember Me" checkbox state
    async validateRememberMe(isExpectedChecked: boolean) {
        console.log(`Validating "Remember Me" checkbox is ${isExpectedChecked ? 'checked' : 'unchecked'}...`);
        const isChecked = await this.page.locator(this.rememberMeCheckboxSelector).isChecked();
        expect(isChecked).toBe(isExpectedChecked); // Removed custom error message
    }

    // Validate empty login form submission error
    async validateEmptyLoginDetails(expectedMessage: string) {
        console.log('Validating error message for empty login details...');
        await this.page.waitForSelector(this.errorSelector, { timeout: TIMEOUT });
        const actualMessage = await this.page.textContent(this.errorSelector);

        if (actualMessage?.trim() !== expectedMessage.trim()) {
            throw new Error(`Error message mismatch! Expected: "${expectedMessage}", but got: "${actualMessage}"`);
        }
    }

    // Click "Forgot Password" link
    async clickForgotPassword() {
        console.log('Clicking "Forgot Password" link...');
        await this.page.locator(this.forgotPasswordLink).click();
    }

    // Enter email in the recovery form
    async enterEmail(email: string) {
        console.log(`Entering email: ${email} in recovery form...`);
        await this.page.fill(this.emailSelector, email);
    }

    // Click "Recover" button
    async clickRecoverButton() {
        console.log('Clicking "Recover" button...');
        await this.page.locator(this.recoverButtonSelector).click();
    }

    // Validate recovery success message
    async validateRecoveryMessage() {
        console.log('Validating recovery success message...');
        await this.page.waitForSelector(this.recoveryMessageSelector, { timeout: TIMEOUT });
        const resultMessage = await this.page.textContent(this.recoveryMessageSelector);

        if (resultMessage?.trim() !== 'Email with instructions has been sent to you.') {
            throw new Error(`Recovery message mismatch! Expected: "Email with instructions has been sent to you.", but got: "${resultMessage}"`);
        }
    }

    // Utility: Check if an element is visible
    private async isVisible(selector: string): Promise<boolean> {
        console.log(`Checking visibility of element: ${selector}`);
        return await this.page.locator(selector).isVisible({ timeout: TIMEOUT });
    }
}
