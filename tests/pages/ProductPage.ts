import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartBtn: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart' });
    this.cartIcon = page.locator('.relative.cursor-pointer svg').first();
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async goToCart() {
    // FIX: Check if "Checkout" button is ALREADY visible (meaning drawer is open)
    const isCartOpen = await this.page.getByRole('button', { name: 'Checkout' }).isVisible();
    
    if (!isCartOpen) {
        // Only click icon if the drawer is NOT open
        console.log('Cart drawer closed, clicking icon...');
        await this.cartIcon.click();
    } else {
        console.log('Cart drawer already open, skipping click.');
    }
  }
}