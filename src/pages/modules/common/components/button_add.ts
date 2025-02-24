import { Page } from '@playwright/test';
import { BasePage } from '../../../base_page';

export class ButtonAdd extends BasePage {
	constructor(page: Page, domain: string) {
		super(page, domain);
	}

	private locators = {
		btnContainer: '.add-icons-area',
		listBtnAdd: '.add-icons-area span svg',
		whatToAddDiv: '.what-to-add-div',
		btnAddArea: "//div[@class='what-to-add-div']//div[text()='Area']",
		btnAddBox: "//div[@class='what-to-add-div']//div[text()='Box']",
		btnAddItem: "//div[@class='what-to-add-div']//div[text()='Item']",
		btnCancel: "//div[@class='what-to-add-div']//button[text()='Cancel']",
	};

	async validateShowAddButtons() {
		await this.validateElementVisible(this.locators.btnContainer);
		await this.validateElementNotToHaveCount(this.locators.listBtnAdd, 0);
	}

	async clickBtnAddSingle() {
		await this.clickLocator(this.locators.listBtnAdd, 2);
	}

	async clickBtnAddMultiple() {
		await this.clickLocator(this.locators.listBtnAdd, 1);
	}

	async validateShowWhatToAddSection() {
		await this.validateElementVisible(this.locators.whatToAddDiv);
		await this.validateElementVisible(this.locators.btnAddArea);
		await this.validateElementVisible(this.locators.btnAddBox);
		await this.validateElementVisible(this.locators.btnAddItem);
		await this.validateElementVisible(this.locators.btnCancel);
	}

	async clickAddArea() {
		await this.clickLocator(this.locators.btnAddArea);
	}

	async clickAddBox() {
		await this.clickLocator(this.locators.btnAddBox);
	}

	async clickAddItem() {
		await this.clickLocator(this.locators.btnAddItem);
	}

	async clickBtnCancel() {
		await this.clickLocator(this.locators.btnCancel);
	}
}
