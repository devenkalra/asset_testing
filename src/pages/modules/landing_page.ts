import { Page, expect } from '@playwright/test';

import { BasePage } from '../base_page';

export class LandingPage extends BasePage {
	constructor(page: Page, domain: string, context: any = null) {
		super(page, domain, context);
	}

	private locators = {
		headerAssetManagement: "//h2[text()='Asset Management']",
		btnOpenAssetApp:
			"//h2[text()='Asset Management']//ancestor::div//a[contains(@href, 'app=assets')]",
		headerKnowledgeGraph: "//h2[text()='Knowledge Graph']",
		btnOpenKnowledgeApp:
			"//h2[text()='Knowledge Graph']//ancestor::div//a[contains(@href, 'app=knowledge')]",
	};

	async validateShowLandingPage() {
		await this.validateElementVisible(this.locators.headerAssetManagement);
		await this.validateElementVisible(this.locators.btnOpenAssetApp);
		await this.validateElementVisible(this.locators.headerKnowledgeGraph);
		await this.validateElementVisible(this.locators.btnOpenKnowledgeApp);
	}

	async clickBtnOpenAssetApp() {
		await this.clickLocator(this.locators.btnOpenAssetApp);
	}
}
