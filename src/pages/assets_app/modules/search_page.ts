import { Page, expect } from '@playwright/test';

import { BasePage } from '../../base_page';

export class SearchPage extends BasePage {
	constructor(page: Page, domain: string, context: any = null) {
		super(page, domain, context);
	}

	private locators = {
		searchArea: '.search-area',
		inputSearch: '.search-area input',
		listSearchResult: '.child-img-3-container',
		locationByName: (locName: string) => {
			return `//div[@class='child-img-3-container'][div[@class='child-caption-overlay' and text()='${locName}']]`;
		},
	};

	async validateShowSearchPage() {
		await this.validateElementVisible(this.locators.searchArea);
		await this.validateElementVisible(this.locators.inputSearch);
	}

	async inputToSearchBox(searchKey: string) {
		await this.inputText(this.locators.inputSearch, searchKey);
	}

	async performSearch() {
		await this.page.press(this.locators.inputSearch, 'Enter');
	}

	async validateSearchHaveResult() {
		await this.validateElementNotToHaveCount(this.locators.listSearchResult, 0);
	}

	async validateLocationShowOnSearchResult(locName: string) {
		await expect(this.getLocator(this.locators.locationByName(locName))).toBeVisible();
	}
}
