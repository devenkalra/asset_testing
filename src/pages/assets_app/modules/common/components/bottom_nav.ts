import { Page } from '@playwright/test';
import { BasePage } from '../../../../base_page';

export class BottomNav extends BasePage {
	constructor(page: Page, domain: string, context: any = null) {
		super(page, domain, context);
	}


	private locators = {
		menuContainer: '.bottom-menu',
		listIcon: '.bottom-menu span',
	};

	async validateShowBottomNav() {
		await this.validateElementVisible(this.locators.menuContainer);
		await this.validateElementVisible(this.locators.listIcon, 0);
		await this.validateElementVisible(this.locators.listIcon, 1);
		await this.validateElementVisible(this.locators.listIcon, 2);
	}

	async clickHomeIcon() {
		await this.clickLocator(this.locators.listIcon, 0);
	}

	async clickSearchIcon() {
		await this.clickLocator(this.locators.listIcon, 1);
	}

	async clickSettingIcon() {
		await this.clickLocator(this.locators.listIcon, 2);
	}
}
