import { expect } from '@playwright/test';
import { test } from '../src/fixture/core.fixture';
import { getRandomImgFileOf } from '../src/utils/file';
import { getCurrentUnixTime } from '../src/utils/time';
import { faker } from '@faker-js/faker';

test.describe('Home test', async () => {
	test('User can CRUD Area @TC_HOME_01', async ({ homePage, commonComponent, addEditPage }) => {
		let status: number;
		let url: string = '';
		await test.step('1. Go to Home page', async () => {
			await homePage.goto('');
			await commonComponent.bottomNav.validateShowBottomNav();
		});

		await test.step('2. Successful create an new area', async () => {
			await commonComponent.buttonAdd.validateShowAddButtons();
			await commonComponent.buttonAdd.clickBtnAddSingle();

			await addEditPage.clickIconAddPhoto();
			await addEditPage.validatePopupUploadImageShow();
			await addEditPage.selectManualUploadMethod();
			await addEditPage.page.route('**/files/upload/', async (route) => {
				const response = await addEditPage.page.request.fetch(route.request());
				status = response.status();
				const responseBody = await response.json();
				url = responseBody.location;
				console.log(responseBody);
				route.continue();
			});
			await addEditPage.chooseImgToUpload(getRandomImgFileOf('Area'));
			await expect(async () => {
				expect(status).toBe(200);
				expect(url).not.toBe('');
			}).toPass();
			await addEditPage.validateUploadedImgShow(url);
			await addEditPage.clickBtnAddImg();

			// await addEditPage.selectLocationType('Area'); // try to uncomment any 1 of these 3 lines, the area will not be created
			// await addEditPage.inputName(`Test area ${getCurrentUnixTime()}`); // try to comment
			// await addEditPage.inputDescription(faker.lorem.sentences()); // try to comment

			await addEditPage.clickBtnSave();
			await homePage.page.pause();
		});
	});
});
