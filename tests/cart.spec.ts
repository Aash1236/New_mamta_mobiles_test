import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { cartScenarios } from './data/cartData';
import dotenv from 'dotenv';

//load environment variables from .env file
dotenv.config();

test.describe('Cart & Checkout Regression Suite', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        await homePage.navigate();
        await homePage.handleAdvertisement();

        await homePage.goToLoginPage();
        await loginPage.login(process.env.LOGIN_USER!, process.env.LOGIN_PASS!);
    });

    test('TC_CART_001: Verify Product Details', async ({ page }) => {
        await homePage.selectFirstProduct();
        await productPage.addToCart();
        await productPage.goToCart();

        const data = cartScenarios[0];
        await expect(cartPage.productName).toContainText(data.productName!);
        await expect(cartPage.productPrice).toBeVisible();
        await expect(cartPage.productPrice).toContainText(data.unitPrice!);
    });

    test('TC_CART_002: Verify Quantity Update Math', async ({ page }) => {
        const data = cartScenarios[0];

        await homePage.selectFirstProduct();
        await productPage.addToCart();
        await productPage.goToCart();   
        await cartPage.increaseQuantity();

        await expect(page.locator('span').filter({ hasText: '2' }).first()).toBeVisible();

    })

    test('TC_CART_003: Verify Remove Item', async ({ page }) => {
        await homePage.selectFirstProduct();
        await productPage.addToCart();
        await productPage.goToCart();
        await cartPage.removeItem();

        await expect(cartPage.deleteToast).toBeVisible();
        await expect(cartPage.emptyMessage).toBeVisible()
    })

    test('TC_CART_004: Cart Persistence', async ({ page }) => {
    await homePage.selectFirstProduct();
    await productPage.addToCart();
    
    await cartPage.logout();
    
    await homePage.goToLoginPage();
    await loginPage.login(process.env.LOGIN_USER!, process.env.LOGIN_PASS!);
    
    //const headerCartBtn = page.locator('button:has(img[alt*="Cart"]), button:has(svg)').last();
    //await headerCartBtn.click();
    await productPage.goToCart();


    await expect(cartPage.productName).toBeVisible();
  });

  test('TC_CART_005: Checkout Navigation', async ({ page }) => {
    await homePage.selectFirstProduct();
    await productPage.addToCart();
    await productPage.goToCart();

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/.*checkout/);
  });

  // --- BUGGY / FAILED MANUAL SCENARIOS (Skipped) ---
  /*
  test('TC_CART_006: Max Quantity Validation', async ({ page }) => {
    // SKIPPED: Manual testing revealed the system allows infinite items.
    // Uncomment this when the bug is fixed.
    await homePage.selectFirstProduct();
    await productPage.addToCart();
    await productPage.goToCart();
    
    // Logic to add 100 items...
    // await expect(page.getByText('Out of stock')).toBeVisible();
  });
  */
})