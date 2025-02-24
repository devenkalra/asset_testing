import { Page } from '@playwright/test';
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
}
