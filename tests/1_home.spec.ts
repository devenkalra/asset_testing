import { expect } from '@playwright/test';
import { test } from '../src/fixture/core.fixture';
import { getRandomImgFileOf } from '../src/utils/file';
import { getCurrentUnixTime } from '../src/utils/time';
import { faker } from '@faker-js/faker';
import { Data_HomeCase1 } from '../src/types/test_data_driven';
import { getRandomBetween } from '../src/utils/random';
import { ACCEPT_SPECIAL_CHAR, INVALID_SPECIAL_CHAR } from '../src/constant/chars';

test.describe('Home test', async () => {
	const dataHome1: Data_HomeCase1[] = [
		{
			testAreaName: `Test area ${getCurrentUnixTime()}`,
			testAreaDesc: faker.lorem.sentences(),
			testAreaName2: `Test area edited ${getCurrentUnixTime()}`,
		},
		{
			testAreaName: `Test area special ${getCurrentUnixTime()} ${ACCEPT_SPECIAL_CHAR[getRandomBetween(0, ACCEPT_SPECIAL_CHAR.length - 1)]}`,
			testAreaDesc: `${faker.lorem.sentences()} ${ACCEPT_SPECIAL_CHAR[getRandomBetween(0, ACCEPT_SPECIAL_CHAR.length - 1)]}`,
			testAreaName2: `Test area edited special ${getCurrentUnixTime()} ${ACCEPT_SPECIAL_CHAR[getRandomBetween(0, ACCEPT_SPECIAL_CHAR.length - 1)]}`,
		},
		{
			testAreaName: `    long     Test area ${getCurrentUnixTime()}                space       `,
			testAreaDesc: `     long        ${faker.lorem.sentences()}         space     `,
			testAreaName2: `     long    Test area edited ${getCurrentUnixTime()}      space    `,
		},
	];

	for (let i = 0; i < dataHome1.length; i++) {
		test(`User can CRUD Area @TC_HOME_0${i + 1} @debug`, async ({
			homePage,
			commonComponent,
			addEditPage,
		}) => {
			let status: number;
			let url: string = '';
			let testAreaName: string = dataHome1[i].testAreaName;
			let testAreaDesc: string = dataHome1[i].testAreaDesc;
			let testAreaName2: string = dataHome1[i].testAreaName2;

			const expectTestAreaName = testAreaName.replace(/\s+/g, ' ').trim();
			const expectTestAreaDesc = testAreaDesc.replace(/\s+/g, ' ').trim();
			const expectTestAreaName2 = testAreaName2.replace(/\s+/g, ' ').trim();

			await test.step('1. Go to Home page', async () => {
				await homePage.goto('');
				await commonComponent.bottomNav.validateShowBottomNav();
			});

			await test.step('2. Successful create an new area', async () => {
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
				await addEditPage.inputName(testAreaName);
				await addEditPage.inputDescription(testAreaDesc);
				await addEditPage.clickBtnSave();
			});

			await test.step('3. Validate new area show on home page', async () => {
				await homePage.validateAreaShowOnHomePage(expectTestAreaName);
			});

			await test.step('4. Go to that area detail page, validate detail page display correct', async () => {
				await homePage.clickOnArea(expectTestAreaName);
				await commonComponent.detailPage.validateShowDetailPage();
				await commonComponent.detailPage.validateDetailTitleIs(expectTestAreaName);
				await commonComponent.detailPage.valdiateHaveAreaBoxItemInside(0, 0, 0);
			});

			await test.step('5. Edit selected area, validate successful editted', async () => {
				await commonComponent.detailPage.clickOnShowOption();
				await commonComponent.detailPage.validateShowActionOptions();
				await commonComponent.detailPage.clickEditOption();
				await addEditPage.inputName(testAreaName2);
				await addEditPage.clickBtnSave();
				await commonComponent.detailPage.validateDetailTitleIs(expectTestAreaName2);
			});

			await test.step('6. Delete selected area, validate successful deleted', async () => {
				await commonComponent.detailPage.clickOnShowOption();
				await commonComponent.detailPage.validateShowActionOptions();
				await commonComponent.detailPage.clickDeleteOption();
				await homePage.validateAreaNotShowOnHomePage(expectTestAreaName2);
			});
		});
	}

	test('User can add multiple Areas @TC_HOME_04', async ({
		homePage,
		commonComponent,
		addEditPage,
	}) => {
		let testAreaName: string = `Test mutiple area ${getCurrentUnixTime()}`;

		await test.step('1. Go to Home page', async () => {
			await homePage.goto('');
			await commonComponent.bottomNav.validateShowBottomNav();
		});

		await test.step('2. Successful create multiple Areas', async () => {
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
	});

	test('User can view or exit fullsize of area @TC_HOME_05', async ({
		homePage,
		commonComponent,
	}) => {
		await test.step('1. Go to Home page', async () => {
			await homePage.goto('');
			await commonComponent.bottomNav.validateShowBottomNav();
		});

		await test.step('2. View fullsize of any area, user will turn into fullsize mode', async () => {
			await homePage.clickOnAnyFullScreenIcon();
			await homePage.validateCurrentStateIsFullScreenImg();
		});

		await test.step('3. Can exit fullsize mode by click on the image', async () => {
			await homePage.clickOnImgOfFullScreen();
			await homePage.validateHomePageHaveArea();
		});
	});

	test('User can show error validation on special characters input @TC_HOME_06', async ({
		homePage,
		commonComponent,
		addEditPage,
	}) => {
		let status: number;
		let url: string = '';
		let testAreaName: string = `Test area ${getCurrentUnixTime()} ${INVALID_SPECIAL_CHAR[getRandomBetween(0, INVALID_SPECIAL_CHAR.length)]}`;
		let testAreaDesc: string = faker.lorem.sentences();

		await test.step('1. Go to Home page', async () => {
			await homePage.goto('');
			await commonComponent.bottomNav.validateShowBottomNav();
		});

		await test.step('2. Successful create an new area', async () => {
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
			await addEditPage.inputName(testAreaName);
			await addEditPage.inputDescription(testAreaDesc);
			await addEditPage.clickBtnSave();
		});

		await test.step('3. Validate show error validation dialog', async () => {
			homePage.page.on('dialog', async (dialog) => {
				expect(dialog.type()).toBe('alert');
				expect(dialog.message()).toContain('error');
				await dialog.dismiss();
			});
		});
	});
});
