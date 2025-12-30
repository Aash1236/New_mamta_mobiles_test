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
    await this.cartIcon.click();
  }
}