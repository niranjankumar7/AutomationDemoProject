import { Page } from 'playwright';

const TIMEOUT = 5000;

export class RegistrationPage {
  constructor(private page: Page) { }

  // Navigate to the registration page
  async navigateToRegistrationPage() {
    console.log('Navigating to the registration page...');
    await this.page.goto('https://demowebshop.tricentis.com/register');
  }

  // Fill the registration form
  async fillRegistrationForm(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    gender: 'M' | 'F'
  ) {
    console.log(`Filling registration form for ${firstName} ${lastName} with email: ${email}`);

    // Select gender radio button
    if (gender === 'M') {
      await this.page.click('#gender-male');
    } else if (gender === 'F') {
      await this.page.click('#gender-female');
    }

    await this.page.fill('#FirstName', firstName);
    await this.page.fill('#LastName', lastName);
    await this.page.fill('#Email', email);
    await this.page.fill('#Password', password);
    await this.page.fill('#ConfirmPassword', password);
  }

  // Submit the registration form
  async submitForm() {
    console.log('Submitting the registration form...');
    await this.page.click('#register-button');
  }

  // Get success message after registration
  async getSuccessMessage(): Promise<string> {
    console.log('Getting the registration success message...');
    await this.page.waitForSelector('.result', { timeout: TIMEOUT });
    return (await this.page.textContent('.result'))?.trim() ?? '';
  }

  // Get error message for a specific field
  async getErrorMessage(selector: string): Promise<string> {
    console.log(`Getting the error message for selector: ${selector}`);
    await this.page.waitForSelector(selector, { timeout: TIMEOUT });
    return (await this.page.textContent(selector))?.trim() ?? '';
  }

  // Handle duplication error (if user already exists)
  async userDuplicationError(): Promise<string> {
    console.log('Checking for user duplication error...');
    await this.page.waitForSelector('li', { timeout: TIMEOUT });
    return (await this.page.textContent('li'))?.trim() ?? '';
  }

  // Validate password mismatch error
  async validatePasswordMismatchError(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    gender: 'M' | 'F'
  ) {
    console.log('Validating password mismatch error...');

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

  // Validate the password mismatch error message
  async validatePasswordMismatchErrorMessage() {
    console.log('Validating the password mismatch error message...');
    const errorSelector = 'span[for="ConfirmPassword"]';

    await this.page.waitForSelector(errorSelector, { timeout: TIMEOUT });
    const errorMessage = await this.page.textContent(errorSelector);

    if (errorMessage?.trim() !== 'The password and confirmation password do not match.') {
      throw new Error(
        `Validation failed! Expected: "The password and confirmation password do not match.", but got: "${errorMessage?.trim()}"`
      );
    }
  }
}
