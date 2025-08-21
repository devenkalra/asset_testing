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
			"//div[span[text()='Tags']]/following::ul[@role='tree']/ancestor::div[@class='column-content']",
		listParentTags: "//div[contains(@class, 'left-column')]//ul[@role='tree']/li",
		tagElementByTagName: (tagName: string) => {
			return `//div[contains(@class, 'left-column')]//p[contains(text(),'${tagName}')]`;
		},
		btnExpandTagByTagName: (tagName: string) => {
			return `//div[contains(@class, 'left-column')]//p[contains(text(),'${tagName}')]/ancestor::li[1]//*[name()='svg']`;
		},
		btnEditTag: "//button[text()='Edit Tags']",
		btnAddTag: "//button[text()='Add Tag']",
		btnExitEdit: "//button[text()='Exit Edit']",
		btnDeleteSelected: "//button[text()='Delete Selected']",
		listBtnPencilEditSingleTag: ".TagArea [role='treeitem'] span",
		textBoxOfEditTag: (tagName: string) => {
			return `//input[@value='${tagName}']`;
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

	async validateShowTagTreeInEditMode(listTag: TagItem[]) {
		const parentElement = `${this.locators.listParentTags}/div//p[text()='${listTag[0].tagName} (${listTag[0].tagQuantity})']/ancestor::li`;
		const rawTag = await this.getLocator(parentElement).textContent();
		let expectTag = '';
		for (let i = 0; i < listTag.length; i++) {
			expectTag = `${expectTag}${listTag[i].tagName} (${listTag[i].tagQuantity})✏️`;
		}
		expect(rawTag).toBe(expectTag);
	}

	async validateShowTagTreeInViewMode(listTag: TagItem[]) {
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

	async validateTagNameNotShow(tagName: string) {
		await this.validateElementNotVisible(this.locators.tagElementByTagName(tagName));
	}

	async clickBtnEditTags() {
		await this.clickLocator(this.locators.btnEditTag);
	}

	async clickBtnExitEdit() {
		await this.clickLocator(this.locators.btnExitEdit);
	}

	async clickBtnAddTag() {
		await this.clickLocator(this.locators.btnAddTag);
	}

	async validateTagPanelIsInEditMode() {
		await this.validateElementVisible(this.locators.btnExitEdit);
		await this.validateElementVisible(this.locators.btnAddTag);
		await this.validateElementVisible(this.locators.btnDeleteSelected);
		await this.validateElementNotVisible(this.locators.btnEditTag);
	}

	async validateTagPanelIsNotInEditMode() {
		await this.validateElementVisible(this.locators.btnEditTag);
		await this.validateElementNotVisible(this.locators.btnExitEdit);
		await this.validateElementNotVisible(this.locators.btnAddTag);
		await this.validateElementNotVisible(this.locators.btnDeleteSelected);
	}

	async validateListPencilIconShow() {
		await this.validateElementNotToHaveCount(this.locators.listBtnPencilEditSingleTag, 0);
	}

	async createTag(tagName: string) {
		this.page.once('dialog', async (dialog) => {
			await dialog.accept(tagName);
		});
		await this.clickBtnAddTag();
	}

	async clickBtnDeleteSelected() {
		await this.clickLocator(this.locators.btnDeleteSelected);
	}

	async validateBtnDeleteSelectedEnable() {
		await this.validateElementIsEnable(this.locators.btnDeleteSelected);
	}

	async validateBtnDeleteSelectedDiable() {
		await this.validateElementIsDisable(this.locators.btnDeleteSelected);
	}

	async clickBtnPencilOfTagName(tagName: string) {
		await this.clickLocator(`${this.locators.tagElementByTagName(tagName)}//span`);
	}

	async updateValueOfTag(oldTagName: string, newTagName: string) {
		await this.clickBtnPencilOfTagName(oldTagName);
		await this.inputText(this.locators.textBoxOfEditTag(oldTagName), newTagName);
	}
}
