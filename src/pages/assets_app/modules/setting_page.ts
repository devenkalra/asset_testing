import { Page, expect } from '@playwright/test';

import { BasePage } from '../../base_page';

export class SettingPage extends BasePage {
	constructor(page: Page, domain: string, context: any = null) {
		super(page, domain, context);
	}

	private locators = {
		btnExport: "//div[@class='set-menu-item' and text()=' Export']",
		btnImport: "//div[@class='set-menu-item' and text()=' Import']",
		btnRecomputeStats: "//div[@class='set-menu-item' and text()=' Recompute Stats']",
		btnClearAllData: "//div[@class='set-menu-item' and contains(., 'Clear All Data')]",
		msgClearItemSuccess: "//div[contains(text(), 'items deleted successfully')]",
		btnSave: '#exportSave',
	};

	async waitForExportSave() {
		await this.page.locator(this.locators.btnExport).waitFor({ state: 'visible' });
	}

	async saveButton() {
		return await this.page.locator(this.locators.btnSave);
	}

	async validateShowSettingPage() {
		await this.validateElementVisible(this.locators.btnExport);
		await this.validateElementVisible(this.locators.btnImport);
		await this.validateElementVisible(this.locators.btnRecomputeStats);
		await this.waitForRendered();
	}

	async clickBtnExport() {
		await this.clickLocator(this.locators.btnExport);
	}

	async clearAllData() {
		await this.clickBtnClearAllData();

		await this.validateShowMsgClearItemSuccess();
	}

	async clickBtnClearAllData() {
		this.page.once('dialog', async (dialog) => {
			console.log('Dialog:', dialog.message());
			await dialog.accept();
		});

		await this.page
			.locator("//div[@class='set-menu-item' and contains(., 'Clear All Data')]")
			.click();
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
