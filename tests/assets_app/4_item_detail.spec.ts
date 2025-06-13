import { assetsTest } from '../../src/fixture/assets_app.fixture';
import { getRandomImgFileOf } from '../../src/utils/file';
import { getCurrentUnixTime } from '../../src/utils/time';

assetsTest.describe('Item detail test', async () => {
	assetsTest(
		'Can update item detail @TC_ITEM_01',
		async ({ homePage, detailPage, commonComponent, addEditPage, landingPage, settingPage }) => {
			const testAreaName: string = `Test area ${getCurrentUnixTime()}`;
			const testBoxName: string = `Test box ${getCurrentUnixTime()}`;
			const testItemName: string = `Test item ${getCurrentUnixTime()}`;
			const testItemName2: string = `Test item 2 ${getCurrentUnixTime()}`;
			const testItemName3: string = `Test item 3 ${getCurrentUnixTime()}`;
			const testItemName4: string = `Test item 4 ${getCurrentUnixTime()}`;

			await assetsTest.step('1. Create and go to Detail of test Area', async () => {
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
				await homePage.clickOnArea(testAreaName);
				await commonComponent.detailPage.validateDetailTitleIs(testAreaName);
			});

			await assetsTest.step('2. Create new Item inside this Area and go to detail', async () => {
				await commonComponent.buttonAdd.clickBtnAddMultiple();
				await commonComponent.buttonAdd.validateShowWhatToAddSection();
				await commonComponent.buttonAdd.clickAddItem();
				await addEditPage.inputName(testItemName);
				await addEditPage.selectManualUploadMethod();
				await addEditPage.chooseMutipleImgToUpload([getRandomImgFileOf('Item')]);
				await addEditPage.validateShowMutiplePreviewImg(testItemName, 1);
				await addEditPage.clickBtnSaveAll();
				await commonComponent.detailPage.validateItemDiplaybyName(testItemName);
			});

			await assetsTest.step('3. Can update and delete item inside area', async () => {
				await commonComponent.detailPage.clickOnLocationByName(testItemName);
				await commonComponent.detailPage.validateDetailTitleIs(testItemName);
				await commonComponent.detailPage.clickOnShowOption();
				await commonComponent.detailPage.validateShowActionOptions();
				await commonComponent.detailPage.clickEditOption();
				await addEditPage.inputName(testItemName2);
				await addEditPage.blurToBody();
				await addEditPage.clickBtnSave();
				await detailPage.hasTitle(testItemName2);
				await commonComponent.detailPage.clickOnShowOption();
				await commonComponent.detailPage.validateShowActionOptions();
				await commonComponent.detailPage.clickDeleteOption();
				await commonComponent.detailPage.validateDetailTitleIs(testAreaName);
			});

			await assetsTest.step('4. Create new Box inside this Area', async () => {
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

			await assetsTest.step('5. Go to detail of box, create item inside that box', async () => {
				await commonComponent.detailPage.clickOnLocationByName(testBoxName);
				await commonComponent.detailPage.validateDetailTitleIs(testBoxName);
				await commonComponent.buttonAdd.clickBtnAddMultiple();
				await commonComponent.buttonAdd.validateShowWhatToAddSection();
				await commonComponent.buttonAdd.clickAddItem();
				await addEditPage.inputName(testItemName3);
				await addEditPage.selectManualUploadMethod();
				await addEditPage.chooseMutipleImgToUpload([getRandomImgFileOf('Item')]);
				await addEditPage.validateShowMutiplePreviewImg(testItemName3, 1);
				await addEditPage.clickBtnSaveAll();
				await commonComponent.detailPage.validateItemDiplaybyName(testItemName3);
			});

			await assetsTest.step(
				'6. Go to detail of item, verify can update and delete that item',
				async () => {
					await commonComponent.detailPage.clickOnLocationByName(testItemName3);
					await commonComponent.detailPage.validateDetailTitleIs(testItemName3);
					await commonComponent.detailPage.clickOnShowOption();
					await commonComponent.detailPage.validateShowActionOptions();
					await commonComponent.detailPage.clickEditOption();
					await addEditPage.inputName(testItemName4);
					await addEditPage.blurToBody();
					await addEditPage.clickBtnSave();
					await commonComponent.detailPage.validateDetailTitleIs(testItemName4);
					await commonComponent.detailPage.clickOnShowOption();
					await commonComponent.detailPage.validateShowActionOptions();
					await commonComponent.detailPage.clickDeleteOption();
					await commonComponent.detailPage.validateDetailTitleIs(testBoxName);
				},
			);
		},
	);
});
