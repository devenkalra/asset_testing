import { test as baseTest } from '@playwright/test';
import { getEnvTestVersion } from '../utils/setup';
import { HomePage } from '../pages/knowledge_app/modules/home_page';

const APP_URL = getEnvTestVersion('knowledge', 1);

type TestFixtures = {
	homePage: HomePage;
};

export const knowledgeTest = baseTest.extend<TestFixtures>({
	homePage: async ({ page, context }, use) => {
		const homePage = new HomePage(page, APP_URL, context);
		await use(homePage);
	},
});
