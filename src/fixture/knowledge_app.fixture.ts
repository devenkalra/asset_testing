import { test as baseTest } from '@playwright/test';
import { getEnvTestVersion } from '../utils/setup';
import { MainKnowledgeApp } from '../pages/knowledge_app/modules/main_knowledge_app';

const APP_URL = getEnvTestVersion('knowledge', 2);

type TestFixtures = {
	mainKnowledgeApp: MainKnowledgeApp;
};

export const knowledgeTest = baseTest.extend<TestFixtures>({
	mainKnowledgeApp: async ({ page, context }, use) => {
		const mainKnowledgeApp = new MainKnowledgeApp(page, APP_URL, context);
		await use(mainKnowledgeApp);
	},
});
