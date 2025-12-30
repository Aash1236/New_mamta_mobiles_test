import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage} from './pages/RegisterPage';
import { registerScenarios } from './data/registerData';
import dotenv from 'dotenv';

//load environment variables from .env file
dotenv.config();

test.describe('Register Regression Suite', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let registerPage: RegisterPage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);

        //1 Open Home page
        await homePage.navigate();
        //2 Handle advertisement popup if it appears
        await homePage.handleAdvertisement();
        //3 Go to login page
        await homePage.goToLoginPage();
        //4 go to sign up page
        await loginPage.goToSignUp();
    });

    for (const data of registerScenarios) {
        test(`${data.id}: ${data.description}`, async ({ page }) => {
            console.log(`Executing: ${data.id}`);

            //registration
            await registerPage.register(data.name, data.email, data.password);

            //assertions
            if (data.shouldPass) {
        await expect(page).not.toHaveURL(/.*signup/);
      
      } else if (data.isHtml5Check) {
        // FIX: Dynamically select the field based on data.checkField
        let fieldToValidate;
        
        if (data.checkField === 'name') {
            fieldToValidate = registerPage.fullNameInput;
        } else if (data.checkField === 'password') {
            fieldToValidate = registerPage.passwordInput;
        } else {
            // Default to email
            
            fieldToValidate = registerPage.emailInput;
        }

        // Check validity of the SELECTED field
        const isInvalid = await fieldToValidate.evaluate((e: HTMLInputElement) => !e.checkValidity());
        expect(isInvalid, `Expected ${data.checkField} to be invalid`).toBe(true);

      } else {
        await expect(page.getByText(data.expectedError).first()).toBeVisible({ timeout: 10000 });
      }
        });
    }
});