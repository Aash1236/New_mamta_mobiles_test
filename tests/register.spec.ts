import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage} from './pages/RegisterPage';
import { registerScenarios } from './data/registerData';
import dotenv from 'dotenv';

//load environment variables from .env file
dotenv.config();

test.describe('Register Regression Suigte', () => {
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
                //success
                await expect(page).not.toHaveURL(/.*signup/);
            } else if (data.isHtml5Check) {
                const emailField = registerPage.emailInput;
                const isInvalid = await emailField.evaluate((e: HTMLInputElement) => !e.checkValidity());
                expect(isInvalid).toBe(true);
            }else {
                //failure
                //await expect(registerPage.errorMessage.first()).toBeVisible();
                //await expect(registerPage.errorMessage.first()).toContainText(data.expectedError);
                await expect(page.getByText(data.expectedError)).toBeVisible({ timeout: 10000 });
            }
        });
    }
});