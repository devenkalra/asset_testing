import { assetsTest } from '../../src/fixture/assets_app.fixture';
import { getRandomImgFileOf } from '../../src/utils/file';
import { getCurrentUnixTime } from '../../src/utils/time';

assetsTest.describe('Navigation test', async () => {
	assetsTest(
		'Can navigate Left, Right, Outside correct @TC_NAV_01',
		async ({ homePage, commonComponent, addEditPage, settingPage, landingPage }) => {
			const testAreaName: string = `Test area ${getCurrentUnixTime()}`;
			const testAreaName2: string = `Test area 2 ${getCurrentUnixTime()}`;
			const testBoxName: string = `Test box ${getCurrentUnixTime()}`;

			await assetsTest.step('1. Create 2 test Areas', async () => {
				await homePage.gotoHomePage();
				await homePage.clearAllData(landingPage, settingPage, commonComponent);
				await homePage.validateHomePageLoaded();
				await homePage.gotoHomePage();

				await commonComponent.buttonAdd.clickBtnAddMultiple();
				await addEditPage.inputName(testAreaName);
				await addEditPage.selectManualUploadMethod();
				await addEditPage.chooseMutipleImgToUpload([getRandomImgFileOf('Area')]);
				await addEditPage.validateShowMutiplePreviewImg(testAreaName, 1);
				await addEditPage.clickBtnSaveAll();
				await homePage.validateAreaShowOnHomePage(testAreaName);

				await commonComponent.buttonAdd.clickBtnAddMultiple();
				await addEditPage.inputName(testAreaName2);
				await addEditPage.selectManualUploadMethod();
				await addEditPage.chooseMutipleImgToUpload([getRandomImgFileOf('Area')]);
				await addEditPage.validateShowMutiplePreviewImg(testAreaName2, 1);
				await addEditPage.clickBtnSaveAll();
				await homePage.validateAreaShowOnHomePage(testAreaName2);
			});

			await assetsTest.step('2. Create new Box inside Area 1', async () => {
				await homePage.clickOnArea(testAreaName);
				await commonComponent.detailPage.validateDetailTitleIs(testAreaName);
				await commonComponent.buttonAdd.clickBtnAddMultiple();
				await commonComponent.buttonAdd.validateShowWhatToAddSection();
				await commonComponent.buttonAdd.clickAddBox();
				await addEditPage.inputName(testBoxName);
				await addEditPage.selectManualUploadMethod();
				await addEditPage.chooseMutipleImgToUpload([getRandomImgFileOf('Box')]);
				await addEditPage.validateShowMutiplePreviewImg(testBoxName, 1);
				await addEditPage.clickBtnSaveAll();
				await commonComponent.detailPage.validateBoxDiplaybyName(testBoxName);
			});

			await assetsTest.step(
				'3. Go to detail of box, validate can back to Area from Box inside',
				async () => {
					await commonComponent.detailPage.clickOnLocationByName(testBoxName);
					await commonComponent.detailPage.validateDetailTitleIs(testBoxName);
					await commonComponent.detailPage.clickArrowUp();
					await commonComponent.detailPage.validateDetailTitleIs(testAreaName);
				},
			);

			await assetsTest.step(
				'4. Go right and left, validate application navigate correct',
				async () => {
					await commonComponent.detailPage.clickArrowRight();
					await commonComponent.detailPage.validateDetailTitleIs(testAreaName2);
					await commonComponent.detailPage.clickArrowLeft();
					await commonComponent.detailPage.validateDetailTitleIs(testAreaName);
				},
			);
		},
	);

	assetsTest(
		'3 bottom navigation icons working correct @TC_NAV_02',
		async ({ homePage, commonComponent, searchPage, landingPage, settingPage }) => {
			await assetsTest.step('1. Can navigate to Search by bottom navigation', async () => {
				await homePage.gotoHomePage();

				await commonComponent.bottomNav.clickSettingIcon();
				await settingPage.validateShowSettingPage();
				await settingPage.clickBtnClearAllData();
				//await settingPage.validateShowMsgClearItemSuccess();
				await commonComponent.bottomNav.clickHomeIcon();

				await commonComponent.bottomNav.validateShowBottomNav();
				await commonComponent.bottomNav.clickSearchIcon();
				await searchPage.validateShowSearchPage();
			});

			await assetsTest.step('2. Can navigate to Setting page by bottom navigation', async () => {
				await homePage.gotoHomePage();
				await commonComponent.bottomNav.clickSettingIcon();
				await settingPage.validateShowSettingPage();
			});
		},
	);
});
