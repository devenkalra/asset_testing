import { Page, expect } from '@playwright/test';

import { BasePage } from '../../../base_page';

type TagItem = {
	tagName: string;
	tagQuantity: number;
};

export class TagPanel extends BasePage {
	constructor(page: Page, domain: string, context: any = null) {
		super(page, domain, context);
	}

	private locators = {
		tagPanel:
			"//div[text()='Tags']/following::ul[@role='tree']/ancestor::div[@class='column-content']",
		listParentTags: "//div[contains(@class, 'left-column')]//ul[@role='tree']/li",
		tagElementByTagName: (tagName: string) => {
			return `//div[contains(@class, 'left-column')]//p[contains(text(),'${tagName}')]`;
		},
		btnExpandTagByTagName: (tagName: string) => {
			return `//div[contains(@class, 'left-column')]//p[contains(text(),'${tagName}')]/ancestor::li[1]//*[name()='svg']`;
		},
	};

	async validateShowTagPanel() {
		await this.validateElementVisible(this.locators.tagPanel);
	}

	async validateShowParentTag(tagName: string, quantity: number) {
		await this.validateElementVisible(
			`${this.locators.listParentTags}/div//p[text()='${tagName} (${quantity})']`,
		);
	}

	async validateShowTagTree(listTag: TagItem[]) {
		const parentElement = `${this.locators.listParentTags}/div//p[text()='${listTag[0].tagName} (${listTag[0].tagQuantity})']/ancestor::li`;
		const rawTag = await this.getLocator(parentElement).textContent();
		let expectTag = '';
		for (let i = 0; i < listTag.length; i++) {
			expectTag = `${expectTag}${listTag[i].tagName} (${listTag[i].tagQuantity})`;
		}
		expect(rawTag).toBe(expectTag);
	}

	async clickTagElementByTagName(tagName: string) {
		await this.clickLocator(this.locators.tagElementByTagName(tagName));
	}

	async expandTagElementByTagName(tagName: string) {
		await this.clickLocator(this.locators.btnExpandTagByTagName(tagName));
	}

	async validateTagNameShow(tagName: string) {
		await this.validateElementVisible(this.locators.tagElementByTagName(tagName));
	}
}
