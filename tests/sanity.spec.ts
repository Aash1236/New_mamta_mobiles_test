import {test, expect} from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import dotenv from 'dotenv';

//load environment variables from .env file
dotenv.config();

test.describe('Sanity Suite - New Mamta Mobiles', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({page}) => {
        //initialize page objects
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        // Navigate to home page
        await homePage.navigate();
        // Handle advertisement popup if it appears
        await homePage.handleAdvertisement();
    });

    test('End-to-End Purchase Flow', async ({page}) => {
        //1.login
        console.log('Loggin in');
        await homePage.goToLoginPage();
        await loginPage.login(process.env.LOGIN_USER!, process.env.LOGIN_PASS!);

        //2. Select first product
        console.log('Selecting first product');
        await homePage.selectFirstProduct();

        //3. Add to cart
        console.log('Adding product to cart');
        await productPage.addToCart();
        await productPage.goToCart();

        //4. Proceed to checkout
        console.log('Proceeding to checkout');
        await cartPage.proceedToCheckout();

        //5. Place order
        console.log('Placing order');
        await checkoutPage.fillDetailsAndOrder();
    });

})