"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const registrationPage_1 = require("../pages/registrationPage");
test_1.test.describe('User Registration Tests', () => {
    (0, test_1.test)('Successful User Registration', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const registrationPage = new registrationPage_1.RegistrationPage(page);
        yield registrationPage.navigateToRegistrationPage();
        yield registrationPage.fillRegistrationForm('John', 'Doe', 'john.doe@example.com', 'password123');
        yield registrationPage.submitForm();
        const successMessage = yield registrationPage.getSuccessMessage();
        (0, test_1.expect)(successMessage).toContain('Your registration completed');
    }));
    (0, test_1.test)('Registration with Invalid Email', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const registrationPage = new registrationPage_1.RegistrationPage(page);
        yield registrationPage.navigateToRegistrationPage();
        yield registrationPage.fillRegistrationForm('John', 'Doe', 'invalid-email', 'password123');
        yield registrationPage.submitForm();
        const errorMessage = yield registrationPage.getErrorMessage();
        (0, test_1.expect)(errorMessage).toContain('Invalid email address.');
    }));
    (0, test_1.test)('Duplicate User Registration', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const registrationPage = new registrationPage_1.RegistrationPage(page);
        yield registrationPage.navigateToRegistrationPage();
        yield registrationPage.fillRegistrationForm('John', 'Doe', 'existing.email@example.com', 'password123');
        yield registrationPage.submitForm();
        const errorMessage = yield registrationPage.getErrorMessage();
        (0, test_1.expect)(errorMessage).toContain('Email already exists.');
    }));
});
