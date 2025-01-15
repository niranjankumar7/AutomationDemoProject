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
exports.RegistrationPage = void 0;
class RegistrationPage {
    constructor(page) {
        this.page = page;
    }
    navigateToRegistrationPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto('https://demowebshop.tricentis.com/register');
        });
    }
    fillRegistrationForm(firstName, lastName, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.fill('#FirstName', firstName);
            yield this.page.fill('#LastName', lastName);
            yield this.page.fill('#Email', email);
            yield this.page.fill('#Password', password);
            yield this.page.fill('#ConfirmPassword', password);
        });
    }
    submitForm() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.click('#register-button');
        });
    }
    getSuccessMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = (yield this.page.textContent('.result'))) !== null && _a !== void 0 ? _a : '';
        });
    }
    getErrorMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return (_a = (yield this.page.textContent('.field-validation-error'))) !== null && _a !== void 0 ? _a : '';
        });
    }
}
exports.RegistrationPage = RegistrationPage;
