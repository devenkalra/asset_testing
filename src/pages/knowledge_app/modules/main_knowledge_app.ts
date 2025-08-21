import { Page, expect } from '@playwright/test';

import { BasePage } from '../../base_page';
import { ENTITY_LIST } from './entity_config';
import { EntityDetail } from './components/entity_detail';
import { EntityList } from './components/entity_list';
import { TagPanel } from './components/tag_panel';

export class MainKnowledgeApp extends BasePage {
	entityDetail: EntityDetail;
	entityList: EntityList;
	tagPanel: TagPanel;

	constructor(page: Page, domain: string, context: any = null) {
		super(page, domain, context);
		this.entityDetail = new EntityDetail(page, domain, context);
		this.entityList = new EntityList(page, domain, context);
		this.tagPanel = new TagPanel(page, domain, context);
	}

	private locators = {
		btnNew: "//button[text()='New']",
		panelOfField: (fieldName: string) => {
			return `//div[@type='attributeDisplay'][descendant::*[text()='${fieldName}']]`;
		},
		dropDownEntity: '#createEntitySelect',
		inputEntityName: '#createValue',
		btnCreateEntity: "//input[@id='createValue']/following-sibling::button[text()='Execute']",
		listEntityToCreate: '#createEntitySelect option',
		btnSearch: "//button[text()='Search']",
		dialogSearchEntity: '#EntitySearchDialog',
	};

	async clickBtnNew() {
		await this.clickLocator(this.locators.btnNew);
	}

	async validateShowPanelCreateEntity() {
		await this.validateElementVisible(this.locators.panelOfField('Create Entity'));
		await this.validateElementVisible(this.locators.dropDownEntity);
		await this.validateElementVisible(this.locators.inputEntityName);
		await this.validateElementVisible(this.locators.btnCreateEntity);
	}

	async inputEntityName(entityName: string) {
		await this.inputText(this.locators.inputEntityName, entityName);
	}

	async clickBtnCreateEntity() {
		await this.clickLocator(this.locators.btnCreateEntity);
	}

	async selectEntityType(entityType: string) {
		await this.getLocator(this.locators.dropDownEntity).selectOption(entityType);
	}

	async validateShowField(fieldName: string) {
		await this.validateElementVisible(this.locators.panelOfField(fieldName));
	}

	async inputTextToFieldName(fieldName: string, text: string) {
		await this.inputText(`${this.locators.panelOfField(fieldName)}//input`, text);
	}

	async clickBtnSearch() {
		await this.clickLocator(this.locators.btnSearch);
	}

	async validateSearchPanelShow() {
		await this.validateElementVisible(this.locators.panelOfField('Search'));
		await this.validateElementVisible(this.locators.dialogSearchEntity);
	}
}
