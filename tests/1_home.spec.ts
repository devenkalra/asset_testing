import { expect } from '@playwright/test';
import { test } from '../src/fixture/core.fixture';
import { getRandomImgFileOf } from '../src/utils/file';
import { getCurrentUnixTime } from '../src/utils/time';
import { faker } from '@faker-js/faker';
import { act } from '@testing-library/react';

test.describe('Home test', async () => {
	test('User can CRUD Area @TC_HOME_01', async ({ homePage, commonComponent, addEditPage }) => {
		let status: number;
		let url: string = '';
		let testAreaName: string = `Test area ${getCurrentUnixTime()}`;
		let testAreaDesc: string = faker.lorem.sentences();
		let testAreaName2: string = `Test area edited ${getCurrentUnixTime()}`;

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

			await act(async () => {
				await addEditPage.selectLocationType('Area'); // try to uncomment any 1 of these 3 lines, the area will not be created
			});

			await act(async () => {
				await addEditPage.inputName(testAreaName); // try to comment
			});

			await act(async () => {
				await addEditPage.inputDescription(testAreaDesc); // try to comment
			});

			await act(async () => {
				await addEditPage.clickBtnSave();
			})
		});

		await test.step('3. Validate new area show on home page', async () => {
			await homePage.validateAreaShowOnHomePage(testAreaName);
		});

		await test.step('4. Go to that area detail page, validate detail page display correct', async () => {
			await homePage.clickOnArea(testAreaName);
			await commonComponent.detailPage.validateShowDetailPage();
			await commonComponent.detailPage.validateDetailTitleIs(testAreaName);
			await commonComponent.detailPage.valdiateHaveAreaBoxItemInside(0, 0, 0);
		});

		await test.step('5. Edit selected area, validate successful editted', async () => {
			await commonComponent.detailPage.clickOnShowOption();
			await commonComponent.detailPage.validateShowActionOptions();
			await commonComponent.detailPage.clickEditOption();
			await addEditPage.inputName(testAreaName2);
			await addEditPage.page.waitForTimeout(2000);
			await act(async () => {
				await addEditPage.clickBtnSave();
			});
			await commonComponent.detailPage.validateDetailTitleIs(testAreaName2);
		});

		await test.step('6. Delete selected area, validate successful deleted', async () => {
			await commonComponent.detailPage.clickOnShowOption();
			await commonComponent.detailPage.validateShowActionOptions();
			await commonComponent.detailPage.clickDeleteOption();
			await homePage.validateAreaNotShowOnHomePage(testAreaName2);
		});
	});

	test('User can add multiple Areas @TC_HOME_02', async ({
																													 homePage,
																													 commonComponent,
																													 addEditPage,
																												 }) => {
		let testAreaName: string = `Test mutiple area ${getCurrentUnixTime()}`;

		await test.step('1. Go to Home page', async () => {
			await homePage.goto('');
			await commonComponent.bottomNav.validateShowBottomNav();
		});

		await test.step('2. Successful create multiple Areas', async () => {
			await commonComponent.buttonAdd.validateShowAddButtons();
			await commonComponent.buttonAdd.clickBtnAddMultiple();
			await addEditPage.inputName(testAreaName);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.selectManualUploadMethod();
			await addEditPage.chooseMutipleImgToUpload([
				getRandomImgFileOf('Area'),
				getRandomImgFileOf('Area'),
			]);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.validateShowMutiplePreviewImg(testAreaName, 2);
			await addEditPage.clickBtnSaveAll();
			await homePage.waitForTimeOut(2000);
			await homePage.validateShowMultipleAreaFor(testAreaName, 2);
		});
	});

	test('User can view or exit fullsize of area @TC_HOME_03', async ({
																																			homePage,
																																			commonComponent,
																																		}) => {
		await test.step('1. Go to Home page', async () => {
			await homePage.goto('');
			await commonComponent.bottomNav.validateShowBottomNav();
		});

		await test.step('2. View fullsize of any area, user will turn into fullsize mode', async () => {
			await homePage.clickOnAnyFullScreenIcon();
			await homePage.validateCurrentStateIsFullScreenImg();
		});

		await test.step('3. Can exit fullsize mode by click on the image', async () => {
			await homePage.clickOnImgOfFullScreen();
			await homePage.validateHomePageHaveArea();
		});
	});
});
