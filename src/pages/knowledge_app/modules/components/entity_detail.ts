import { Page, expect } from '@playwright/test';

import { BasePage } from '../../../base_page';
import { getRandomIndex } from '../../../../utils/random';

type RelationShip = {
	relationType: string;
	relationWith: string;
};

export class EntityDetail extends BasePage {
	constructor(page: Page, domain: string, context: any = null) {
		super(page, domain, context);
	}

	private locators = {
		entityDetailPanel: '.right-column .column-content',
		entityTitleOf: (entityName: string, entityType: string) => {
			return `//div[@panelType='EntityEdit']//b[text()='${entityName}' and text()='${entityType}']`;
		},
		panelOfField: (fieldName: string) => {
			return `//span[text()='${fieldName}']/ancestor::div[@type='attributeDisplay']`;
		},
		btnGoToDetailView: "//div[@panelType='EntityEdit']//a[text()='Details']",
		btnGoToRelationsView: "//div[@panelType='EntityDetail']//a[text()='Relations']",
		btnAddRelation: "//div[@type='RelationList']//div[text()='Add Relation']",
		dropDownSelectTypeRelation: '#RelationSelect_1',
		listTypeRelation: '#RelationSelect_1 option',
		inputSearchRelation: 'td:has(#RelationSelect_1)+td input',
		listSearchResult: 'td:has(#RelationSelect_1)+td input+ul li',
		btnSaveRelation: "//div[@type='RelationList']//button[text()='Save']",
		listRelationShip: "//div[@type='RelationList']//table//tr",
	};

	async validateShowEntityDetailPanel() {
		await this.validateElementVisible(this.locators.entityDetailPanel);
	}

	async validateShowEntityTitleOf(entityName: string, entityType: string) {
		await this.validateElementVisible(this.locators.entityTitleOf(entityName, entityType));
	}

	async validateShowField(fieldName: string) {
		await this.validateElementVisible(this.locators.panelOfField(fieldName));
	}

	async clickBtnGotoDetailView() {
		await this.clickLocator(this.locators.btnGoToDetailView);
	}

	async clickBtnGotoRelationsView() {
		await this.clickLocator(this.locators.btnGoToRelationsView);
	}

	async clickBtnAddRelation() {
		await this.clickLocator(this.locators.btnAddRelation);
	}

	async validateShowInputRelation() {
		await this.validateElementVisible(this.locators.dropDownSelectTypeRelation);
		await this.validateElementVisible(this.locators.inputSearchRelation);
	}

	async getRandomRelationType() {
		const listRelationType = await this.getLocators(this.locators.listTypeRelation).allInnerTexts();
		// return listRelationType[getRandomIndex(listRelationType.length)];
		return listRelationType[getRandomIndex(8)]; // advoid relation other type than person. force only person selected
	}

	async selectRelationType(relationType: string) {
		await this.selectElementOption(this.locators.dropDownSelectTypeRelation, relationType);
	}

	async searchForExalctRelationName(relationName: string) {
		await this.inputText(this.locators.inputSearchRelation, relationName);
		await this.validateElementToHaveCount(this.locators.listSearchResult, 1);
	}

	async selectAnyRelationSearchResult() {
		await this.validateElementNotToHaveCount(this.locators.listSearchResult, 0);
		await (
			await this.getRandomElementFromListElements(this.locators.listSearchResult)
		).element.click();
	}

	async clickButtonSaveRelation() {
		await this.clickLocator(this.locators.btnSaveRelation);
	}

	async validateShowRelationList(listRelationShip: RelationShip[]) {
		await this.validateElementNotToHaveCount(this.locators.listRelationShip, 0);
		for (let i = 0; i < listRelationShip.length; i++) {
			const actualRawText = await this.getLocator(this.locators.listRelationShip, i).textContent();
			expect(actualRawText).toBe(
				`${listRelationShip[i].relationType}${listRelationShip[i].relationWith}Relations`,
			);
		}
	}
}
