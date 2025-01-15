import { Page } from 'playwright';

export class RegistrationPage {
  constructor(private page: Page) { }

  async navigateToRegistrationPage() {
    await this.page.goto('https://demowebshop.tricentis.com/register');
  }

  async fillRegistrationForm(firstName: string, lastName: string, email: string, password: string) {
    await this.page.fill('#FirstName', firstName);
    await this.page.waitForTimeout(1000);
    await this.page.fill('#LastName', lastName);
    await this.page.fill('#Email', email);
    await this.page.waitForTimeout(1000);
    await this.page.fill('#Password', password);
    await this.page.waitForTimeout(1000);
    await this.page.fill('#ConfirmPassword', password);
  }

  async submitForm() {
    await this.page.click('#register-button');
  }

  async getSuccessMessage(): Promise<string> {
    return (await this.page.textContent('.result')) ?? '';
  }

  async getErrorMessage(): Promise<string> {
    return (await this.page.textContent('.field-validation-error')) ?? '';
  }

  async userDuplicationError(): Promise<string> {
    return (await this.page.textContent('li')) ?? '';
  }
}
