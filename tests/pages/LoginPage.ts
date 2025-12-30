import {Page, Locator, expect} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;    
        this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: 'Log In' });
        this.signUpButton = page.getByRole('button', { name: 'Sign Up' })
    }

    async login(email: string, pass: string){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(pass);
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
    }
    //Signup navigation method
    async goToSignUp() {
        await this.signUpButton.click();
    }
}