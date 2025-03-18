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
		btnClearAllData: "//div[@class='set-menu-item' and text()=' Clear All Data']",
		msgClearItemSuccess: "//div[contains(text(), 'items deleted successfully')]",
	};

	async validateShowSettingPage() {
		await this.validateElementVisible(this.locators.btnExport);
		await this.validateElementVisible(this.locators.btnImport);
		await this.validateElementVisible(this.locators.btnRecomputeStats);
		await this.waitForRendered();
	}

	async clickBtnExport() {
		await this.clickLocator(this.locators.btnExport);
	}

	async clickBtnClearAllData() {
		await this.clickLocator(this.locators.btnClearAllData, 0, true);
	}

	async chooseFileToImport(fileDir: string) {
		const fileChooserPromise = this.page.waitForEvent('filechooser');
		await this.clickLocator(this.locators.btnImport);
		const fileChooser = await fileChooserPromise;
		await fileChooser.setFiles(fileDir);
		await this.waitForNetworkLoad();
	}

	async validateShowMsgClearItemSuccess() {
		await this.validateElementVisible(this.locators.msgClearItemSuccess);
	}
}
