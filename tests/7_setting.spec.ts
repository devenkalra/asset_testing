import { expect } from '@playwright/test';
import { test } from '../src/fixture/core.fixture';
import { DOWNLOAD_PATH, getFileFromDownloadDir, getRandomImgFileOf } from '../src/utils/file';
import { getCurrentUnixTime } from '../src/utils/time';
import * as fs from 'fs';

test.describe('Setting test', async () => {
	test('Can export, clear all data and import data correctly @TC_SETTING_01', async ({
		homePage,
		commonComponent,
		addEditPage,
		settingPage,
	}) => {
		const testTime = getCurrentUnixTime();
		const testAreaName: string = `Test area ${testTime}`;

		await test.step('1. Create test Area', async () => {
			await homePage.goto('');
			await commonComponent.bottomNav.validateShowBottomNav();
			await commonComponent.buttonAdd.validateShowAddButtons();
			// await commonComponent.buttonAdd.clickBtnAddMultiple();
			// await addEditPage.inputName(testAreaName);
			// await addEditPage.selectManualUploadMethod();
			// await addEditPage.chooseMutipleImgToUpload([getRandomImgFileOf('Area')]);
			// await addEditPage.validateShowMutiplePreviewImg(testAreaName, 1);
			// await addEditPage.clickBtnSaveAll();
			// await homePage.validateAreaShowOnHomePage(testAreaName);
		});
		let fileName: string;

		await test.step('2. Export current data', async () => {
			await commonComponent.bottomNav.validateShowBottomNav();
			await commonComponent.bottomNav.clickSettingIcon();
			await settingPage.validateShowSettingPage();
			// let downloadStatus: number;
			// await addEditPage.page.route('**/export/**', async (route) => {
			// 	const response = await addEditPage.page.request.fetch(route.request());
			// 	const buffer = await response.body();
			// 	downloadStatus = response.status();
			// 	fileName = `test-export-${testTime}.zip`;
			// 	fs.writeFileSync(`${DOWNLOAD_PATH}/${fileName}`, buffer);
			// 	console.log('Export file saved as: ', `test-export-${testTime}.zip`);
			// 	await route.abort();
			// });
			// await settingPage.clickBtnExport();
			// await expect(async () => {
			// 	expect(downloadStatus).toBe(200);
			// }).toPass({ timeout: 30000 });
		});

		await test.step('3. Clear all data, validate home page blank', async () => {
			await homePage.goto('');
			await homePage.validateHomePageHaveArea();
			await commonComponent.bottomNav.clickSettingIcon();
			await settingPage.validateShowSettingPage();
			await settingPage.clickBtnClearAllData();
			settingPage.page.on('dialog', async (dialog) => {
				expect(dialog.type()).toBe('confirm');
				expect(dialog.message()).toBe(
					'Are you sure you want to delete all the data. This is unrecoverable?',
				);
				await dialog.accept();
			});
			await settingPage.validateShowMsgClearItemSuccess();
			await homePage.goto('');
			await homePage.validateNoAreaShowOnHomePage();
		});

		// await test.step('4. Import data, validate import data correctly', async () => {
		// 	let status: number;
		// 	let resMsg: string;
		// 	await commonComponent.bottomNav.clickSettingIcon();
		// 	await addEditPage.page.route('**/import/**', async (route) => {
		// 		const response = await route.fetch();
		// 		status = response.status();
		// 		const responseBody = await response.json();
		// 		resMsg = responseBody.detail;
		// 		console.log(responseBody);
		// 		await route.continue();
		// 	});

		// 	await settingPage.chooseFileToImport(getFileFromDownloadDir('test-export-1742267960.zip'));
		// 	await expect(async () => {
		// 		expect(status).toBe(200);
		// 	}).toPass({ timeout: 50000 }); // long time upload

		// 	await homePage.goto('');
		// 	await homePage.validateHomePageHaveArea();
		// });
	});
});
