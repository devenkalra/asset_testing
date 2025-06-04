import { Page, expect } from '@playwright/test';

import { BasePage } from '../../base_page';

export class HomePage extends BasePage {
	constructor(page: Page, domain: string, context: any = null) {
		super(page, domain, context);
	}

	private locators = {};
}
