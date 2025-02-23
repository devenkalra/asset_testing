import { Page } from '@playwright/test';
import { BasePage } from '../../base_page';
import { BottomNav } from './components/bottom_nav';
import { ButtonAdd } from './components/button_add';

export class CommonComponent extends BasePage {
	public bottomNav: BottomNav;
	public buttonAdd: ButtonAdd;

	constructor(page: Page, domain: string) {
		super(page, domain);
		this.bottomNav = new BottomNav(page, domain);
		this.buttonAdd = new ButtonAdd(page, domain);
	}
}
