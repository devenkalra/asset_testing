import { expect } from '@playwright/test';
import { test } from '../src/fixture/core.fixture';
import { getRandomImgFileOf } from '../src/utils/file';
import { getCurrentUnixTime } from '../src/utils/time';
import { faker } from '@faker-js/faker';

test.describe('Area detail test', async () => {
	let testAreaName: string = `Test area ${getCurrentUnixTime()}`;
	let status: number;
	let url: string = '';
	let testAreaDesc: string = faker n  .lorem.sentences();

	test.beforeAll(
		'Precondition - Create test Area',
		async ({ homePage, commonComponent, addEditPage }) => {
			await homePage.goto('');
			await commonComponent.bottomNav.validateShowBottomNav();
			await commonComponent.buttonAdd.validateShowAddButtons();
			await commonComponent.buttonAdd.clickBtnAddMultiple();
			await addEditPage.inputName(testAreaName);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.selectManualUploadMethod();
			await addEditPage.chooseMutipleImgToUpload([getRandomImgFileOf('Area')]);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.validateShowMutiplePreviewImg(testAreaName, 1);
			await addEditPage.clickBtnSaveAll();
			await homePage.waitForTimeOut(2000);
			await homePage.reloadCurrentPage();
			await homePage.validateAreaShowOnHomePage(testAreaName);
		},
	);

	test('Can add Area inside Area', async ({ homePage, commonComponent, addEditPage }) => {
		await test.step('1. Go to Detail of test Area', async () => {
			await homePage.goto('');
			await homePage.clickOnArea(testAreaName);
			await commonComponent.detailPage.validateDetailTitleIs(testAreaName);
		});

		await test.step('2. Create new a Area inside this Area', async () => {
			await commonComponent.buttonAdd.clickBtnAddSingle();
			await commonComponent.buttonAdd.validateShowWhatToAddSection();
			await commonComponent.buttonAdd.clickAddArea();

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

			await addEditPage.selectLocationType('Area'); // try to uncomment any 1 of these 3 lines, the area will not be created
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.inputName(testAreaName); // try to comment
			await addEditPage.waitForTimeOut(2000);

			await addEditPage.inputDescription(testAreaDesc); // try to comment
			await addEditPage.waitForTimeOut(2000);

			await addEditPage.clickBtnSave();
		});
	});
});
