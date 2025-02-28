import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/modules/home_page';
import { getEnvTestVersion } from '../utils/setup';
import { CommonComponent } from '../pages/modules/common';
import { AddEditPage } from '../pages/modules/add_edit_page';
import { SearchPage } from '../pages/modules/search_page';
import { SettingPage } from '../pages/modules/setting_page';

type TestFixtures = {
	homePage: HomePage;
	addEditPage: AddEditPage;
	searchPage: SearchPage;
	settingPage: SettingPage;
	commonComponent: CommonComponent;
};

// let version = (process.env.VERSION ? process.env.VERSION : 10) as number;
// console.log('App version: ', version);

const APP_URL = getEnvTestVersion(6);

export const test = baseTest.extend<TestFixtures>({
	homePage: async ({ page }, use) => {
		const homePage = new HomePage(page, APP_URL);
		await use(homePage);
	},
	addEditPage: async ({ page }, use) => {
		const addEditPage = new AddEditPage(page, APP_URL);
		await use(addEditPage);
	},
	searchPage: async ({ page }, use) => {
		const searchPage = new SearchPage(page, APP_URL);
		await use(searchPage);
	},
	settingPage: async ({ page }, use) => {
		const settingPage = new SettingPage(page, APP_URL);
		await use(settingPage);
	},
	commonComponent: async ({ page }, use) => {
		const commonComponent = new CommonComponent(page, APP_URL);
		await use(commonComponent);
	},
});
