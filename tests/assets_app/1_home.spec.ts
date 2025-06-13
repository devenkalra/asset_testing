import { expect } from '@playwright/test';
import { getRandomImgFileOf } from '../../src/utils/file';
import { getCurrentUnixTime } from '../../src/utils/time';
import { faker } from '@faker-js/faker';
import { Data_HomeCase1 } from '../../src/types/test_data_driven';
import { getRandomBetween } from '../../src/utils/random';
import { ACCEPT_SPECIAL_CHAR, INVALID_SPECIAL_CHAR } from '../../src/constant/chars';
import { assetsTest } from '../../src/fixture/assets_app.fixture';

assetsTest.describe('Home test', async () => {
	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const dataHome1: Data_HomeCase1[] = [
		// {
		// 	testAreaName: `Test area ${getCurrentUnixTime()}`,
		// 	testAreaDesc: faker.lorem.sentences(),
		// 	testAreaName2: `Test area edited ${getCurrentUnixTime()}`,
		// },
		{
			testAreaName: `Test area special ${getCurrentUnixTime()} ${ACCEPT_SPECIAL_CHAR[getRandomBetween(0, ACCEPT_SPECIAL_CHAR.length - 1)]}`,
			testAreaDesc: `${faker.lorem.sentences()} ${ACCEPT_SPECIAL_CHAR[getRandomBetween(0, ACCEPT_SPECIAL_CHAR.length - 1)]}`,
			testAreaName2: `Test area edited special ${getCurrentUnixTime()} ${ACCEPT_SPECIAL_CHAR[getRandomBetween(0, ACCEPT_SPECIAL_CHAR.length - 1)]}`,
		},
		// {
		// 	testAreaName: `    long     Test area ${getCurrentUnixTime()}                space       `,
		// 	testAreaDesc: `     long        ${faker.lorem.sentences()}         space     `,
		// 	testAreaName2: `     long    Test area edited ${getCurrentUnixTime()}      space    `,
		// },
	];

	for (let i = 0; i < dataHome1.length; i++) {
		assetsTest(
			`User can CRUD Area @TC_HOME_0${i + 1} @TC_HOME_123`,
			async ({ settingPage, homePage, detailPage, commonComponent, addEditPage, landingPage }) => {
				let status: number;
				let url: string = '';
				let testAreaName: string = dataHome1[i].testAreaName;
				let testAreaDesc: string = dataHome1[i].testAreaDesc;
				let testAreaName2: string = dataHome1[i].testAreaName2;

				const expectTestAreaName = testAreaName.replace(/\s+/g, ' ').trim();
				const expectTestAreaDesc = testAreaDesc.replace(/\s+/g, ' ').trim();
				const expectTestAreaName2 = testAreaName2.replace(/\s+/g, ' ').trim();

				await assetsTest.step('1. Go to Home page', async () => {
					await homePage.gotoHomePage();
					await homePage.clearAllData(landingPage, settingPage, commonComponent);
					await homePage.gotoHomePage();
					await homePage.validateHomePageLoaded();
				});

				await assetsTest.step('2. Successful create an new area', async () => {
					await commonComponent.buttonAdd.validateShowAddButtons();
					await commonComponent.buttonAdd.clickBtnAddSingle();

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
					});
					await addEditPage.chooseImgToUpload(getRandomImgFileOf('Area'));
					await expect(async () => {
						expect(status).toBe(200);
						expect(url).not.toBe('');
					}).toPass();
					await addEditPage.validateUploadedImgShow(url);
					await addEditPage.clickBtnAddImg();

					await addEditPage.selectLocationType('Area');
					await addEditPage.inputName(testAreaName);
					await addEditPage.inputDescription(testAreaDesc);
					await addEditPage.clickBtnSave();
					await addEditPage.blurToBody();
				});

				await assetsTest.step('3. Validate new area show on home page', async () => {
					await homePage.validateAreaShowOnHomePage(expectTestAreaName);
				});

				await assetsTest.step(
					'4. Go to that area detail page, validate detail page display correct',
					async () => {
						await homePage.clickOnArea(expectTestAreaName);
						await commonComponent.detailPage.validateShowDetailPage();
						await commonComponent.detailPage.validateDetailTitleIs(expectTestAreaName);
						await commonComponent.detailPage.valdiateHaveAreaBoxItemInside(0, 0, 0);
					},
				);

				await assetsTest.step('5. Edit selected area, validate successful editted', async () => {
					await commonComponent.detailPage.clickOnShowOption();
					await commonComponent.detailPage.validateShowActionOptions();
					await commonComponent.detailPage.clickEditOption();
					await addEditPage.inputName(testAreaName2);
					await sleep(1000);
					console.log(await addEditPage.getName(testAreaName2));
					await addEditPage.clickBtnSave();
					await addEditPage.sleep(1000);
					await detailPage.hasTitle(testAreaName2);
				});

				await assetsTest.step('6. Delete selected area, validate successful deleted', async () => {
					await commonComponent.bottomNav.clickHomeIcon();
					await homePage.clickOnArea(testAreaName2);
					await commonComponent.detailPage.validateDetailTitleIs(expectTestAreaName2);
					await commonComponent.detailPage.clickOnShowOption();
					await commonComponent.detailPage.validateShowActionOptions();
					await commonComponent.detailPage.clickDeleteOption();
					await homePage.validateHomePageLoaded();
					await homePage.validateAreaNotShowOnHomePage(expectTestAreaName2);
				});
			},
		);
	}

	assetsTest(
		'User can add multiple Areas @TC_HOME_04',
		async ({ settingPage, homePage, commonComponent, addEditPage, landingPage }) => {
			let testAreaName: string = `Test mutiple area ${getCurrentUnixTime()}`;

			await assetsTest.step('1. Go to Home page', async () => {
				await homePage.gotoHomePage();
				await homePage.validateHomePageLoaded();
				await homePage.validateHomePageLoaded();
			});

			await assetsTest.step('2. Successful create multiple Areas', async () => {
				await commonComponent.buttonAdd.validateShowAddButtons();
				await commonComponent.buttonAdd.clickBtnAddMultiple();
				await addEditPage.inputName(testAreaName);
				await addEditPage.selectManualUploadMethod();
				await addEditPage.chooseMutipleImgToUpload([
					getRandomImgFileOf('Area'),
					getRandomImgFileOf('Area'),
				]);
				await addEditPage.validateShowMutiplePreviewImg(testAreaName, 2);
				await addEditPage.clickBtnSaveAll();
				await homePage.validateShowMultipleAreaFor(testAreaName, 2);
			});
		},
	);

	assetsTest(
		'User can view or exit fullsize of area @TC_HOME_05',
		async ({ settingPage, homePage, commonComponent, landingPage }) => {
			await assetsTest.step('1. Go to Home page', async () => {
				await homePage.gotoHomePage();
				await homePage.validateHomePageLoaded();
				await commonComponent.bottomNav.validateShowBottomNav();
			});

			await assetsTest.step(
				'2. View fullsize of any area, user will turn into fullsize mode',
				async () => {
					await homePage.clickOnAnyFullScreenIcon();
					await homePage.validateCurrentStateIsFullScreenImg();
				},
			);

			await assetsTest.step('3. Can exit fullsize mode by click on the image', async () => {
				await homePage.clickOnImgOfFullScreen();
				await homePage.validateHomePageHaveArea();
			});
		},
	);

	assetsTest(
		'User can create with special characters @TC_HOME_06',
		async ({ homePage, commonComponent, addEditPage, landingPage }) => {
			let status: number;
			let url: string = '';
			let testAreaName: string = `Test area ${getCurrentUnixTime()} ${INVALID_SPECIAL_CHAR[getRandomBetween(0, INVALID_SPECIAL_CHAR.length - 1)]}`;
			let testAreaDesc: string = faker.lorem.sentences();

			await assetsTest.step('1. Go to Home page', async () => {
				await homePage.gotoHomePage();
				await homePage.validateHomePageLoaded();
				await commonComponent.bottomNav.validateShowBottomNav();
			});

			await assetsTest.step('2. Successful create an new area', async () => {
				await commonComponent.buttonAdd.validateShowAddButtons();
				await commonComponent.buttonAdd.clickBtnAddSingle();

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
				});
				await addEditPage.chooseImgToUpload(getRandomImgFileOf('Area'));
				await expect(async () => {
					expect(status).toBe(200);
					expect(url).not.toBe('');
				}).toPass();
				await addEditPage.validateUploadedImgShow(url);

				await addEditPage.clickBtnAddImg();

				await addEditPage.selectLocationType('Area');
				await addEditPage.inputName(testAreaName);
				await addEditPage.inputDescription(testAreaDesc);
				await addEditPage.clickBtnSave();
				await addEditPage.sleep(1000);
				await homePage.validateAreaShowOnHomePage(testAreaName);
			});
		},
	);
});
