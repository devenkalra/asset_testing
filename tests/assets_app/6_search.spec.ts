import { assetsTest } from '../../src/fixture/assets_app.fixture';
import { getRandomImgFileOf } from '../../src/utils/file';
import { getCurrentUnixTime } from '../../src/utils/time';

assetsTest.describe('Search test', async () => {
	assetsTest('Can search for Correct Item @TC_SEARCH_01', async ({
		homePage,
		commonComponent,
		addEditPage,
		searchPage,
		landingPage,
		settingPage,
	}) => {
		const testAreaName: string = `Test area ${getCurrentUnixTime()}`;

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

		await assetsTest.step('2. Go to search page and search for created area', async () => {
			await commonComponent.bottomNav.validateShowBottomNav();
			await commonComponent.bottomNav.clickSearchIcon();
			await searchPage.validateShowSearchPage();
			await searchPage.inputToSearchBox(testAreaName);
			await searchPage.performSearch();
			await searchPage.validateSearchHaveResult();
			await searchPage.validateLocationShowOnSearchResult(testAreaName);
		});

		await assetsTest.step('3. Validate search return correct result', async () => {
			await searchPage.validateSearchHaveResult();
			await searchPage.validateLocationShowOnSearchResult(testAreaName);
		});
	});
});
