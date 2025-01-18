import { Page } from 'playwright';

export class LoginPage {
    constructor(private page: Page) { }

    private rememberMeCheckboxSelector = '#RememberMe';// Selector for the Remember Me checkbox
    private accountLinkSelector = 'a.account'; // Selector for the element displayed after login

    async navigateToLoginPage() {
        await this.page.goto('https://demowebshop.tricentis.com/login');
    }

    async fillLoginForm(email: string, password: string) {
        await this.page.fill('#Email', email);
        await this.page.waitForTimeout(1000);
        await this.page.fill('#Password', password);
        await this.page.waitForTimeout(1000);
    }

    async withRememberMe() {
        await this.page.click(this.rememberMeCheckboxSelector);
    }

    async login() {
        const loginButtonXPath = `//input[@class='button-1 login-button' and @type='submit' and @value='Log in']`;
        await this.page.click(loginButtonXPath);
    }

    async validateLoginSuccess(expectedEmail: string) {
        // Wait for the account link to appear
        await this.page.waitForSelector(this.accountLinkSelector, { timeout: 5000 });
        const actualEmail = await this.page.textContent(this.accountLinkSelector);
        if (actualEmail !== expectedEmail) {
            throw new Error(`Login validation failed! Expected: ${expectedEmail}, but got: ${actualEmail}`);
        }
    }

    // Validate Remember Me checkbox state
    async validateRememberMe(isExpectedChecked: boolean) {
        const isChecked = await this.page.isChecked(this.rememberMeCheckboxSelector);
        if (isChecked !== isExpectedChecked) {
            throw new Error(`Remember Me validation failed! Expected checked: ${isExpectedChecked}, but got: ${isChecked}`);
        }
        console.log(`Remember Me checkbox state is as expected: ${isExpectedChecked ? 'checked' : 'unchecked'}`);
    }

    async validateEmptyLoginDetails(expectedMessage: string) {
        // Wait for the error message to appear
        const errorSelector = '.validation-summary-errors span';
        await this.page.waitForSelector(errorSelector, { timeout: 5000 });

        // Get the text content of the error message
        const actualMessage = await this.page.textContent(errorSelector);

        // Validate the message
        if (actualMessage?.trim() !== expectedMessage.trim()) {
            throw new Error(`Login validation failed! Expected: "${expectedMessage}", but got: "${actualMessage}"`);
        }
    }

    async clickForgotPassword() {
        await this.page.click('a[href="/passwordrecovery"]');
    }

    async enterEmail(email: string) {
        await this.page.fill('#Email', email);
    }

    async clickRecoverButton() {
        await this.page.click('input[name="send-email"]');
    }

    async validateRecoveryMessage() {
        // Wait for the element with the class 'result' to appear
        await this.page.waitForSelector('.result', { timeout: 5000 });

        // Retrieve the text content of the result message
        const resultMessage = await this.page.textContent('.result');

        // Validate the message content
        if (resultMessage?.trim() !== 'Email with instructions has been sent to you.') {
            throw new Error(
                `Validation failed! Expected: "Email with instructions has been sent to you.", but got: "${resultMessage?.trim()}"`
            );
        }
    }


}