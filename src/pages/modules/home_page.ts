import { Page, expect } from '@playwright/test';

import { BasePage } from '../base_page';

export class HomePage extends BasePage {
	constructor(page: Page, domain: string) {
		super(page, domain);
	}
	private locators = {
		listAreaName: '.child-caption-overlay',
		areaContainerByAreaName: (areaName: string) => {
			return `//div[@class='child-img-2-container'][div[text()='${areaName}']]`;
		},
	};

	async validateAreaShowOnHomePage(areaName: string) {
		await this.validateElementNotToHaveCount(this.locators.listAreaName, 0);
		await this.validateElementVisible(this.locators.areaContainerByAreaName(areaName));
	}

	async validateAreaNotShowOnHomePage(areaName: string) {
		await this.validateElementNotVisible(this.locators.areaContainerByAreaName(areaName));
	}

	async clickOnArea(areaName: string) {
		await this.clickLocator(this.locators.areaContainerByAreaName(areaName));
	}

	async validateShowMultipleAreaFor(areaName: string, count: number) {
		await this.validateElementToHaveCount(this.locators.areaContainerByAreaName(areaName), count);
	}
}
