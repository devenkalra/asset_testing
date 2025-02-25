import { Page, expect } from '@playwright/test';

import { BasePage } from '../base_page';

export class SettingPage extends BasePage {
	constructor(page: Page, domain: string) {
		super(page, domain);
	}
	private locators = {
		btnExport: "//div[@class='set-menu-item' and text()=' Export']",
		btnImport: "//div[@class='set-menu-item' and text()=' Import']",
		btnRecomputeStats: "//div[@class='set-menu-item' and text()=' Recompute Stats']",
	};

	async validateShowSettingPage() {
		await this.validateElementVisible(this.locators.btnExport);
		await this.validateElementVisible(this.locators.btnImport);
		await this.validateElementVisible(this.locators.btnRecomputeStats);
	}
}
