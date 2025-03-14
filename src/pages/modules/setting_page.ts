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
	};

	async validateShowSettingPage() {
		await this.validateElementVisible(this.locators.btnExport);
		await this.validateElementVisible(this.locators.btnImport);
		await this.validateElementVisible(this.locators.btnRecomputeStats);
	}

	async clickBtnExport() {
		await this.clickLocator(this.locators.btnExport);
	}

	async clickBtnClearAllData() {
		this.page.on('dialog', async (dialog) => {
			expect(dialog.type()).toBe('alert');
			await dialog.accept();
		});
		await this.clickLocator(this.locators.btnClearAllData);
		await this.waitForNetworkLoad();
	}

	async chooseFileToImport(fileDir: string) {
		const fileChooserPromise = this.page.waitForEvent('filechooser');
		await this.clickLocator(this.locators.btnImport);
		const fileChooser = await fileChooserPromise;
		await fileChooser.setFiles(fileDir);
		await this.waitForNetworkLoad();
	}
}
