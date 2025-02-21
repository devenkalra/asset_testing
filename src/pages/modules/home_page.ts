import { Page, expect } from '@playwright/test';

import { BasePage } from '../base_page';

export class HomePage extends BasePage {
	constructor(page: Page, domain: string) {
		super(page, domain);
	}
	private locators = {};
}
