import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutBtn: Locator;
  
  // Dynamic Locators
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly plusBtn: Locator;
  readonly quantityDisplay: Locator;
  readonly totalDisplay: Locator;
  readonly deleteBtn: Locator;
  readonly emptyMessage: Locator;
  readonly deleteToast: Locator;
  
  // User Menu Locators
  readonly userProfileIcon: Locator;
  readonly logoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // 1. Checkout Button
    this.checkoutBtn = page.getByRole('button', { name: 'Proceed to Checkout' });

    // 2. Product Details
    this.productName = page.locator('h3:has-text("Samsung Galaxy S25 Ultra")').first();
    
    // FIX: Locator specifically for the Unit Price (ignoring the Total/Tax)
    // We look for the text '141,999' anywhere, then narrow down to the element
    this.productPrice = page.locator('*:has-text("141,999")').first();

    // 3. Quantity Controls
    // Locator finds the SVG icon for Plus
    this.plusBtn = page.locator(".lucide.lucide-plus.w-3.h-3").first();
    this.quantityDisplay = page.locator('span').filter({ hasText: /^\d+$/ }).first(); 
    this.totalDisplay = page.locator('text=Total').locator('xpath=following-sibling::*').first();

    // 4. Remove Item
    // Locator finds the SVG icon for Trash
    this.deleteBtn = page.locator(".lucide.lucide-trash2.lucide-trash-2.w-4.h-4").first();
    this.emptyMessage = page.getByText('Your cart is empty');
    this.deleteToast = page.getByText('Item removed from cart').first();

    // 5. User Menu
    this.userProfileIcon = page.locator("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > svg:nth-child(2)");
    //this.logoutBtn = page.getByRole('button', { name: 'Log Out' });
    this.logoutBtn = page.getByText(/Log\s?out/i).first();
  }

  // --- ACTIONS ---

  async proceedToCheckout() {
    console.log('Waiting for "Proceed to Checkout" button...');
    await this.checkoutBtn.waitFor({ state: 'visible', timeout: 10000 });
    // JS Click for Drawer Button
    await this.checkoutBtn.evaluate((btn) => (btn as HTMLElement).click());
    await this.page.waitForURL(/.*checkout/, { timeout: 15000 });
  }

  async increaseQuantity() {
    console.log('Clicking (+) button via JS Dispatch...');
    // FIX: dispatchEvent works on SVGs where .click() fails
    await this.plusBtn.evaluate((btn) => btn.dispatchEvent(new MouseEvent('click', { bubbles: true })));
    
    // Wait for price update
    await this.page.waitForTimeout(2000); 
  }

  async getQuantity() {
    return await this.quantityDisplay.innerText();
  }

  async getTotalPrice() {
    return await this.totalDisplay.innerText();
  }

  async removeItem() {
    console.log('Clicking Delete button via JS Dispatch...');
    // FIX: dispatchEvent works on SVGs where .click() fails
    await this.deleteBtn.evaluate((btn) => btn.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  }

  async logout() {
    console.log('Reloading page to close drawers...');
    await this.page.reload(); 
    await this.page.waitForLoadState('domcontentloaded');
    
    console.log('Clicking Profile Icon...');
    await this.userProfileIcon.waitFor({ state: 'visible' });
    
    // FIX: Force click to ensure menu opens
    await this.userProfileIcon.click({ force: true });
    await this.page.waitForTimeout(500); // Small animation wait
    
    console.log('Clicking Logout...');
    await this.logoutBtn.waitFor({ state: 'visible' });
    await this.logoutBtn.click();
  }
}