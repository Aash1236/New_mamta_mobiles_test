//Not yet integrated in main code
import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Perform the login steps once
  await page.goto('https://checklist-portal.com/login');
  await page.fill('#user', process.env.USERNAME!);
  await page.fill('#pass', process.env.PASSWORD!);
  await page.click('#submit');
  
  // Save the state (cookies and local storage)
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}
export default globalSetup;