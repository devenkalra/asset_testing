import { knowledgeTest } from '../../src/fixture/knowledge_app.fixture';

knowledgeTest.describe('Sample test Knowledge @Sample_Knowledge', async () => {
	knowledgeTest('Verify can access Knowledge app @TC_K_01', async ({ homePage }) => {
		await knowledgeTest.step('1. Access Knowlege app', async () => {
			await homePage.goto('');
		});
		await knowledgeTest.step('2. Validate Knowledge app show', async () => {
			await homePage.validateShowHomePageKnowledgeApp();
		});
	});

	knowledgeTest('Verify can access Knowledge app @TC_K_02', async ({ homePage }) => {
		await knowledgeTest.step('1. Access Knowlege app', async () => {
			await homePage.goto('');
		});
		await knowledgeTest.step('2. Validate Knowledge app show', async () => {
			await homePage.validateDropDownTodoHasOption([
				'Execute (command)',
				'Change New Record Field (name,value)',
				'Delete Record (index)',
				'Save New Record (none)',
			]);
		});
	});
});
