import { test } from '../src/fixture/core.fixture';
import { getRandomImgFileOf } from '../src/utils/file';
import { getCurrentUnixTime } from '../src/utils/time';

test.describe('Search test', async () => {
	test('Can search for Correct Item @TC_SEARCH_01', async ({
		homePage,
		commonComponent,
		addEditPage,
		searchPage,
		landingPage,
	}) => {
		const testAreaName: string = `Test area ${getCurrentUnixTime()}`;

		await test.step('1. Create test Area', async () => {
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
		});

		await test.step('2. Go to search page and search for created area', async () => {
			await commonComponent.bottomNav.validateShowBottomNav();
			await commonComponent.bottomNav.clickSearchIcon();
			await searchPage.validateShowSearchPage();
			await searchPage.inputToSearchBox(testAreaName);
			await searchPage.performSearch();
			await searchPage.validateSearchHaveResult();
			await searchPage.validateLocationShowOnSearchResult(testAreaName);
		});

		await test.step('3. Validate search return correct result', async () => {
			await searchPage.validateSearchHaveResult();
			await searchPage.validateLocationShowOnSearchResult(testAreaName);
		});
	});
});
