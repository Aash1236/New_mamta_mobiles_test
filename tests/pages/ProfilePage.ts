import { Page, Locator, expect } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  
  // Header Icons
  readonly profileIcon: Locator;

  // Profile Menu Static Elements
  readonly myAccountHeader: Locator;
  readonly logoutBtn: Locator;
  readonly adminPanelBtn: Locator;

  // Order Section Elements
  readonly orderItem: Locator;
  readonly viewDetailsBtn: Locator;
  readonly closeDetailsPopupBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // 1. Header Navigation
    this.profileIcon = page.locator("body > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > svg:nth-child(2)");
    
    // 2. Profile Menu Headers
    this.myAccountHeader = page.getByRole('heading', { name: 'My Account' });
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });
    this.adminPanelBtn = page.getByRole('button', { name: 'Admin Panel' });

    // 3. Order History
    // Using the specific CSS path you provided
    this.orderItem = page.locator("body > div:nth-child(8) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)");
    this.viewDetailsBtn = page.locator('button').filter({ hasText: 'View Full Details' }).first();
    this.closeDetailsPopupBtn = page.locator(".lucide.lucide-x.w-6.h-6.text-gray-500");
  }

  // --- Dynamic Locators (Methods) ---
  
  // Finds the "Hello, Name" text dynamically
  getUserGreeting(fullName: string): Locator {
    return this.page.getByText(`Hello, ${fullName}`, { exact: true });
  }

  // Finds the Email text dynamically
  getUserEmail(email: string): Locator {
    return this.page.getByText(email, { exact: true });
  }

  // --- Actions ---

  async openProfileMenu() {
    console.log('Opening Profile Menu...');
    await this.profileIcon.waitFor({ state: 'visible' });
    await this.profileIcon.click();
    
    // Wait for "My Account" to confirm menu is open
    await this.myAccountHeader.waitFor({ state: 'visible' });
  }

  async viewOrderDetails() {
    console.log('Clicking View Full Details...');
    await this.viewDetailsBtn.click();
    // Wait for close button to appear (proof that popup opened)
    await this.closeDetailsPopupBtn.waitFor({ state: 'visible' });
  }

  async closeOrderPopup() {
    console.log('Closing Order Popup...');
    await this.closeDetailsPopupBtn.click();
  }
}