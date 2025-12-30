import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.getByRole('button', { name: 'Proceed to Checkout' });
  }

  async proceedToCheckout() {
    console.log('Waiting for "Proceed to Checkout" button...');
    // 1. Wait for it to exist in the DOM
    await this.checkoutBtn.waitFor({ state: 'visible', timeout: 10000 });
    
    // 2. FIX: Use .evaluate() to click via JavaScript
    // This bypasses the "Element is outside of the viewport" error completely
    await this.checkoutBtn.evaluate((btn) => (btn as HTMLElement).click());
    
    // 3. Wait for the page to navigate to Checkout
    await this.page.waitForURL(/.*checkout/, { timeout: 15000 });
    
    console.log('Navigation to Checkout successful');
  }
}
