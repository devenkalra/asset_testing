import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/modules/home_page';
import { getEnvTestVersion } from '../utils/setUp';
import { CommonComponent } from '../pages/modules/common';

type TestFixtures = {
	homePage: HomePage;
	commonComponent: CommonComponent;
};

const APP_URL = getEnvTestVersion(8);

export const test = baseTest.extend<TestFixtures>({
	homePage: async ({ page }, use) => {
		const homePage = new HomePage(page, APP_URL);
		await use(homePage);
	},
	commonComponent: async ({ page }, use) => {
		const commonComponent = new CommonComponent(page, APP_URL);
		await use(commonComponent);
	},
});
