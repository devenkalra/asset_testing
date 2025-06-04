import { expect } from '@playwright/test';
import { DOWNLOAD_PATH, getFileFromDownloadDir, getRandomImgFileOf } from '../../src/utils/file';
import { getCurrentUnixTime } from '../../src/utils/time';
import * as fs from 'fs';
import path from 'path';
import * as undici from 'undici'; // Needed for multipart form-data
import { assetsTest } from '../../src/fixture/assets_app.fixture';

assetsTest.describe('Setting test', async () => {
	assetsTest(
		'Can export, clear all data and import data correctly @TC_SETTING_01',
		async ({ homePage, commonComponent, addEditPage, settingPage, landingPage }) => {
			const testTime = getCurrentUnixTime();
			const testAreaName: string = `Test area ${testTime}`;

			await assetsTest.step('1. Create test Area', async () => {
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
			});
			let fileName: string;

			await assetsTest.step('2. Export current data', async () => {
				await commonComponent.bottomNav.validateShowBottomNav();
				await commonComponent.bottomNav.clickSettingIcon();
				await settingPage.validateShowSettingPage();

				await settingPage.clickBtnExport();

				await settingPage.waitForExportSave();

				let downloadStatus: number;
				await addEditPage.page.route('**/export/**', async (route) => {
					const response = await addEditPage.page.request.fetch(route.request());
					const buffer = await response.body();
					downloadStatus = response.status();
					fileName = `test-export-${testTime}.zip`;
					fileName = `${DOWNLOAD_PATH}/${fileName}`;
					fs.writeFileSync(fileName, buffer);
					console.log('Export file saved as: ', fileName);
					await route.abort();
				});
				await settingPage.clickBtnExport();
				await expect(async () => {
					expect(downloadStatus).toBe(200);
				}).toPass({ timeout: 30000 });
			});

			await assetsTest.step('3. Clear all data, validate home page blank', async () => {
				await settingPage.clickBtnClearAllData();

				await settingPage.validateShowMsgClearItemSuccess();
				await landingPage.goto('');
				await landingPage.validateShowLandingPage();
				await landingPage.clickBtnOpenAssetApp();
				await commonComponent.bottomNav.validateShowBottomNav();
				await homePage.validateHomePageLoaded();
				await homePage.validateNoAreaShowOnHomePage();
			});

			await assetsTest.step('4. Import data, validate import data correctly', async () => {
				let status: number;
				let resMsg: string;
				const fileToImport = fileName;
				//const fileToImport = "/home/deven/code/asset_testing/downloads/import_assetsTest.zip";

				await commonComponent.bottomNav.clickSettingIcon();
				await addEditPage.page.route('**/import/**', async (route) => {
					// Read the file content as a buffer
					const fileBuffer = await fs.promises.readFile(fileToImport);

					// Create a File object from the buffer
					const file = new undici.File([fileBuffer], path.basename(fileName), {
						type: 'application/zip',
					});

					const token = '7';
					const form = new FormData();
					form.append('file', file);

					// Send request
					const response = await fetch(route.request().url(), {
						method: 'POST',
						body: form,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					// Read response body
					const responseBody = await response.json();
					const contentType = response.headers.get('content-type') || 'application/json';
					console.log(responseBody);

					// Let the intercepted request be fulfilled manually
					/*
				await route.fulfill({
					status: response.status,
					contentType,
					body: responseBody,
				});


				 */
				});
				await settingPage.chooseFileToImport(fileToImport);
				/*
			await expect(async () => {
				expect(status).toBe(200);
			}).toPass({ timeout: 50000 }); // long time upload

			await landingPage.goto('');
			await landingPage.validateShowLandingPage();
			await landingPage.clickBtnOpenAssetApp();
			await commonComponent.bottomNav.validateShowBottomNav();
			await homePage.validateHomePageLoaded();
			await homePage.validateHomePageHaveArea();
*/
			});

			await assetsTest.step('[End of all Test]: Clean up all data after testing', async () => {
				// Need to validate
			});
		},
	);
});
