import { expect } from '@playwright/test';
import { test } from '../src/fixture/core.fixture';
import { getRandomImgFileOf } from '../src/utils/file';
import { getCurrentUnixTime } from '../src/utils/time';
import { faker } from '@faker-js/faker';
import { getRandomBetween } from '../src/utils/random';


test.describe('Area detail test', () => {
	const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

	test('Can add Area, Box, Item inside Area @TC_AREA_01', async ({
																																	 settingPage,

																																	 homePage,
																																	 detailPage,
																																	 commonComponent,
																																	 addEditPage,
																																	 landingPage,
																																 }) => {

		const testAreaName: string = `Test area ${getCurrentUnixTime()}`;
		const testAreaName2: string = `Test area 2 ${getCurrentUnixTime() + getRandomBetween(1, 10)}`;
		const testBoxName: string = `Test box ${getCurrentUnixTime()}`;
		const testItemName: string = `Test item ${getCurrentUnixTime()}`;
		const desc: string = faker.lorem.sentences();
		let status: number;
		let url: string = '';



		await test.step('1. Create and go to Detail of test Area', async () => {
				await homePage.clearAllData(landingPage, settingPage, commonComponent);


			await homePage.validateHomePageLoaded();
			await commonComponent.bottomNav.validateShowBottomNav();
			await commonComponent.buttonAdd.validateShowAddButtons();
			await commonComponent.buttonAdd.clickBtnAddMultiple();
			await addEditPage.inputName(testAreaName);
			await addEditPage.selectManualUploadMethod();
			await addEditPage.chooseMutipleImgToUpload([getRandomImgFileOf('Area')]);
			await addEditPage.validateShowMutiplePreviewImg(testAreaName, 1);
			await addEditPage.clickBtnSaveAll();
			await homePage.validateAreaShowOnHomePage(testAreaName);
			await homePage.clickOnArea(testAreaName);
			await commonComponent.detailPage.validateDetailTitleIs(testAreaName);
		});

		await test.step('2. Create new Area inside this Area', async () => {
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
				await route.fulfill({ response });
				await expect(async () => {
					expect(status).toBe(200);
					expect(url).not.toBe('');
				}).toPass();
			});
			await addEditPage.chooseImgToUpload(getRandomImgFileOf('Area'));
			await addEditPage.validateUploadedImgShow(url);
			await addEditPage.clickBtnAddImg();
			await addEditPage.selectLocationType('Area');
			await addEditPage.inputName(testAreaName2);
			await addEditPage.inputDescription(desc);
			//await sleep(2000);
			await addEditPage.clickBtnSave();
			await sleep(1000);
			// routing issue. Created area inside should be stay inside area instead of back to home?
			await detailPage.areaShownByName(testAreaName2);
			await detailPage.validateTitle(testAreaName, 'area');
			await detailPage.clickOnChild(testAreaName2, 'area');
			await detailPage.validateTitle(testAreaName2, 'area');
		});

		await test.step('3. Create new Box inside this Area', async () => {
			url = '';
			await commonComponent.buttonAdd.clickBtnAddSingle();
			await commonComponent.buttonAdd.validateShowWhatToAddSection();
			await commonComponent.buttonAdd.clickAddBox();
			await addEditPage.clickIconAddPhoto();
			await addEditPage.validatePopupUploadImageShow();
			await addEditPage.selectManualUploadMethod();
			await addEditPage.page.route('**/files/upload/', async (route) => {
				const response = await addEditPage.page.request.fetch(route.request());
				status = response.status();
				const responseBody = await response.json();
				url = responseBody.location;
				console.log(responseBody);
				await route.fulfill({ response });
				await expect(async () => {
					expect(status).toBe(200);
					expect(url).not.toBe('');
				}).toPass();
			});
			await addEditPage.chooseImgToUpload(getRandomImgFileOf('Box'));
			await addEditPage.validateUploadedImgShow(url);
			await addEditPage.clickBtnAddImg();
			await addEditPage.selectLocationType('Box');
			await addEditPage.inputName(testBoxName);
			await addEditPage.inputDescription(desc);
			await addEditPage.clickBtnSave();


			await detailPage.childShownByName, (testBoxName, 'box');

		});

		await test.step('4. Create new Item inside this Area', async () => {
			url = '';
			await commonComponent.buttonAdd.clickBtnAddSingle();
			await commonComponent.buttonAdd.validateShowWhatToAddSection();
			await commonComponent.buttonAdd.clickAddItem();
			await addEditPage.clickIconAddPhoto();
			await addEditPage.validatePopupUploadImageShow();
			await addEditPage.selectManualUploadMethod();
			await addEditPage.page.route('**/files/upload/', async (route) => {
				const response = await addEditPage.page.request.fetch(route.request());
				status = response.status();
				const responseBody = await response.json();
				url = responseBody.location;
				console.log(responseBody);
				await route.fulfill({ response });
				await expect(async () => {
					expect(status).toBe(200);
					expect(url).not.toBe('');
				}).toPass();
			});
			await addEditPage.chooseImgToUpload(getRandomImgFileOf('Item'));
			await addEditPage.validateUploadedImgShow(url);
			await addEditPage.clickBtnAddImg();
			await addEditPage.selectLocationType('Item');
			await addEditPage.inputName(testItemName);
			await addEditPage.inputDescription(desc);
			await addEditPage.clickBtnSave();
			await sleep(1000);
			await detailPage.childShownByName(testItemName, 'item');
		});
	});

	test('Can add Mutiple Areas, Boxes, Items inside Area @TC_AREA_02', async ({
settingPage,
																																							 homePage,
																																							 detailPage: DetailPage, commonComponent,
																																							 addEditPage,
																																							 landingPage,
																																						 }) => {
		const testAreaName: string = `Test area ${getCurrentUnixTime()}`;
		const testMultiAreaName: string = `Test multi area ${getCurrentUnixTime()}`;
		const testMultiBoxName: string = `Test multi box ${getCurrentUnixTime()}`;
		const testMultiItemName: string = `Test multi item ${getCurrentUnixTime()}`;

		await test.step('1. Create and go to Detail of test Area', async () => {
							await homePage.clearAllData(landingPage, settingPage, commonComponent);

			await landingPage.goto('');
			await landingPage.validateShowLandingPage();
			await landingPage.clickBtnOpenAssetApp();
			await commonComponent.bottomNav.validateShowBottomNav();
			await homePage.validateHomePageLoaded();
			await commonComponent.bottomNav.validateShowBottomNav();
			await commonComponent.buttonAdd.validateShowAddButtons();
			await commonComponent.buttonAdd.clickBtnAddMultiple();
			await addEditPage.inputName(testAreaName);
			await addEditPage.selectManualUploadMethod();
			await addEditPage.chooseMutipleImgToUpload([getRandomImgFileOf('Area')]);
			await addEditPage.validateShowMutiplePreviewImg(testAreaName, 1);
			await addEditPage.clickBtnSaveAll();
			await homePage.validateAreaShowOnHomePage(testAreaName);
			await homePage.clickOnArea(testAreaName);
			await commonComponent.detailPage.validateDetailTitleIs(testAreaName);
		});

		await test.step('2. Create new mutiple Area inside this Area', async () => {
			await commonComponent.buttonAdd.clickBtnAddMultiple();
			await commonComponent.buttonAdd.validateShowWhatToAddSection();
			await commonComponent.buttonAdd.clickAddArea();
			await addEditPage.inputName(testMultiAreaName);
			await addEditPage.selectManualUploadMethod();
			await addEditPage.chooseMutipleImgToUpload([
				getRandomImgFileOf('Area'),
				getRandomImgFileOf('Area'),
			]);
			await addEditPage.validateShowMutiplePreviewImg(testMultiAreaName, 2);
			await addEditPage.clickBtnSaveAll();
			await commonComponent.detailPage.validateMutipleAreaDiplaybyName(testMultiAreaName, 2);
		});

		await test.step('3. Create new mutiple Boxes inside this Area', async () => {
			await commonComponent.buttonAdd.clickBtnAddMultiple();
			await commonComponent.buttonAdd.validateShowWhatToAddSection();
			await commonComponent.buttonAdd.clickAddBox();
			await addEditPage.inputName(testMultiBoxName);
			await addEditPage.selectManualUploadMethod();
			await addEditPage.chooseMutipleImgToUpload([
				getRandomImgFileOf('Box'),
				getRandomImgFileOf('Box'),
			]);
			await addEditPage.validateShowMutiplePreviewImg(testMultiBoxName, 2);
			await addEditPage.clickBtnSaveAll();
			await commonComponent.detailPage.validateMutipleBoxDiplaybyName(testMultiBoxName, 2);
		});

		await test.step('4. Create new mutiple Items inside this Area', async () => {
			await commonComponent.buttonAdd.clickBtnAddMultiple();
			await commonComponent.buttonAdd.validateShowWhatToAddSection();
			await commonComponent.buttonAdd.clickAddItem();
			await addEditPage.inputName(testMultiItemName);
			await addEditPage.selectManualUploadMethod();
			await addEditPage.chooseMutipleImgToUpload([
				getRandomImgFileOf('Item'),
				getRandomImgFileOf('Item'),
			]);
			await addEditPage.validateShowMutiplePreviewImg(testMultiItemName, 2);
			await addEditPage.clickBtnSaveAll();
			await commonComponent.detailPage.validateMutipleItemDiplaybyName(testMultiItemName, 2);
			//await commonComponent.detailPage.valdiateHaveAreaBoxItemInside(2, 2, 2);
		});
	});
});
