import { Page, expect } from '@playwright/test';

import { BasePage } from '../../base_page';

export class HomePage extends BasePage {
	constructor(page: Page, domain: string, context: any = null) {
		super(page, domain, context);
	}

	private locators = {
		btnQueryGenerator: "//button[normalize-space()='Query Generator']",
		btnExecuteCommand: '#executeTestCommand',
		dropDownTodoItems: '#testAction option',
	};

	async validateShowHomePageKnowledgeApp() {
		await this.validateElementVisible(this.locators.btnExecuteCommand);
		await this.validateElementVisible(this.locators.btnExecuteCommand);
	}

	async validateDropDownTodoHasOption(items: String[]) {
		await this.validateElementNotToHaveCount(this.locators.dropDownTodoItems, 0);
		const actualItems = await this.getLocators(this.locators.dropDownTodoItems).allInnerTexts();
		expect(actualItems).toMatchObject(items);
	}
}
