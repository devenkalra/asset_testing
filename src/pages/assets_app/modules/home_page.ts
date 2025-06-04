import { Page, expect } from '@playwright/test';

import { BasePage } from '../../base_page';

export class HomePage extends BasePage {
	constructor(page: Page, domain: string, context: any = null) {
		super(page, domain, context);
	}

	private locators = {
		listAreaName: '.child-caption-overlay',
		areaContainerByAreaName: (areaName: string) => {
			return `//div[@class='child-img-3-container'][div[normalize-space()='${areaName}']]`;
		},

		areaContainerByAreaNameInContainer: (areaName: string) => {
			return `//div[@class='child-img-3-container'][div[normalize-space()='${areaName}']]`;
		},
		areaContainerByAreaNameHomePage: (areaName: string) => {
			return `//div[@class='child-img-2-container'][div[normalize-space()='${areaName}']]`;
		},
		/*
				areaContainerByAreaName: (areaName: string) => {
			return `//div[@class='view-heading'][span[normalize-space()='${areaName}']]`;
		},
		 */
		listFullscreenIcon: '.lucide-fullscreen',
		fullScreenOverlay: '.full-screen-image-overlay',
		txtLoading: '//div[text()=\'Loading\']',
	};

	async validateHomePageLoaded() {
		await this.validateElementNotVisible(this.locators.txtLoading);
	}

		async validateAreaShowInContainer(areaName: string) {
		await this.validateElementNotToHaveCount(this.locators.listAreaName, 0);
		await this.validateElementVisible(this.locators.areaContainerByAreaName(areaName));
	}
	async validateAreaShowOnHomePage(areaName: string) {
		await this.validateElementNotToHaveCount(this.locators.listAreaName, 0);
		await this.validateElementVisible(this.locators.areaContainerByAreaNameHomePage(areaName));
	}
	async areaShownByName(childName: string) {
		let parentDivName = "ChildrenGridAreaSub";
		await this.page.locator(`#${parentDivName} >> div.child-img-2-container >> div:has-text("${childName}")`).waitFor({ state: 'visible' });
	}
	async validateNoAreaShowOnHomePage() {
		await this.validateElementToHaveCount(this.locators.listAreaName, 0);
	}

	async validateHomePageHaveArea() {
		await this.validateElementNotToHaveCount(this.locators.listAreaName, 0);
	}

	async validateAreaNotShowOnHomePage(areaName: string) {
		await this.validateElementNotVisible(this.locators.areaContainerByAreaNameHomePage(areaName));
	}

	async clickOnArea(areaName: string) {
		await this.clickLocator(this.locators.areaContainerByAreaNameHomePage(areaName));
	}

	async validateShowMultipleAreaFor(areaName: string, count: number) {
		await this.validateElementToHaveCount(this.locators.areaContainerByAreaNameHomePage(areaName), count);
	}

	async clickOnAnyFullScreenIcon() {
		await (
			await this.getRandomElementFromListElements(this.locators.listFullscreenIcon)
		).element.click();
	}

	async validateCurrentStateIsFullScreenImg() {
		await this.validateElementVisible(this.locators.fullScreenOverlay);
	}

	async clickOnImgOfFullScreen() {
		await this.clickLocator(this.locators.fullScreenOverlay);
	}
}
