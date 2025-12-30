import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }
}