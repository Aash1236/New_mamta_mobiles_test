import { Page, Locator } from '@playwright/test';


export class CheckoutPage {
  readonly page: Page;
  // Define inputs for Name, Address, etc.
  readonly placeOrderBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
  }

  async fillDetailsAndOrder() {
     // Fill dummy details here if form exists
     await this.placeOrderBtn.click();
  }
}