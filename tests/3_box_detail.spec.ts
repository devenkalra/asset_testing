import { test } from '../src/fixture/core.fixture';
import { getRandomImgFileOf } from '../src/utils/file';
import { getCurrentUnixTime } from '../src/utils/time';

test.describe('Box detail test', async () => {
	test('Can CRUD box @TC_BOX_01', async ({
		settingPage,
		homePage,
		commonComponent,
		addEditPage,
		landingPage,
	}) => {
		const testAreaName: string = `Test area ${getCurrentUnixTime()}`;
		const testBoxName: string = `Test box ${getCurrentUnixTime()}`;
		const testBoxName2: string = `Test box 2 ${getCurrentUnixTime()}`;
		const testBoxName3: string = `Test box 3 inside box 2 ${getCurrentUnixTime()}`;
		const testItemName: string = `Test item ${getCurrentUnixTime()}`;

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
			await addEditPage.blurToBody();
			await addEditPage.clickBtnSaveAll();
			await homePage.validateAreaShowOnHomePage(testAreaName);
			await homePage.clickOnArea(testAreaName);
			await commonComponent.detailPage.validateDetailTitleIs(testAreaName);
		});

		await test.step('2. Create new Box inside this Area', async () => {
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

		await test.step('3. Go to detail of box, update that box', async () => {
			await commonComponent.detailPage.clickOnLocationByName(testBoxName);
			await commonComponent.detailPage.validateDetailTitleIs(testBoxName);
			await commonComponent.detailPage.clickOnShowOption();
			await commonComponent.detailPage.validateShowActionOptions();
			await commonComponent.detailPage.clickEditOption();
			await addEditPage.inputName(testBoxName2);
			await addEditPage.clickBtnSave();
			await commonComponent.detailPage.validateDetailTitleIs(testBoxName2);
		});

		await test.step('4. Can create new Box inside this Box', async () => {
			await commonComponent.buttonAdd.clickBtnAddMultiple();
			await commonComponent.buttonAdd.validateShowWhatToAddSection();
			await commonComponent.buttonAdd.clickAddBox();
			await addEditPage.inputName(testBoxName3);
			await addEditPage.selectManualUploadMethod();
			await addEditPage.chooseMutipleImgToUpload([getRandomImgFileOf('Box')]);
			await addEditPage.validateShowMutiplePreviewImg(testBoxName3, 1);
			await addEditPage.clickBtnSaveAll();

			await commonComponent.detailPage.validateBoxDiplaybyName(testBoxName3);
		});

		await test.step('5. Can create new Item inside this 2nd Box', async () => {
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

		await test.step('6. Can delete Box inside this 2nd Box', async () => {
			await commonComponent.detailPage.clickOnLocationByName(testBoxName3);
			await commonComponent.detailPage.validateDetailTitleIs(testBoxName3);
			await commonComponent.detailPage.clickOnShowOption();
			await commonComponent.detailPage.validateShowActionOptions();
			await commonComponent.detailPage.clickDeleteOption();
			await commonComponent.detailPage.validateDetailTitleIs(testBoxName2);
			await commonComponent.detailPage.validateLocationNotDisplayByName(testBoxName3);
		});

		await test.step('7. Can delete Item inside this 2nd Box', async () => {
			await commonComponent.detailPage.clickOnLocationByName(testItemName);
			await commonComponent.detailPage.validateDetailTitleIs(testItemName);
			await commonComponent.detailPage.clickOnShowOption();
			await commonComponent.detailPage.validateShowActionOptions();
			await commonComponent.detailPage.clickDeleteOption();
			await commonComponent.detailPage.validateDetailTitleIs(testBoxName2);
			await commonComponent.detailPage.validateLocationNotDisplayByName(testItemName);
		});

		await test.step('8. Can delete 2nd box will return parent area', async () => {
			await commonComponent.detailPage.clickOnShowOption();
			await commonComponent.detailPage.validateShowActionOptions();
			await commonComponent.detailPage.clickDeleteOption();
			await commonComponent.detailPage.validateDetailTitleIs(testAreaName);
			await commonComponent.detailPage.validateLocationNotDisplayByName(testBoxName2);
		});
	});
});
