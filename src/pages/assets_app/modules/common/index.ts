import { Page } from '@playwright/test';
import { BasePage } from '../../../base_page';
import { BottomNav } from './components/bottom_nav';
import { ButtonAdd } from './components/button_add';
import { DetailPage } from './components/detail_page';

export class CommonComponent extends BasePage {
	public bottomNav: BottomNav;
	public buttonAdd: ButtonAdd;
	public detailPage: DetailPage;

	constructor(page: Page, domain: string, context: any = null) {
		super(page, domain, context);
		this.bottomNav = new BottomNav(page, domain, context);
		this.buttonAdd = new ButtonAdd(page, domain, context);
		this.detailPage = new DetailPage(page, domain, context);
	}
}
