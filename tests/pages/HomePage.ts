import {Page, Locator, expect} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly loginLink: Locator;
    readonly firstProduct: Locator;
    readonly popupCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        //Locators
        this.loginLink = page.locator('body > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) > svg:nth-child(2)');
        this.firstProduct = page.locator('a[href*="/product/"]').first();
        this.popupCloseButton = page.getByRole('button', {name: 'No thanks'}); // Example locator for a popup close button
    }
    async navigate() {
        await this.page.goto(process.env.BASE_URL as string);
    }
    async handleAdvertisement() {
        try{
            console.log('Waiting for advertisement popup...');
            await this.popupCloseButton.waitFor({state: 'visible', timeout: 7000});
            await this.popupCloseButton.click();
            console.log('Advertisement popup closed.');
        }catch (error){
            console.log('No advertisement popup found.');
        }
    }
    async goToLoginPage() {
        await this.loginLink.click();
    }
    async selectFirstProduct() {
        await this.firstProduct.click();
    }
}