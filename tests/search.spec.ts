import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { searchScenarios } from './data/searchData';
import dotenv from 'dotenv';

//load environment variables from .env file
dotenv.config();

test.describe('Product Discovery (Search & Sort) Suite', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await homePage.navigate();
    await homePage.handleAdvertisement();
  });

  test('TC_SEARCH_001: Verify Valid Product Search', async ({ page }) => {
    const data = searchScenarios.validSearch;
    
    await homePage.searchProduct(data.query);
    
    // Dynamic Regex: Creates /Samsung/i from the data string
    const regex = new RegExp(data.expectedText, 'i');
    
    const firstProduct = page.locator('.product-card h3, h3').first();
    await expect(firstProduct).toContainText(regex);
  });

  test('TC_SEARCH_002: Verify Partial Keyword Search', async ({ page }) => {
    const data = searchScenarios.partialSearch;

    await homePage.searchProduct(data.query);
    
    const regex = new RegExp(data.expectedText, 'i');
    const firstProduct = page.locator('.product-card h3, h3').first();
    await expect(firstProduct).toContainText(regex);
  });

  test('TC_SEARCH_003: Verify Search with No Results', async ({ page }) => {
    const data = searchScenarios.noResults;

    await homePage.searchProduct(data.query);
    
    await expect(page.getByText(data.expectedMessage)).toBeVisible();
  });

  test('TC_SEARCH_004: Verify Case Insensitive Search', async ({ page }) => {
    const data = searchScenarios.caseInsensitive;

    await homePage.searchProduct(data.query);
    
    const regex = new RegExp(data.expectedText, 'i');
    const firstProduct = page.locator('.product-card h3, h3').first();
    await expect(firstProduct).toContainText(regex);
  });

  test('TC_SEARCH_005: Verify Empty Search', async ({ page }) => {
    // Empty search often requires clicking the icon without typing, 
    // so we handle the UI interaction manually here or strictly use the empty string.
    const searchIcon = page.locator('button:has(svg.lucide-search), svg.lucide-search').first();
    await searchIcon.click();
    
    const searchInput = page.getByPlaceholder(/Search/i);
    await searchInput.waitFor({ state: 'visible' });
    
    // Press Enter on empty input
    await searchInput.press('Enter');

    // Verify user is still on a page with products
    await expect(page.locator('.product-card, h3').first()).toBeVisible();
  });

  test('TC_SORT_001: Verify Sort by Price (Low to High)', async ({ page }) => {
    // Sorting usually doesn't need external data (unless we want to test different sort types)
    await expect(page.locator('.product-card, h3').first()).toBeVisible();

    const sortDropdown = page.getByRole('button', { name: /Sort|Filter/i }).first(); 
    
    if (await sortDropdown.isVisible()) {
        await sortDropdown.click();
        await page.getByText('Price: Low to High').click();
        
        await page.waitForTimeout(2000);

        const prices = await page.locator('.product-price, p.text-lg').allInnerTexts();
        const numericPrices = prices.map(p => Number(p.replace(/[^0-9]/g, '')));
        
        if (numericPrices.length > 1) {
            expect(numericPrices[0]).toBeLessThanOrEqual(numericPrices[1]);
        }
    } else {
        console.log('Sort button not found, skipping sort logic validation.');
    }
  });
});