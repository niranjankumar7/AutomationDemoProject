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

}