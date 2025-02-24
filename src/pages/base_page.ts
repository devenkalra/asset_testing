import { Page, expect } from '@playwright/test';

import { ElementInfo } from '../types/app';
import { getRandomIndex } from '../utils/random';

export class BasePage {
	page: Page;
	readonly domain: string;
	constructor(page: Page, domain: string) {
		this.page = page;
		this.domain = domain;
	}

	async goto(path: string) {
		await this.page.goto(`https://${this.domain}${path}`);
		await this.page.waitForLoadState('networkidle');
	}
	getLocator(selector: string, index = 0) {
		return this.page.locator(selector).nth(index);
	}
	getLocators(selector: string) {
		return this.page.locator(selector);
	}

	async clickLocator(locator: string, index = 0, isForce = false) {
		await this.getLocator(locator, index).click({ force: isForce });
	}
	async inputText(locator: string, text: string) {
		await this.getLocator(locator).fill(text);
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
}
