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
		entityDetailPanel: '.right-column',
		entityEditTitle: '#entityEditTitle',
		panelOfField: (fieldName: string) => {
			return `//span[text()='${fieldName}']/ancestor::div[@type='attributeDisplay']`;
		},
		btnGoToDetailView: '.right-column .PartScrollFixedDiv button',
		btnGoToEditView: '[id*=editEntityLink]',
		panelEditView: "//div[@panelType='EntityEdit']",
		panelDetailView: '.right-column',
		// btnGoToRelationsView: "//div[@panelType='EntityDetail']//a[text()='Relations']",
		btnAddRelation: "//div[@id='ShowRelations']//button[contains(text(), 'Add Relation')]",
		dropDownSelectTypeRelation: '#RelationSelect_1',
		listTypeRelation: '#RelationSelect_1 option',
		inputSearchRelation: 'td:has(#RelationSelect_1)+td input',
		listSearchResult: '#possibleRelations div',
		btnSaveRelation: "//div[@id='ShowRelations']//button[text()='Save']",
		listRelationShip: "//div[@id='ShowRelations']//table//tr",
		btnAddTag: '#tag-create',
	};

	async validateShowEntityDetailPanel() {
		await this.validateElementVisible(this.locators.entityDetailPanel);
	}

	async validateShowEntityTitleOf(entityName: string, entityType: string) {
		const entityNameFormat = `${entityName} (${entityType})`;
		await this.validateElementHaveText(this.locators.entityEditTitle, entityNameFormat);
	}

	async validateShowField(fieldName: string) {
		await this.validateElementVisible(this.locators.panelOfField(fieldName));
	}

	async clickBtnGotoDetailView() {
		await this.clickLocator(this.locators.btnGoToDetailView);
	}

	async clickBtnGotoEditView() {
		await this.clickLocator(this.locators.btnGoToEditView);
	}

	async validateCurrentModeIsDetailView() {
		await this.validateElementVisible(this.locators.panelDetailView);
	}

	async validateCurrentModeIsEditView() {
		await this.validateElementVisible(this.locators.panelEditView);
	}

	// async clickBtnGotoRelationsView() {
	// 	await this.clickLocator(this.locators.btnGoToRelationsView);
	// }

	async clickBtnAddTag() {
		await this.clickLocator(this.locators.btnAddTag);
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
