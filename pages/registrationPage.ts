import { Page } from 'playwright';

export class RegistrationPage {
  constructor(private page: Page) { }

  async navigateToRegistrationPage() {
    await this.page.goto('https://demowebshop.tricentis.com/register');
  }

  async fillRegistrationForm(firstName: string, lastName: string, email: string, password: string, gender: 'M' | 'F') {
    if (gender === 'M') {
      await this.page.click('#gender-male');
    } else if (gender === 'F') {
      await this.page.click('#gender-female');
    }

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

  async validatePasswordMismatchError(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, gender: 'M' | 'F') {
    // Select gender radio button
    if (gender === 'M') {
      await this.page.click('#gender-male');
    } else if (gender === 'F') {
      await this.page.click('#gender-female');
    }

    // Fill the form with mismatching passwords
    await this.page.fill('#FirstName', firstName);
    await this.page.fill('#LastName', lastName);
    await this.page.fill('#Email', email);
    await this.page.fill('#Password', password);
    await this.page.fill('#ConfirmPassword', confirmPassword);
  }

  async validatePasswordMismatchErrorMessage() {
    // Selector for the error message
    const errorSelector = 'span[for="ConfirmPassword"]';

    // Wait for the error message to appear
    await this.page.waitForSelector(errorSelector, { timeout: 5000 });

    // Retrieve the text content of the error message
    const errorMessage = await this.page.textContent(errorSelector);

    // Validate the error message text
    if (errorMessage?.trim() !== 'The password and confirmation password do not match.') {
      throw new Error(`Validation failed! Expected: "The password and confirmation password do not match.", but got: "${errorMessage?.trim()}"`);
    }
  }


}
