import { test as baseTest } from '@playwright/test';
import { getEnvTestVersion } from '../utils/setup';
import { CommonComponent } from '../pages/assets_app/modules/common';
import { HomePage } from '../pages/assets_app/modules/home_page';
import { DetailPage } from '../pages/assets_app/modules/detail_page';
import { AddEditPage } from '../pages/assets_app/modules/add_edit_page';
import { SearchPage } from '../pages/assets_app/modules/search_page';
import { SettingPage } from '../pages/assets_app/modules/setting_page';
import { LandingPage } from '../pages/assets_app/modules/landing_page';

type TestFixtures = {
	homePage: HomePage;
	detailPage: DetailPage;
	addEditPage: AddEditPage;
	searchPage: SearchPage;
	settingPage: SettingPage;
	landingPage: LandingPage;
	commonComponent: CommonComponent;
};

// let version = (process.env.VERSION ? process.env.VERSION : 10) as number;
// console.log('App version: ', version);

const APP_URL = getEnvTestVersion('assets', 7);

export const assetsTest = baseTest.extend<TestFixtures>({
	detailPage: async ({ page, context }, use) => {
		const detailPage = new DetailPage(page, APP_URL, context);
		await use(detailPage);
	},
	homePage: async ({ page, context }, use) => {
		const homePage = new HomePage(page, APP_URL, context);
		await use(homePage);
	},
	addEditPage: async ({ page, context }, use) => {
		const addEditPage = new AddEditPage(page, APP_URL, context);
		await use(addEditPage);
	},
	searchPage: async ({ page, context }, use) => {
		const searchPage = new SearchPage(page, APP_URL, context);
		await use(searchPage);
	},
	settingPage: async ({ page, context }, use) => {
		const settingPage = new SettingPage(page, APP_URL, context);
		await use(settingPage);
	},
	landingPage: async ({ page, context }, use) => {
		const landingPage = new LandingPage(page, APP_URL, context);
		await use(landingPage);
		console.log('Viewport Size:', await page.viewportSize());
		//console.log('Extra HTTP Headers:', await page.context());
	},
	commonComponent: async ({ page, context }, use) => {
		const commonComponent = new CommonComponent(page, APP_URL, context);
		await use(commonComponent);
	},
});
