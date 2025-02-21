import { test } from '../src/fixture/core.fixture';

test.describe('Can use playwright fixture', async () => {
	test('Injection plawright fixture', async ({ homePage, commonComponent }) => {
		await homePage.goto('');
		await commonComponent.bottomNav.validateShowBottomNav();
		// await homePage.waitForTimeOut(5000);
	});
});
