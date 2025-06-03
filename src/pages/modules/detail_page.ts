import { Page, expect } from '@playwright/test';

import { BasePage } from '../base_page';

export class DetailPage extends BasePage {
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

	async validateElementVisible(locator: string, index = 0) {
		await expect(this.getLocator(locator, index)).toBeVisible();
	}


	async hasTitle(title: string) {
		let headerLocator = `#ViewHeader >> div.view-heading >> span:has-text("${title}")`;
		await this.validateElementVisible(headerLocator);
	}

	async areaShownByName(areaName: string) {
		await this.page.locator(`#ViewChildrenGridAreaSub >> div.child-img-3-container >> div:has-text("${areaName}")`).waitFor({ state: 'visible' });
	}


	async childShownByName(childName: string, type: string) {
		let parentDivName = type == 'area' ? 'ViewChildrenGridAreaSub' : type == 'box' ? 'ViewChildrenGridBoxesSub' : 'ViewChildrenGridItemsSub';
		await this.page.locator(`#${parentDivName} >> div.child-img-3-container >> div:has-text("${childName}")`).waitFor({ state: 'visible' });
	}

	async validateTitle(title: string, type: string) {
		let locator = `.view-heading span span:has-text("${title}")`;
		await this.validateElementVisible(locator);
	}

	childImageByName(childName: string, type: string) {
		if (type == 'area')
			return this.page.locator(`#ViewChildrenGridAreaSub >> div.child-img-3-container >> div:has-text("${childName}")`).locator('..');
		else if (type == 'box')
			return this.page.locator(`#ViewChildrenGridBoxesSub >> div.child-img-3-container >> div:has-text("${childName}")`).locator('..').locator('img');
		else if (type == 'item')
			return this.page.locator(`#ViewChildrenGridItemsSub >> div.child-img-3-container >> div:has-text("${childName}")`).locator('..').locator('img');
	}


	async clickOnChild(childName: string, type: string) {
		await this.childImageByName(childName, type).click();
	}

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

	async validateNoAreaShowOnHomePage() {
		await this.validateElementToHaveCount(this.locators.listAreaName, 0);
	}

	async validateHomePageHaveArea() {
		await this.validateElementNotToHaveCount(this.locators.listAreaName, 0);
	}

	async validateAreaNotShowOnHomePage(areaName: string) {
		await this.validateElementNotVisible(this.locators.areaContainerByAreaNameHomePage(areaName));
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
