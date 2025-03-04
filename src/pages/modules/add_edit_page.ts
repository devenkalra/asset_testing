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
		btnSelectManualUploadMethod: '.media-capture-control-button .lucide-file-plus',
		btnSelectFile: "//div[@class='media-select-container']//button[text()='Select Files']",
		previewImgBySrc: (src: string) => {
			return `//img[@class='capture-preview-img' and contains(@src,'${src}')]`;
		},
		btnAddImg: '.capture-popup .ass-button',
		btnSave: '.bottom-menu .ass-button',
		btnSaveAll: "//button[text()='Save All']",

		// add mutiple
		captureMutipleContainer: '.capture-container',
		listMutipleImgContainer: (imgName: string) => {
			return `//input[@value='${imgName}']/ancestor::div[@class='madd-img-container']`;
		},
	};

	async selectLocationType(locationType: LocationType) {
		await this.selectElementOption(this.locators.dropdownSelectType, locationType);
	}

	async inputName(name: string) {
		await this.inputText(this.locators.txbName, name);
	}

	async inputDescription(description: string) {
		await this.clickLocator(this.locators.txbDescription);
		await this.inputText(this.locators.txbDescription, description);
	}

	async clickIconAddPhoto() {
		await this.clickLocator(this.locators.iconAddPhoto);
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

	async chooseMutipleImgToUpload(listImgPath: string[]) {
		const fileChooserPromise = this.page.waitForEvent('filechooser');
		await this.clickLocator(this.locators.btnSelectFile);
		const fileChooser = await fileChooserPromise;
		await fileChooser.setFiles(listImgPath);
	}

	async validateUploadedImgShow(imgUrl: string) {
		await this.validateElementVisible(this.locators.previewImgBySrc(imgUrl));
	}

	async clickBtnAddImg() {
		await this.clickLocator(this.locators.btnAddImg);
	}

	async clickBtnSave() {
		await this.clickLocator(this.locators.btnSave);
	}

	// add mutiple
	async clickBtnSaveAll() {
		await this.clickLocator(this.locators.btnSaveAll);
	}

	async validateShowMutiplePreviewImg(imgName: string, count: number) {
		await this.validateElementToHaveCount(this.locators.listMutipleImgContainer(imgName), count);
	}
}
