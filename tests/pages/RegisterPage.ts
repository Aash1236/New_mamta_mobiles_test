import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator
    readonly signUpButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fullNameInput = page.getByRole('textbox', { name: 'Full Name' });
        this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signUpButton = page.getByRole('button', { name: 'Sign Up' });
        this.errorMessage = page.locator('.error-message, .text-red-500, div[role="alert"]');
    }

    async register(name: string, email: string, pass: string) {
        if (name) await this.fullNameInput.fill(name);
        if (email) await this.emailInput.fill(email);
        if (pass) await this.passwordInput.fill(pass);
        await this.signUpButton.click();
    }
}