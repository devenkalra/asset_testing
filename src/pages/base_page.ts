import { Page, expect } from '@playwright/test';

import { ElementInfo } from '../types/app';
import { getRandomIndex } from '../utils/random';
import { test } from '../fixture/core.fixture';

export class BasePage {
	page: Page;
	readonly domain: string;
	context: any;

	constructor(page: Page, domain: string, context: any) {
		this.page = page;
		this.domain = domain;
		this.context = context;
	}

	async clearAllData(landingPage, settingPage, commonComponent) {
		await landingPage.goto('');
		await landingPage.validateShowLandingPage();
		await landingPage.clickBtnOpenAssetApp();
		await commonComponent.bottomNav.validateShowBottomNav();
		await commonComponent.bottomNav.clickSettingIcon();
		await settingPage.clearAllData();
		commonComponent.bottomNav.clickHomeIcon();
	};


	async gotoHomePage(landingPage, commonComponent) {
		await landingPage.goto('');
		await landingPage.validateShowLandingPage();
		await landingPage.clickBtnOpenAssetApp();
		await commonComponent.bottomNav.validateShowBottomNav();
	};


	async blurToBody() {
		this.page.locator('body').click({ force: true });
	}


	async goto(path: string) {
		let page = this.page;
		let context = this.context;
		if (!context) {
			alert('Context is null, creating new context');
		}
		await this.page.goto(`${this.domain}${path}`, { waitUntil: 'load' });
		await page.evaluate(() => {
			localStorage.clear();
			sessionStorage.clear();
			return caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))));
		});
		await context.clearCookies();


		//FOR DEVEN
		// await this.page.goto(`${this.domain}${path}`);
		// await this.page.waitForLoadState('networkidle');
		// const link = await this.page.locator('a:text("Open Asset Management")');
		// await link.click();
		// await this.page.waitForLoadState('networkidle');
	}

	getLocator(selector: string, index = 0) {
		return this.page.locator(selector).nth(index);
	}

	getLocators(selector: string) {
		return this.page.locator(selector);
	}

	async sleep(ms) {
		new Promise(resolve => setTimeout(resolve, ms));
	}

	async clickLocator(locator: string, index = 0, isForce = false) {
		let element = await this.getLocator(locator, index);
		const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
		await sleep(1000);
		await element.click({ force: isForce });
	}

	async clickElementByJS(locator: string) {
		await this.page.evaluate((element) => {
			let el = document.evaluate(element, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
				.singleNodeValue! as HTMLElement;
			el.click();
		}, locator);
	}

	async inputText(locator: string, text: string) {
		const input = this.getLocator(locator);

// Focus the input
		await input.click();

// Select all text
		await input.press('Control+A');  // Or 'Meta+A' on Mac

		for (const char of text) {
			await input.press(char === ' ' ? ' ' : char);
		}
	}

	async getText(locator: string): Promise<string> {
		return await this.getLocator(locator).innerText();
	}

	async getValue(locator: string): Promise<string> {
		return await this.getLocator(locator).inputValue();
	}

	async validateElementVisible(locator: string, index = 0) {
		await expect(this.getLocator(locator, index)).toBeVisible();
	}

	async validateElementNotVisible(locator: string) {
		await expect(this.getLocator(locator)).toBeHidden();
	}

	async validateElementHaveText(locator: string, text: any) {
		await expect(this.getLocator(locator)).toHaveText(text);
	}

	async validateElementNotHaveText(locator: string, text: any) {
		await expect(this.getLocator(locator)).not.toHaveText(text);
	}

	async waitForTimeOut(time: number) {
		await this.page.waitForTimeout(time);
	}

	async countElements(locator: string) {
		return await this.getLocators(locator).count();
	}

	async waitForRendered() {
		await this.page.waitForLoadState('domcontentloaded');
	}

	async waitForNetworkLoad() {
		await this.page.waitForLoadState('networkidle');
	}

	async validateCheckboxChecked(locator: string) {
		await expect(this.getLocator(locator)).toBeChecked();
	}

	async validateCheckboxNotChecked(locator: string) {
		await expect(this.getLocator(locator)).not.toBeChecked();
	}

	async validateElementToHaveCount(locator: string, nubmerOfElement: number) {
		await expect(this.getLocators(locator)).toHaveCount(nubmerOfElement);
	}

	async validateElementNotToHaveCount(locator: string, nubmerOfElement: number) {
		await expect(this.getLocators(locator)).not.toHaveCount(nubmerOfElement);
	}

	async validateElementIsEnable(locator: string) {
		await expect(this.getLocator(locator)).toBeEnabled();
	}

	async validateElementIsNotEnable(locator: string) {
		await expect(this.getLocator(locator)).toBeDisabled();
	}

	async validateElementHaveValue(locator: string, value: string) {
		await expect(this.getLocator(locator)).toHaveValue(value);
	}

	async validateCurrentURLToHave(expectPath: string) {
		await expect(async () => {
			expect(this.page.url()).toContain(expectPath);
		}).toPass();
	}

	async validateCurrentURLNotToHave(expectPath: string) {
		await expect(async () => {
			expect(this.page.url()).toContain(expectPath);
		}).not.toPass();
	}

	async getRandomElementFromListElements(locator: string): Promise<ElementInfo> {
		const listElements = this.getLocators(locator);
		const indexToChoose = getRandomIndex(await listElements.count());
		return { element: listElements.nth(indexToChoose), index: indexToChoose };
	}

	async clickRandomElementFromListElements(locator: string) {
		const listElements = this.getLocators(locator);
		const indexToChoose = getRandomIndex(await listElements.count());
		await listElements.nth(indexToChoose).click({ force: true });
	}

	async getBoundingOfElement(locator: string) {
		return this.getLocator(locator).boundingBox();
	}

	async validateElementToHaveAttributeWithValue(locator: string, attribute: string, value: string) {
		await expect(this.getLocator(locator)).toHaveAttribute(attribute, value);
	}

	async selectElementOption(locator: string, option: string) {
		await this.getLocator(locator).selectOption(option);
	}

	async reloadCurrentPage() {
		await this.page.reload();
	}

	async scrollToBottomOfPage() {
		await this.page.evaluate(() => {
			const el = document.querySelector('.lp-header-container+div'); // main container which has scroll
			if (el) {
				el.scrollBy(0, el.scrollHeight);
			}
		});
	}
}
