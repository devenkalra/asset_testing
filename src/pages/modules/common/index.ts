import { Page } from '@playwright/test';
import { BasePage } from '../../base_page';
import { BottomNav } from './components/bottom_nav';

export class CommonComponent extends BasePage {
	public bottomNav: BottomNav;

	constructor(page: Page, domain: string) {
		super(page, domain);
		this.bottomNav = new BottomNav(page, domain);
	}
}
