import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';

test.describe('User Registration Tests', () => {
  let registrationPage: RegistrationPage;

  // Common setup for each test
  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigateToRegistrationPage();
  });

  // Positive Scenario
  test('Successful User Registration', async () => {
    await registrationPage.fillRegistrationForm('John', 'Doe', 'john1aa1.doe@example.com', 'password123', 'M');
    await registrationPage.submitForm();

    const successMessage = await registrationPage.getSuccessMessage();
    expect(successMessage).toContain('Your registration completed');
  });

  // Negative Scenarios
  // Negative Scenarios
  test.describe('Negative Registration Scenarios', () => {
    test('Registration with Invalid Email', async () => {
      await registrationPage.fillRegistrationForm('John', 'Doe', 'invalid-email', 'password123', 'M');
      await registrationPage.submitForm();

      // Specify the selector for the invalid email error
      const errorMessage = await registrationPage.getErrorMessage('span[for="Email"]');
      expect(errorMessage).toContain('Wrong email');
    });
  });


  test('Duplicate User Registration', async () => {
    await registrationPage.fillRegistrationForm('John', 'Doe', 'existing.email@example.com', 'password123', 'M');
    await registrationPage.submitForm();

    const errorMessage = await registrationPage.userDuplicationError();
    expect(errorMessage).toContain('The specified email already exists');
  });

  test('User tries to register with mismatched password and confirm password', async () => {
    await registrationPage.validatePasswordMismatchError(
      'John',
      'Doe',
      'john.doe@example.com',
      'Password123',
      'DifferentPassword123',
      'M'
    );

    await registrationPage.submitForm();

    await registrationPage.validatePasswordMismatchErrorMessage();
  });
});
