import { test } from '../src/fixture/core.fixture';
import { DOWNLOAD_PATH, getFileFromDownloadDir, getRandomImgFileOf } from '../src/utils/file';
import { getCurrentUnixTime } from '../src/utils/time';

test.describe('Setting test', async () => {
	test('Can export, clear all data and import data correctly @TC_SETTING_01', async ({
		homePage,
		commonComponent,
		addEditPage,
		settingPage,
	}) => {
		const testAreaName: string = `Test area ${getCurrentUnixTime()}`;

		await test.step('1. Create test Area', async () => {
			await homePage.goto('');
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

		await test.step('2. Export current data', async () => {
			await commonComponent.bottomNav.validateShowBottomNav();
			await commonComponent.bottomNav.clickSettingIcon();
			await settingPage.validateShowSettingPage();
			const downloadPromise = settingPage.page.waitForEvent('download');
			await settingPage.clickBtnExport();
			const download = await downloadPromise;
			fileName = download.suggestedFilename();
			await download.saveAs(DOWNLOAD_PATH + download.suggestedFilename());
		});

		await test.step('3. Clear all data, validate home page blank', async () => {
			await settingPage.clickBtnExport();
			await homePage.goto('');
			await homePage.validateNoAreaShowOnHomePage();
		});

		await test.step('4. Import data, validate import data correctly', async () => {
			await settingPage.chooseFileToImport(getFileFromDownloadDir(fileName));
			await homePage.goto('');
			await homePage.validateHomePageHaveArea();
			await homePage.validateAreaShowOnHomePage(testAreaName);
		});
	});
});
