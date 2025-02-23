import { Page, expect } from '@playwright/test';

import { BasePage } from '../base_page';
import { LocationType } from '../../types/app';

export class AddEditPage extends BasePage {
	constructor(page: Page, domain: string) {
		super(page, domain);
	}
	private locators = {
		btnExit: "//button[text()='X']",
		dropdownSelectType: 'select.add-value',
		txbName: 'input#name',
		txbDescription: 'textarea#description',
		iconAddPhoto: 'div.add-label+div svg',
		popupUploadImage: '.capture-popup',
		btnClosePopupUpload: '.popup-close-icon',
		btnSelectManualUploadMethod: "//button[@class='media-capture-control-button'][2]",
		btnSelectFile: "//div[@class='media-select-container']//button[text()='Select Files']",
		previewImgBySrc: (src: string) => {
			return `//img[@class='capture-preview-img' and contains(@src,'${src}')]`;
		},
		btnAddImg: '.capture-popup .ass-button',
		btnSave: '.bottom-menu .ass-button',
	};

	async selectLocationType(locationType: LocationType) {
		await this.selectElementOption(this.locators.dropdownSelectType, locationType);
	}

	async inputName(name: string) {
		await this.inputText(this.locators.txbName, name);
	}

	async inputDescription(description: string) {
		await this.inputText(this.locators.txbDescription, description);
	}

	async clickIconAddPhoto() {
		await this.clickLocator(this.locators.iconAddPhoto);
		await this.clickLocator(this.locators.iconAddPhoto); // BUG: Need click 2 time to trigger
	}

	async validatePopupUploadImageShow() {
		await this.validateElementVisible(this.locators.popupUploadImage);
	}

	async selectManualUploadMethod() {
		await this.clickLocator(this.locators.btnSelectManualUploadMethod);
	}

	async chooseImgToUpload(imgPath: string) {
		const fileChooserPromise = this.page.waitForEvent('filechooser');
		await this.clickLocator(this.locators.btnSelectFile);
		const fileChooser = await fileChooserPromise;
		await fileChooser.setFiles(imgPath);
	}

	async validateUploadedImgShow(imgUrl: string) {
		await this.validateElementVisible(this.locators.previewImgBySrc(imgUrl));
	}

	async clickBtnAddImg() {
		await this.clickLocator(this.locators.btnAddImg);
	}

	async clickBtnSave() {
		await this.clickLocator(this.locators.btnSave);
		await this.clickLocator(this.locators.btnSave); // BUG: Need click 2 time to trigger
	}
}
