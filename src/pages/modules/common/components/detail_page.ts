import { expect, Page } from '@playwright/test';
import { BasePage } from '../../../base_page';

export class DetailPage extends BasePage {
	constructor(page: Page, domain: string) {
		super(page, domain);
	}

	private locators = {
		headingName: '.view-heading span span',
		arrowLeft: '.item-header .lucide-circle-arrow-left',
		arrowUp: '.item-header .lucide-circle-arrow-up',
		arrowRight: '.item-header .lucide-circle-arrow-right',
		iconShowOption: '.item-header .lucide-ellipsis',
		txtDescription:
			"//div[@class='view-label' and contains(text(), 'Description')]/following::div[@class='view-value']",
		totalArea: '.hd-img-container+div span:has(.lucide-land-plot)',
		totalBox: '.hd-img-container+div span:has(.lucide-archive)',
		totalItem: '.hd-img-container+div span:has(.lucide-hexagon)',
		optionPanel: "//div[@class='animated-div']",
		editSelection: "//div[@class='animated-div']//div[text()='Edit']",
		deleteSelection: "//div[@class='animated-div']//div[text()='Delete']",
		moveSelection: "//div[@class='animated-div']//div[text()='Move']",
		cancelSelection: "//div[@class='animated-div']//div[text()='Cancel']",
		listAreaContainer: "//div[contains(text(), 'Areas')]/ancestor::div[@class='children-sub-area']",
		listBoxContainer: "//div[contains(text(), 'Boxes')]/ancestor::div[@class='children-sub-area']",
		listItemContainer: "//div[contains(text(), 'Items')]/ancestor::div[@class='children-sub-area']",
		listLocations: '.children-sub-area .child-img-3-container',
		locationByName: (locName: string) => {
			return `//div[@class='child-img-3-container'][div[@class='child-caption-overlay' and text()='${locName}']]`;
		},
	};

	async validateShowDetailPage() {
		await this.validateElementVisible(this.locators.headingName);
		await this.validateElementVisible(this.locators.arrowLeft);
		await this.validateElementVisible(this.locators.arrowUp);
		await this.validateElementVisible(this.locators.arrowRight);
	}

	async validateDetailTitleIs(title: string) {
		await this.validateElementHaveText(this.locators.headingName, title);
	}

	async valdiateHaveAreaBoxItemInside(noArea: number, noBox: number, noItem: number) {
		await this.validateElementHaveText(this.locators.totalArea, noArea.toString());
		await this.validateElementHaveText(this.locators.totalBox, noBox.toString());
		await this.validateElementHaveText(this.locators.totalItem, noItem.toString());
	}

	async clickOnShowOption() {
		await this.clickLocator(this.locators.iconShowOption);
	}

	async validateShowActionOptions() {
		await this.validateElementVisible(this.locators.editSelection);
		await this.validateElementVisible(this.locators.deleteSelection);
		await this.validateElementVisible(this.locators.moveSelection);
		await this.validateElementVisible(this.locators.cancelSelection);
	}

	async clickEditOption() {
		await this.clickLocator(this.locators.editSelection);
	}

	async clickDeleteOption() {
		await this.clickLocator(this.locators.deleteSelection);
	}

	async validateAreaDiplaybyName(areaName: string) {
		await expect(
			this.getLocator(this.locators.listAreaContainer).locator(
				this.locators.locationByName(areaName),
			),
		).toBeVisible();
	}

	async validateMutipleAreaDiplaybyName(areaName: string, count: number) {
		await expect(
			this.getLocator(this.locators.listAreaContainer).locator(
				this.locators.locationByName(areaName),
			),
		).toHaveCount(count);
	}

	async validateBoxDiplaybyName(boxName: string) {
		await expect(
			this.getLocator(this.locators.listBoxContainer).locator(
				this.locators.locationByName(boxName),
			),
		).toBeVisible();
	}

	async validateMutipleBoxDiplaybyName(boxName: string, count: number) {
		await expect(
			this.getLocator(this.locators.listBoxContainer).locator(
				this.locators.locationByName(boxName),
			),
		).toHaveCount(count);
	}

	async validateItemDiplaybyName(areaName: string) {
		await expect(
			this.getLocator(this.locators.listItemContainer).locator(
				this.locators.locationByName(areaName),
			),
		).toBeVisible();
	}

	async validateMutipleItemDiplaybyName(itemName: string, count: number) {
		await expect(
			this.getLocator(this.locators.listItemContainer).locator(
				this.locators.locationByName(itemName),
			),
		).toHaveCount(count);
	}
}
