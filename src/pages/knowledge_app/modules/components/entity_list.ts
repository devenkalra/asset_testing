import { Page, expect } from '@playwright/test';

import { BasePage } from '../../../base_page';

export class EntityList extends BasePage {
	constructor(page: Page, domain: string, context: any = null) {
		super(page, domain, context);
	}

	private locators = {
		entityListPanel: '.middle-column .column-content',
		entityItem: (entityName: string, entityType: string) => {
			return `//div[contains(@class, 'middle-column')]//span[text()='${entityName}' and text()='${entityType}']`;
		},
		orderType: "//span[contains(text(),'Order')]//b",
		sortType: "//span[contains(text(),'Sorted By')]//b",
		inputSortType: "//input[@placeholder='Sort By']",
		selectionSortType: (sortType: string) => {
			return `//input[@placeholder='Sort By']//following::ul/li[text()='${sortType}']`;
		},
		btnBulkEdit: 'button[id*=bulkEdit]',
		btnSelectAll: "//a[text()='All']",
		listCheckBoxEdit: 'input[id*=bulkEdit]',
		btnDeleteSelected: "//button[text()='Delete Selected']",
		listEntityItems: "//div[contains(@class, 'middle-column')]//span",
	};

	async validateShowEntityListPanel() {
		await this.validateElementVisible(this.locators.entityListPanel);
	}

	async validateEntityListHas(entityName: string, entityType: string) {
		await this.validateElementVisible(this.locators.entityItem(entityName, entityType));
	}

	async validateCurrentOrderTypeIs(orderType: string) {
		await this.validateElementHaveText(this.locators.orderType, orderType);
	}

	async clickOnOrderType() {
		await this.clickLocator(this.locators.orderType);
	}

	async validateCurrentSortTypeIs(sortType: string) {
		await this.validateElementHaveText(this.locators.sortType, sortType);
	}

	async selectSortType(sortType: string) {
		await this.clickLocator(this.locators.sortType);
		await this.validateElementVisible(this.locators.inputSortType);
		await this.clickLocator(this.locators.inputSortType);
		await this.clickLocator(this.locators.selectionSortType(sortType));
		await this.validateCurrentSortTypeIs(sortType);
	}

	async clickBtnBulkEdit() {
		await this.clickLocator(this.locators.btnBulkEdit);
	}

	async selectAllOptionsForBulk() {
		await this.clickLocator(this.locators.btnSelectAll);
	}

	async clickBtnDeleteSelected() {
		await this.clickLocator(this.locators.btnDeleteSelected);
	}

	async validateShowNothingInMiddlePanel() {
		await this.validateElementNotVisible(this.locators.listEntityItems);
	}
}

// https://bldrdojo.com/apps/?app=knowledge&mode=test1
