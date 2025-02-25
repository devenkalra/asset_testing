import { expect } from '@playwright/test';
import { test } from '../src/fixture/core.fixture';
import { getRandomImgFileOf } from '../src/utils/file';
import { getCurrentUnixTime } from '../src/utils/time';
import { faker } from '@faker-js/faker';
import { getRandomBetween } from '../src/utils/random';

test.describe('Area detail test', async () => {
	test('Can add Area, Box, Item inside Area @TC_AREA_01', async ({
		homePage,
		commonComponent,
		addEditPage,
	}) => {
		const testAreaName: string = `Test area ${getCurrentUnixTime()}`;
		const testAreaName2: string = `Test area 2 ${getCurrentUnixTime() + getRandomBetween(1, 10)}`;
		const testBoxName: string = `Test box ${getCurrentUnixTime()}`;
		const testItemName: string = `Test item ${getCurrentUnixTime()}`;
		const desc: string = faker.lorem.sentences();
		let status: number;
		let url: string = '';

		await test.step('1. Create and go to Detail of test Area', async () => {
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
				route.continue();
			});
			await addEditPage.chooseImgToUpload(getRandomImgFileOf('Area'));
			await expect(async () => {
				expect(status).toBe(200);
				expect(url).not.toBe('');
			}).toPass();
			await addEditPage.validateUploadedImgShow(url);
			await addEditPage.clickBtnAddImg();
			await addEditPage.selectLocationType('Area');
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.inputName(testAreaName2);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.inputDescription(desc);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.clickBtnSave();
			await commonComponent.detailPage.validateAreaDiplaybyName(testAreaName2);
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
				route.continue();
			});
			await addEditPage.chooseImgToUpload(getRandomImgFileOf('Box'));
			await expect(async () => {
				expect(status).toBe(200);
				expect(url).not.toBe('');
			}).toPass();
			await addEditPage.validateUploadedImgShow(url);
			await addEditPage.clickBtnAddImg();
			await addEditPage.selectLocationType('Box');
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.inputName(testBoxName);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.inputDescription(desc);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.clickBtnSave();
			await commonComponent.detailPage.validateBoxDiplaybyName(testBoxName);
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
				route.continue();
			});
			await addEditPage.chooseImgToUpload(getRandomImgFileOf('Item'));
			await expect(async () => {
				expect(status).toBe(200);
				expect(url).not.toBe('');
			}).toPass();
			await addEditPage.validateUploadedImgShow(url);
			await addEditPage.clickBtnAddImg();
			await addEditPage.selectLocationType('Item');
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.inputName(testItemName);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.inputDescription(desc);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.clickBtnSave();
			await commonComponent.detailPage.validateItemDiplaybyName(testItemName);
		});
	});

	test('Can add Mutiple Areas, Boxes, Items inside Area @TC_AREA_02', async ({
		homePage,
		commonComponent,
		addEditPage,
	}) => {
		const testAreaName: string = `Test area ${getCurrentUnixTime()}`;
		const testMultiAreaName: string = `Test multi area ${getCurrentUnixTime()}`;
		const testMultiBoxName: string = `Test multi box ${getCurrentUnixTime()}`;
		const testMultiItemName: string = `Test multi item ${getCurrentUnixTime()}`;

		await test.step('1. Create and go to Detail of test Area', async () => {
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
			await homePage.clickOnArea(testAreaName);
			await commonComponent.detailPage.validateDetailTitleIs(testAreaName);
		});

		await test.step('2. Create new mutiple Area inside this Area', async () => {
			await commonComponent.buttonAdd.clickBtnAddMultiple();
			await commonComponent.buttonAdd.validateShowWhatToAddSection();
			await commonComponent.buttonAdd.clickAddArea();
			await addEditPage.inputName(testMultiAreaName);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.selectManualUploadMethod();
			await addEditPage.chooseMutipleImgToUpload([
				getRandomImgFileOf('Area'),
				getRandomImgFileOf('Area'),
			]);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.validateShowMutiplePreviewImg(testMultiAreaName, 2);
			await addEditPage.clickBtnSaveAll();
			await homePage.waitForTimeOut(2000);
			await homePage.reloadCurrentPage();
			await commonComponent.detailPage.validateMutipleAreaDiplaybyName(testMultiAreaName, 2);
		});

		await test.step('3. Create new mutiple Boxes inside this Area', async () => {
			await commonComponent.buttonAdd.clickBtnAddMultiple();
			await commonComponent.buttonAdd.validateShowWhatToAddSection();
			await commonComponent.buttonAdd.clickAddBox();
			await addEditPage.inputName(testMultiBoxName);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.selectManualUploadMethod();
			await addEditPage.chooseMutipleImgToUpload([
				getRandomImgFileOf('Box'),
				getRandomImgFileOf('Box'),
			]);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.validateShowMutiplePreviewImg(testMultiBoxName, 2);
			await addEditPage.clickBtnSaveAll();
			await homePage.waitForTimeOut(2000);
			await homePage.reloadCurrentPage();
			await commonComponent.detailPage.validateMutipleBoxDiplaybyName(testMultiBoxName, 2);
		});

		await test.step('4. Create new mutiple Items inside this Area', async () => {
			await commonComponent.buttonAdd.clickBtnAddMultiple();
			await commonComponent.buttonAdd.validateShowWhatToAddSection();
			await commonComponent.buttonAdd.clickAddItem();
			await addEditPage.inputName(testMultiItemName);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.selectManualUploadMethod();
			await addEditPage.chooseMutipleImgToUpload([
				getRandomImgFileOf('Item'),
				getRandomImgFileOf('Item'),
			]);
			await addEditPage.waitForTimeOut(2000);
			await addEditPage.validateShowMutiplePreviewImg(testMultiItemName, 2);
			await addEditPage.clickBtnSaveAll();
			await homePage.waitForTimeOut(2000);
			await homePage.reloadCurrentPage();
			await commonComponent.detailPage.validateMutipleItemDiplaybyName(testMultiItemName, 2);
		});
	});
});
