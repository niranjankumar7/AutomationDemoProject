import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';

test.describe('User Registration Tests', () => {
  test('Successful User Registration', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToRegistrationPage();

    await registrationPage.fillRegistrationForm('John', 'Doe', 'john11.doe@example.com', 'password123');
    await registrationPage.submitForm();

    const successMessage = await registrationPage.getSuccessMessage();
    expect(successMessage).toContain('Your registration completed');
  });

  test('Registration with Invalid Email', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToRegistrationPage();

    await registrationPage.fillRegistrationForm('John', 'Doe', 'invalid-email', 'password123');
    await registrationPage.submitForm();

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain('Wrong email');
  });

  test('Duplicate User Registration', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToRegistrationPage();

    await registrationPage.fillRegistrationForm('John', 'Doe', 'existing.email@example.com', 'password123');
    await registrationPage.submitForm();

    const errorMessage = await registrationPage.userDuplicationError();
  });
});
