import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/modules/home_page';
import { getEnvTestVersion } from '../utils/setup';
import { CommonComponent } from '../pages/modules/common';
import { AddEditPage } from '../pages/modules/add_edit_page';

type TestFixtures = {
	homePage: HomePage;
	addEditPage: AddEditPage;
	commonComponent: CommonComponent;
};

const APP_URL = getEnvTestVersion(8);

export const test = baseTest.extend<TestFixtures>({
	homePage: async ({ page }, use) => {
		const homePage = new HomePage(page, APP_URL);
		await use(homePage);
	},
	addEditPage: async ({ page }, use) => {
		const addEditPage = new AddEditPage(page, APP_URL);
		await use(addEditPage);
	},
	commonComponent: async ({ page }, use) => {
		const commonComponent = new CommonComponent(page, APP_URL);
		await use(commonComponent);
	},
});
