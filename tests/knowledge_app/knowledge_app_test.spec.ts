import { expect } from 'playwright/test';
import { knowledgeTest } from '../../src/fixture/knowledge_app.fixture';
import {
	ENTITY_LIST,
	getEntityAvailableFields,
	getRandomEntity,
	KNOWLEDGE_ENTITY,
} from '../../src/pages/knowledge_app/modules/entity_config';
import { getCurrentUnixTime } from '../../src/utils/time';
import { ACCEPT_SPECIAL_CHAR } from '../../src/constant/chars';
import { getRandomBetween } from '../../src/utils/random';

knowledgeTest.describe('Sample test Knowledge @Knowledge_app_test', async () => {
	knowledgeTest('Verify can access Knowledge app @TC_K_01', async ({ mainKnowledgeApp }) => {
		await knowledgeTest.step(
			'1. Access Knowlege app, validate can access knowledge app',
			async () => {
				await mainKnowledgeApp.goto('');
				await mainKnowledgeApp.tagPanel.validateShowTagPanel();
				await mainKnowledgeApp.entityList.validateShowEntityListPanel();
				await mainKnowledgeApp.entityDetail.validateShowEntityDetailPanel();
			},
		);

		const listCreatedEntity: string[] = [];
		await knowledgeTest.step(
			'2. Validate can create all availiable entity and display correct fields',
			async () => {
				for (let i = 0; i < ENTITY_LIST.length; i++) {
					await mainKnowledgeApp.clickBtnNew();
					await mainKnowledgeApp.validateShowPanelCreateEntity();
					const entityName = `T_Entity ${ENTITY_LIST[i]} ${getCurrentUnixTime()}`;
					await mainKnowledgeApp.selectEntityType(ENTITY_LIST[i]);
					await mainKnowledgeApp.inputEntityName(entityName);
					await mainKnowledgeApp.clickBtnCreateEntity();
					await mainKnowledgeApp.entityDetail.validateShowEntityTitleOf(entityName, ENTITY_LIST[i]);
					const avlField =
						KNOWLEDGE_ENTITY.find((entity) => entity.item == ENTITY_LIST[i])?.fields || '';
					const fieldArr = getEntityAvailableFields(avlField);
					for (let j = 0; j < fieldArr.length; j++) {
						await mainKnowledgeApp.validateShowField(fieldArr[j]);
					}
					listCreatedEntity.push(entityName);
					await mainKnowledgeApp.clickBtnNew();
				}
			},
		);

		await knowledgeTest.step('3. Validate sort and order working correct', async () => {
			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Asc');
			await mainKnowledgeApp.entityList.clickOnOrderType();
			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Desc');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Display');
			await mainKnowledgeApp.entityList.selectSortType('Modified');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Modified');
		});

		await knowledgeTest.step('4. Validate all created entites shown on entity list', async () => {
			for (let i = 0; i < listCreatedEntity.length; i++) {
				await mainKnowledgeApp.entityList.validateEntityListHas(
					listCreatedEntity[i],
					ENTITY_LIST[i],
				);
			}
		});
	});

	knowledgeTest('Verify show search panel when click @TC_K_02', async ({ mainKnowledgeApp }) => {
		await knowledgeTest.step(
			'1. Access Knowlege app, validate can access knowledge app',
			async () => {
				await mainKnowledgeApp.goto('');
				await mainKnowledgeApp.tagPanel.validateShowTagPanel();
				await mainKnowledgeApp.entityList.validateShowEntityListPanel();
				await mainKnowledgeApp.entityDetail.validateShowEntityDetailPanel();
			},
		);

		await knowledgeTest.step('2. Click search, validate search panel shown', async () => {
			await mainKnowledgeApp.clickBtnSearch();
			await mainKnowledgeApp.validateSearchPanelShow();
		});
	});

	knowledgeTest('Full flow crud tag @TC_K_03', async ({ mainKnowledgeApp }) => {
		const testTag = `T_Tag ${getCurrentUnixTime()}`;
		const testTag2 = `T_Tag_New ${getCurrentUnixTime()}`;
		const testTagChild = `T_Tag_Child ${getCurrentUnixTime()}`;

		await knowledgeTest.step(
			'1. Access Knowlege app, validate can access knowledge app',
			async () => {
				await mainKnowledgeApp.goto('');
				await mainKnowledgeApp.tagPanel.validateShowTagPanel();
				await mainKnowledgeApp.entityList.validateShowEntityListPanel();
				await mainKnowledgeApp.entityDetail.validateShowEntityDetailPanel();
			},
		);

		await knowledgeTest.step(
			'2. Create tag, validate tag shown along with pencil icon',
			async () => {
				await mainKnowledgeApp.tagPanel.validateTagPanelIsNotInEditMode();
				await mainKnowledgeApp.tagPanel.clickBtnEditTags();
				await mainKnowledgeApp.tagPanel.validateTagPanelIsInEditMode();
				await mainKnowledgeApp.tagPanel.validateBtnDeleteSelectedDiable();
				await mainKnowledgeApp.tagPanel.createTag(testTag);
				await mainKnowledgeApp.tagPanel.validateTagNameShow(testTag);
				await mainKnowledgeApp.tagPanel.validateListPencilIconShow();
			},
		);

		await knowledgeTest.step('3. Rename tag, validate new tag name show', async () => {
			await mainKnowledgeApp.tagPanel.clickTagElementByTagName(testTag);
			await mainKnowledgeApp.tagPanel.validateBtnDeleteSelectedEnable();
			await mainKnowledgeApp.tagPanel.updateValueOfTag(testTag, testTag2);
			await mainKnowledgeApp.tagPanel.clickBtnExitEdit();
			await mainKnowledgeApp.tagPanel.validateTagNameShow(testTag2);
			await mainKnowledgeApp.tagPanel.validateTagNameNotShow(testTag);
		});

		await knowledgeTest.step('4. Add child tag for that tag', async () => {
			await mainKnowledgeApp.tagPanel.clickBtnEditTags();
			await mainKnowledgeApp.tagPanel.clickTagElementByTagName(testTag2);
			await mainKnowledgeApp.tagPanel.createTag(testTagChild);
		});

		await knowledgeTest.step(
			'5. Expand parent tag, validate parent and child tags show',
			async () => {
				await mainKnowledgeApp.tagPanel.expandTagElementByTagName(testTag2);
				await mainKnowledgeApp.tagPanel.validateShowTagTreeInEditMode([
					{ tagName: testTag2, tagQuantity: 0 },
					{ tagName: testTagChild, tagQuantity: 0 },
				]);
			},
		);

		await knowledgeTest.step(
			'6. Delete parent tag, validate parent and child tags not showw',
			async () => {
				await mainKnowledgeApp.tagPanel.clickTagElementByTagName(testTag2);
				await mainKnowledgeApp.tagPanel.clickBtnDeleteSelected();
				await mainKnowledgeApp.tagPanel.validateTagNameNotShow(testTag2);
				await mainKnowledgeApp.tagPanel.validateTagNameNotShow(testTagChild);
			},
		);
	});

	knowledgeTest(
		'Can create and delete tag that has special character @TC_K_04',
		async ({ mainKnowledgeApp }) => {
			const specialChar = ACCEPT_SPECIAL_CHAR[getRandomBetween(0, ACCEPT_SPECIAL_CHAR.length - 1)];
			const testTag = `T_Tag ${getCurrentUnixTime()} ${specialChar}`;

			await knowledgeTest.step(
				'1. Access Knowlege app, validate can access knowledge app',
				async () => {
					await mainKnowledgeApp.goto('');
					await mainKnowledgeApp.tagPanel.validateShowTagPanel();
					await mainKnowledgeApp.entityList.validateShowEntityListPanel();
					await mainKnowledgeApp.entityDetail.validateShowEntityDetailPanel();
				},
			);

			await knowledgeTest.step('2. Create tag with special character', async () => {
				await mainKnowledgeApp.tagPanel.validateTagPanelIsNotInEditMode();
				await mainKnowledgeApp.tagPanel.clickBtnEditTags();
				await mainKnowledgeApp.tagPanel.validateTagPanelIsInEditMode();
				await mainKnowledgeApp.tagPanel.validateBtnDeleteSelectedDiable();
				await mainKnowledgeApp.tagPanel.createTag(testTag);
				await mainKnowledgeApp.tagPanel.validateTagNameShow(testTag);
				await mainKnowledgeApp.tagPanel.validateListPencilIconShow();
			});

			await knowledgeTest.step('3. Delete tag with special character', async () => {
				await mainKnowledgeApp.tagPanel.clickTagElementByTagName(testTag);
				await mainKnowledgeApp.tagPanel.clickBtnDeleteSelected();
				await mainKnowledgeApp.tagPanel.validateTagNameNotShow(testTag);
			});
		},
	);

	knowledgeTest(
		'Verify can create and update parent tag with Entity @TC_K_05',
		async ({ mainKnowledgeApp }) => {
			const selectedEntity = getRandomEntity();
			const testTag = `T_Tag ${selectedEntity} ${getCurrentUnixTime()}`;
			const newTag = `T_Tag_new ${selectedEntity} ${getCurrentUnixTime()}`;
			const testEntity = `T_Entity ${selectedEntity} ${getCurrentUnixTime()}`;

			await knowledgeTest.step('1. Create random Entity', async () => {
				await mainKnowledgeApp.goto('');
				await mainKnowledgeApp.clickBtnNew();
				await mainKnowledgeApp.validateShowPanelCreateEntity();

				await mainKnowledgeApp.selectEntityType(selectedEntity);
				await mainKnowledgeApp.inputEntityName(testEntity);
				await mainKnowledgeApp.clickBtnCreateEntity();
				await mainKnowledgeApp.entityDetail.validateShowEntityTitleOf(testEntity, selectedEntity);

				await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Asc');
				await mainKnowledgeApp.entityList.clickOnOrderType();
				await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Desc');
				await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Display');
				await mainKnowledgeApp.entityList.selectSortType('Modified');
				await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Modified');
				await mainKnowledgeApp.entityList.validateEntityListHas(testEntity, selectedEntity);

				await mainKnowledgeApp.clickBtnNew();

				const avlField =
					KNOWLEDGE_ENTITY.find((entity) => entity.item == selectedEntity)?.fields || '';
				const fieldArr = getEntityAvailableFields(avlField);
				for (let j = 0; j < fieldArr.length; j++) {
					await mainKnowledgeApp.validateShowField(fieldArr[j]);
				}
			});
			await knowledgeTest.step('2. Create Tag, validate created Tag show on tag tree', async () => {
				await mainKnowledgeApp.inputTextToFieldName('Tags', testTag);
				await mainKnowledgeApp.entityDetail.clickBtnAddTag();
				await mainKnowledgeApp.tagPanel.validateShowParentTag(testTag, 1);
			});

			await knowledgeTest.step(
				'3. Update Tag, validate previous tag display as 1 and new tag display as 1',
				async () => {
					await mainKnowledgeApp.inputTextToFieldName('Tags', newTag);
					await mainKnowledgeApp.entityDetail.clickBtnAddTag();
					await mainKnowledgeApp.tagPanel.validateShowParentTag(testTag, 1);
					await mainKnowledgeApp.tagPanel.validateShowParentTag(newTag, 1);
				},
			);
		},
	);

	knowledgeTest(
		'Verify can create tree tag and update multiple tree tags @TC_K_06',
		async ({ mainKnowledgeApp }) => {
			const selectedEntity = getRandomEntity();
			const testParentTag = `T_Parent_Tag 1 ${selectedEntity} ${getCurrentUnixTime()}`;
			const testChildTag1 = `T_Child_Tag 1 ${selectedEntity} ${getCurrentUnixTime()}`;
			const testChildTag2 = `T_Child_Tag 2 ${selectedEntity} ${getCurrentUnixTime()}`;
			const testEntity = `T_Entity ${selectedEntity} ${getCurrentUnixTime()}`;

			const testNewParentTag = `T_Parent_Tag_new 1 ${selectedEntity} ${getCurrentUnixTime()}`;
			const testNewChildTag1 = `T_Child_Tag_new 1 ${selectedEntity} ${getCurrentUnixTime()}`;
			const testNewChildTag2 = `T_Child_Tag_new 2 ${selectedEntity} ${getCurrentUnixTime()}`;

			await knowledgeTest.step('1. Create random Entity', async () => {
				await mainKnowledgeApp.goto('');
				await mainKnowledgeApp.clickBtnNew();
				await mainKnowledgeApp.validateShowPanelCreateEntity();

				await mainKnowledgeApp.selectEntityType(selectedEntity);
				await mainKnowledgeApp.inputEntityName(testEntity);
				await mainKnowledgeApp.clickBtnCreateEntity();
				await mainKnowledgeApp.entityDetail.validateShowEntityTitleOf(testEntity, selectedEntity);

				await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Asc');
				await mainKnowledgeApp.entityList.clickOnOrderType();
				await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Desc');
				await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Display');
				await mainKnowledgeApp.entityList.selectSortType('Modified');
				await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Modified');
				await mainKnowledgeApp.entityList.validateEntityListHas(testEntity, selectedEntity);

				await mainKnowledgeApp.clickBtnNew();

				const avlField =
					KNOWLEDGE_ENTITY.find((entity) => entity.item == selectedEntity)?.fields || '';
				const fieldArr = getEntityAvailableFields(avlField);
				for (let j = 0; j < fieldArr.length; j++) {
					await mainKnowledgeApp.validateShowField(fieldArr[j]);
				}
			});
			await knowledgeTest.step('2. Create Tag, validate created Tag show on tag tree', async () => {
				await mainKnowledgeApp.inputTextToFieldName(
					'Tags',
					`${testParentTag}/${testChildTag1}/${testChildTag2}`,
				);

				await mainKnowledgeApp.entityDetail.clickBtnAddTag();

				await mainKnowledgeApp.tagPanel.validateShowParentTag(testParentTag, 1);
				await mainKnowledgeApp.tagPanel.expandTagElementByTagName(testParentTag);
				await mainKnowledgeApp.tagPanel.validateTagNameShow(testChildTag1);
				await mainKnowledgeApp.tagPanel.expandTagElementByTagName(testChildTag1);
				await mainKnowledgeApp.tagPanel.validateTagNameShow(testChildTag2);

				await mainKnowledgeApp.tagPanel.validateShowTagTreeInViewMode([
					{ tagName: testParentTag, tagQuantity: 1 },
					{ tagName: testChildTag1, tagQuantity: 1 },
					{ tagName: testChildTag2, tagQuantity: 1 },
				]);
			});

			await knowledgeTest.step(
				'3. Update tree tags, validate previous tree tag display as 1',
				async () => {
					await mainKnowledgeApp.inputTextToFieldName(
						'Tags',
						`${testNewParentTag}/${testNewChildTag1}/${testNewChildTag2}`,
					);
					await mainKnowledgeApp.entityDetail.clickBtnAddTag();

					await mainKnowledgeApp.tagPanel.validateShowParentTag(testParentTag, 1);
					await mainKnowledgeApp.tagPanel.validateShowTagTreeInViewMode([
						{ tagName: testParentTag, tagQuantity: 1 },
						{ tagName: testChildTag1, tagQuantity: 1 },
						{ tagName: testChildTag2, tagQuantity: 1 },
					]);
				},
			);

			await knowledgeTest.step('4. Validate new tree tag display as 1', async () => {
				await mainKnowledgeApp.tagPanel.validateShowParentTag(testNewParentTag, 1);
				await mainKnowledgeApp.tagPanel.expandTagElementByTagName(testNewParentTag);
				await mainKnowledgeApp.tagPanel.validateTagNameShow(testNewChildTag1);
				await mainKnowledgeApp.tagPanel.expandTagElementByTagName(testNewChildTag1);
				await mainKnowledgeApp.tagPanel.validateTagNameShow(testNewChildTag2);

				await mainKnowledgeApp.tagPanel.validateShowTagTreeInViewMode([
					{ tagName: testNewParentTag, tagQuantity: 1 },
					{ tagName: testNewChildTag1, tagQuantity: 1 },
					{ tagName: testNewChildTag2, tagQuantity: 1 },
				]);
			});
		},
	);

	knowledgeTest(
		'Verify can create mutiple tags include parent tag and tree tag @TC_K_07',
		async ({ mainKnowledgeApp }) => {
			const selectedEntity = getRandomEntity();
			const testParentTag1 = `T_Parent_Tag 1 ${selectedEntity} ${getCurrentUnixTime()}`;
			const testParentTag2 = `T_Parent_Tag 2 ${selectedEntity} ${getCurrentUnixTime()}`;
			const testChildTag1 = `T_Child_Tag 1 ${selectedEntity} ${getCurrentUnixTime()}`;
			const testChildTag2 = `T_Child_Tag 2 ${selectedEntity} ${getCurrentUnixTime()}`;
			const testEntity = `T_Entity ${selectedEntity} ${getCurrentUnixTime()}`;

			await knowledgeTest.step('1. Create random Entity', async () => {
				await mainKnowledgeApp.goto('');
				await mainKnowledgeApp.clickBtnNew();
				await mainKnowledgeApp.validateShowPanelCreateEntity();

				await mainKnowledgeApp.selectEntityType(selectedEntity);
				await mainKnowledgeApp.inputEntityName(testEntity);
				await mainKnowledgeApp.clickBtnCreateEntity();
				await mainKnowledgeApp.entityDetail.validateShowEntityTitleOf(testEntity, selectedEntity);

				await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Asc');
				await mainKnowledgeApp.entityList.clickOnOrderType();
				await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Desc');
				await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Display');
				await mainKnowledgeApp.entityList.selectSortType('Modified');
				await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Modified');
				await mainKnowledgeApp.entityList.validateEntityListHas(testEntity, selectedEntity);
				await mainKnowledgeApp.clickBtnNew();

				const avlField =
					KNOWLEDGE_ENTITY.find((entity) => entity.item == selectedEntity)?.fields || '';
				const fieldArr = getEntityAvailableFields(avlField);
				for (let j = 0; j < fieldArr.length; j++) {
					await mainKnowledgeApp.validateShowField(fieldArr[j]);
				}
			});
			await knowledgeTest.step(
				'2. Create Tag, validate mutiple tags include parent tag and tree tag shown',
				async () => {
					await mainKnowledgeApp.inputTextToFieldName(
						'Tags',
						`${testParentTag1},${testParentTag2}/${testChildTag1}/${testChildTag2}`,
					);
					await mainKnowledgeApp.entityDetail.clickBtnAddTag();
					await mainKnowledgeApp.tagPanel.validateShowParentTag(testParentTag1, 1);
					await mainKnowledgeApp.tagPanel.validateShowParentTag(testParentTag2, 1);
					await mainKnowledgeApp.tagPanel.expandTagElementByTagName(testParentTag2);
					await mainKnowledgeApp.tagPanel.validateTagNameShow(testChildTag1);
					await mainKnowledgeApp.tagPanel.expandTagElementByTagName(testChildTag1);
					await mainKnowledgeApp.tagPanel.validateTagNameShow(testChildTag2);
					await mainKnowledgeApp.tagPanel.validateShowTagTreeInViewMode([
						{ tagName: testParentTag2, tagQuantity: 1 },
						{ tagName: testChildTag1, tagQuantity: 1 },
						{ tagName: testChildTag2, tagQuantity: 1 },
					]);
				},
			);
		},
	);

	knowledgeTest('Verify can create relation @TC_K_08', async ({ mainKnowledgeApp }) => {
		const selectedEntity = 'Person';
		const testEntity1 = `T Entity 1 ${selectedEntity} ${getCurrentUnixTime()}`;
		const testEntity2 = `T Entity 2 ${selectedEntity} ${getCurrentUnixTime()}`;

		await knowledgeTest.step('1. Create Entity', async () => {
			await mainKnowledgeApp.goto('');
			await mainKnowledgeApp.clickBtnNew();
			await mainKnowledgeApp.validateShowPanelCreateEntity();

			await mainKnowledgeApp.selectEntityType(selectedEntity);
			await mainKnowledgeApp.inputEntityName(testEntity1);
			await mainKnowledgeApp.clickBtnCreateEntity();
			await mainKnowledgeApp.clickBtnNew();

			await mainKnowledgeApp.entityDetail.validateShowEntityTitleOf(testEntity1, selectedEntity);

			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Asc');
			await mainKnowledgeApp.entityList.clickOnOrderType();
			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Desc');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Display');
			await mainKnowledgeApp.entityList.selectSortType('Modified');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Modified');
			await mainKnowledgeApp.entityList.validateEntityListHas(testEntity1, selectedEntity);

			await mainKnowledgeApp.clickBtnNew();
			await mainKnowledgeApp.selectEntityType(selectedEntity);
			await mainKnowledgeApp.inputEntityName(testEntity2);
			await mainKnowledgeApp.clickBtnCreateEntity();
			await mainKnowledgeApp.entityList.validateEntityListHas(testEntity2, selectedEntity);
			await mainKnowledgeApp.entityDetail.validateShowEntityTitleOf(testEntity2, selectedEntity);
			await mainKnowledgeApp.clickBtnNew();

			const avlField =
				KNOWLEDGE_ENTITY.find((entity) => entity.item == selectedEntity)?.fields || '';
			const fieldArr = getEntityAvailableFields(avlField);
			for (let j = 0; j < fieldArr.length; j++) {
				await mainKnowledgeApp.validateShowField(fieldArr[j]);
			}
		});
		await knowledgeTest.step(
			'2. Create relation for created entity, validate show correct relation',
			async () => {
				await mainKnowledgeApp.entityDetail.clickBtnAddRelation();
				await mainKnowledgeApp.entityDetail.validateShowInputRelation();
				const relationType = await mainKnowledgeApp.entityDetail.getRandomRelationType();
				await mainKnowledgeApp.entityDetail.selectRelationType(relationType);
				await mainKnowledgeApp.entityDetail.searchForExalctRelationName(testEntity1);
				await mainKnowledgeApp.entityDetail.selectAnyRelationSearchResult();

				await mainKnowledgeApp.entityDetail.clickButtonSaveRelation();
				const parsedRelationType = relationType.split(' ')[0].replace(/_/g, ' ');
				await mainKnowledgeApp.entityDetail.validateShowRelationList([
					{ relationType: parsedRelationType, relationWith: testEntity1 },
				]);
			},
		);
	});

	knowledgeTest('Verify can bulk delete all entities @TC_K_09', async ({ mainKnowledgeApp }) => {
		const selectedEntity = 'Person';
		const testEntity1 = `T Entity 1 ${selectedEntity} ${getCurrentUnixTime()}`;

		await knowledgeTest.step('1. Create Entity', async () => {
			await mainKnowledgeApp.goto('');
			await mainKnowledgeApp.clickBtnNew();
			await mainKnowledgeApp.validateShowPanelCreateEntity();

			await mainKnowledgeApp.selectEntityType(selectedEntity);
			await mainKnowledgeApp.inputEntityName(testEntity1);
			await mainKnowledgeApp.clickBtnCreateEntity();
			await mainKnowledgeApp.entityDetail.validateShowEntityTitleOf(testEntity1, selectedEntity);
			await mainKnowledgeApp.clickBtnNew();

			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Asc');
			await mainKnowledgeApp.entityList.clickOnOrderType();
			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Desc');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Display');
			await mainKnowledgeApp.entityList.selectSortType('Modified');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Modified');
			await mainKnowledgeApp.entityList.validateEntityListHas(testEntity1, selectedEntity);

			const avlField =
				KNOWLEDGE_ENTITY.find((entity) => entity.item == selectedEntity)?.fields || '';
			const fieldArr = getEntityAvailableFields(avlField);
			for (let j = 0; j < fieldArr.length; j++) {
				await mainKnowledgeApp.validateShowField(fieldArr[j]);
			}
		});
		await knowledgeTest.step(
			'2. Bulk delete for all entities, validate previous data is not displayed',
			async () => {
				const previousData = mainKnowledgeApp.entityList.getAllListEntityItemName();
				await mainKnowledgeApp.entityList.clickBtnBulkEdit();
				await mainKnowledgeApp.entityList.selectAllOptionsForBulk();
				await mainKnowledgeApp.entityList.clickBtnDeleteSelected();
				const afterData = mainKnowledgeApp.entityList.getAllListEntityItemName();
				expect(previousData).not.toBe(afterData);
			},
		);
	});
});
