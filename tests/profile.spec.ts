import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { CartPage } from './pages/CartPage'; // Reusing logout logic if needed
import dotenv from 'dotenv';

dotenv.config();

test.describe('User Profile & Roles Regression Suite', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let profilePage: ProfilePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
    cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.handleAdvertisement();
  });

  // --- SCENARIO 1: NORMAL USER ---
  test('TC_PROFILE_001 & 006: Verify Normal User Menu & Data Accuracy', async ({ page }) => {
    // 1. Setup Data (Ensure these exist in your .env)
    const normalUser = process.env.NORMAL_USER || 'testuser@example.com'; 
    const normalPass = process.env.NORMAL_PASS || 'Test@1234';
    const normalName = process.env.NORMAL_NAME || 'Test User'; // Full Name for verification

    // 2. Login
    await profilePage.profileIcon.click();
    await loginPage.login(normalUser, normalPass);

    // 3. Open Menu
    await profilePage.openProfileMenu();

    // 4. Verify Data (TC_PROFILE_006)
    await expect(profilePage.myAccountHeader).toBeVisible();
    await expect(profilePage.getUserGreeting(normalName)).toBeVisible();
    await expect(profilePage.getUserEmail(normalUser)).toBeVisible();

    // 5. Verify Role (TC_PROFILE_001)
    await expect(profilePage.logoutBtn).toBeVisible();
    await expect(profilePage.adminPanelBtn).not.toBeVisible(); // Normal user should NOT see Admin Panel
  });

  // --- SCENARIO 2: ADMIN USER ---
  test('TC_PROFILE_002 & 005: Verify Admin User Menu & Dashboard Navigation', async ({ page }) => {
    // 1. Setup Data (Admin)
    const adminUser = process.env.LOGIN_USER!; 
    const adminPass = process.env.LOGIN_PASS!;
    const adminName = 'Ashutosh Fase'; // Update this if your Admin name is different

    // 2. Login
    await profilePage.profileIcon.click();
    await loginPage.login(adminUser, adminPass);

    // 3. Open Menu
    await profilePage.openProfileMenu();

    // 4. Verify Data 
    await expect(profilePage.getUserGreeting(adminName)).toBeVisible();
    
    // 5. Verify Role (TC_PROFILE_002)
    await expect(profilePage.adminPanelBtn).toBeVisible(); // Admin MUST see this

    // 6. Verify Navigation (TC_PROFILE_005)
    await profilePage.adminPanelBtn.click();
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
  });

  // --- SCENARIO 3: ORDER HISTORY ---
  test('TC_PROFILE_003: Verify Order Tracking & Details', async ({ page }) => {
    // Login as Admin (assuming Admin has orders, or use Normal user)
    await profilePage.profileIcon.click();
    await loginPage.login(process.env.LOGIN_USER!, process.env.LOGIN_PASS!);

    // Note: User is redirected to Home after login.
    // If Order History is inside the Profile Menu, we open it:
    await profilePage.openProfileMenu();

    // Verify Order Item exists (using your specific locator)
    await expect(profilePage.orderItem).toBeVisible();

    // Open "View Full Details"
    await profilePage.viewOrderDetails();

    // Verify Popup Text (Optional Check)
    await expect(page.getByText('Order Details')).toBeVisible();

    // Close Popup
    await profilePage.closeOrderPopup();
  });

  // --- SCENARIO 4: LOGOUT ---
  test('TC_PROFILE_004: Verify Logout Functionality', async ({ page }) => {
    await profilePage.profileIcon.click();
    await loginPage.login(process.env.LOGIN_USER!, process.env.LOGIN_PASS!);

    // Reuse the robust logout logic we built in CartPage
    // (Or manual steps: Open Menu -> Click Logout -> Wait for Home)
    await cartPage.logout();

    // Verification: Try to access profile again, should ask for login
    await profilePage.profileIcon.click();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
  });

});