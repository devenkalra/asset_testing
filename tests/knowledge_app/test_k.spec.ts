import { knowledgeTest } from '../../src/fixture/knowledge_app.fixture';
import { getCurrentUnixTime } from '../../src/utils/time';

knowledgeTest.describe('Search test', async () => {
	knowledgeTest('Can search for Correct Item @TC_KD_01', async ({ homePage }) => {
		const testAreaName: string = `Test area ${getCurrentUnixTime()}`;

		await knowledgeTest.step('1. Create test Area', async () => {
			await homePage.goto('');
			await homePage.waitForTimeOut(5000);
		});
	});
});

//https://bldrdojo.com/?app=knowledge&page=LandingPage&mode=test7
//https://bldrdojo.com/apps/?app=knowledge&page=LandingPage&mode=test1