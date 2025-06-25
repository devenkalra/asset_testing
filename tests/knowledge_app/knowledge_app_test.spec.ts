import { knowledgeTest } from '../../src/fixture/knowledge_app.fixture';
import {
	ENTITY_LIST,
	getEntityAvailableFields,
	getRandomEntity,
	KNOWLEDGE_ENTITY,
} from '../../src/pages/knowledge_app/modules/entity_config';
import { getCurrentUnixTime } from '../../src/utils/time';

knowledgeTest.describe('Sample test Knowledge @Knowledge_app_test', async () => {
	knowledgeTest('Verify can access Knowledge app @TC_K_01', async ({ mainKnowledgeApp }) => {
		await knowledgeTest.step(
			'1. Access Knowlege app, validate can access knowledge app',
			async () => {
				await mainKnowledgeApp.goto('');
				await mainKnowledgeApp.tagPanel.validateShowTagPanel();
				await mainKnowledgeApp.entityList.validateShowEntityListPanel();
				await mainKnowledgeApp.entityDetail.validateShowEntityDetailPanel();
				await mainKnowledgeApp.clickBtnNew();
				await mainKnowledgeApp.validateShowPanelCreateEntity();
			},
		);

		await knowledgeTest.step('2. Validate sort and order working correct', async () => {
			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Asc');
			await mainKnowledgeApp.entityList.clickOnOrderType();
			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Desc');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Display');
			await mainKnowledgeApp.entityList.selectSortType('Modified');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Modified');
		});

		await knowledgeTest.step(
			'3. Valite can create all availiable entity and display correct fields',
			async () => {
				for (let i = 0; i < ENTITY_LIST.length; i++) {
					const entityName = `T_Entity ${ENTITY_LIST[i]} ${getCurrentUnixTime()}`;
					await mainKnowledgeApp.selectEntityType(ENTITY_LIST[i]);
					await mainKnowledgeApp.inputEntityName(entityName);
					await mainKnowledgeApp.clickBtnCreateEntity();
					await mainKnowledgeApp.entityList.validateEntityListHas(entityName, ENTITY_LIST[i]);
					await mainKnowledgeApp.entityDetail.validateShowEntityTitleOf(entityName, ENTITY_LIST[i]);

					const avlField =
						KNOWLEDGE_ENTITY.find((entity) => entity.item == ENTITY_LIST[i])?.fields || '';
					const fieldArr = getEntityAvailableFields(avlField);
					for (let j = 0; j < fieldArr.length; j++) {
						await mainKnowledgeApp.validateShowField(fieldArr[j]);
					}
				}
			},
		);
	});

	knowledgeTest('Verify can create parent tag @TC_K_02', async ({ mainKnowledgeApp }) => {
		const selectedEntity = getRandomEntity();
		const testTag = `T_Tag ${selectedEntity} ${getCurrentUnixTime()}`;
		const testEntity = `T_Entity ${selectedEntity} ${getCurrentUnixTime()}`;

		await knowledgeTest.step('1. Create random Entity', async () => {
			await mainKnowledgeApp.goto('');
			await mainKnowledgeApp.clickBtnNew();
			await mainKnowledgeApp.validateShowPanelCreateEntity();
			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Asc');
			await mainKnowledgeApp.entityList.clickOnOrderType();
			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Desc');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Display');
			await mainKnowledgeApp.entityList.selectSortType('Modified');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Modified');

			await mainKnowledgeApp.selectEntityType(selectedEntity);
			await mainKnowledgeApp.inputEntityName(testEntity);
			await mainKnowledgeApp.clickBtnCreateEntity();
			await mainKnowledgeApp.entityList.validateEntityListHas(testEntity, selectedEntity);
			await mainKnowledgeApp.entityDetail.validateShowEntityTitleOf(testEntity, selectedEntity);

			const avlField =
				KNOWLEDGE_ENTITY.find((entity) => entity.item == selectedEntity)?.fields || '';
			const fieldArr = getEntityAvailableFields(avlField);
			for (let j = 0; j < fieldArr.length; j++) {
				await mainKnowledgeApp.validateShowField(fieldArr[j]);
			}
		});
		await knowledgeTest.step('2. Create Tag, validate created Tag show on tag tree', async () => {
			await mainKnowledgeApp.inputTextToFieldName('Tags', testTag);
			await mainKnowledgeApp.entityDetail.clickBtnGotoDetailView();
			await mainKnowledgeApp.tagPanel.validateShowParentTag(testTag, 1);
		});
	});

	knowledgeTest('Verify can create tree tag @TC_K_03', async ({ mainKnowledgeApp }) => {
		const selectedEntity = getRandomEntity();
		const testParentTag = `T_Parent_Tag 1 ${selectedEntity} ${getCurrentUnixTime()}`;
		const testChildTag1 = `T_Child_Tag 1 ${selectedEntity} ${getCurrentUnixTime()}`;
		const testChildTag2 = `T_Child_Tag 2 ${selectedEntity} ${getCurrentUnixTime()}`;
		const testEntity = `T_Entity ${selectedEntity} ${getCurrentUnixTime()}`;

		await knowledgeTest.step('1. Create random Entity', async () => {
			await mainKnowledgeApp.goto('');
			await mainKnowledgeApp.clickBtnNew();
			await mainKnowledgeApp.validateShowPanelCreateEntity();
			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Asc');
			await mainKnowledgeApp.entityList.clickOnOrderType();
			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Desc');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Display');
			await mainKnowledgeApp.entityList.selectSortType('Modified');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Modified');

			await mainKnowledgeApp.selectEntityType(selectedEntity);
			await mainKnowledgeApp.inputEntityName(testEntity);
			await mainKnowledgeApp.clickBtnCreateEntity();
			await mainKnowledgeApp.entityList.validateEntityListHas(testEntity, selectedEntity);
			await mainKnowledgeApp.entityDetail.validateShowEntityTitleOf(testEntity, selectedEntity);
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
			await mainKnowledgeApp.entityDetail.clickBtnGotoDetailView();
			await mainKnowledgeApp.tagPanel.validateShowParentTag(testParentTag, 1);
			await mainKnowledgeApp.tagPanel.expandTagElementByTagName(testParentTag);
			await mainKnowledgeApp.tagPanel.validateTagNameShow(testChildTag1);
			await mainKnowledgeApp.tagPanel.expandTagElementByTagName(testChildTag1);
			await mainKnowledgeApp.tagPanel.validateTagNameShow(testChildTag2);

			await mainKnowledgeApp.tagPanel.validateShowTagTree([
				{ tagName: testParentTag, tagQuantity: 1 },
				{ tagName: testChildTag1, tagQuantity: 1 },
				{ tagName: testChildTag2, tagQuantity: 1 },
			]);
		});
	});

	knowledgeTest(
		'Verify can create mutiple tags include parent tag and tree tag @TC_K_04',
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
				await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Asc');
				await mainKnowledgeApp.entityList.clickOnOrderType();
				await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Desc');
				await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Display');
				await mainKnowledgeApp.entityList.selectSortType('Modified');
				await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Modified');

				await mainKnowledgeApp.selectEntityType(selectedEntity);
				await mainKnowledgeApp.inputEntityName(testEntity);
				await mainKnowledgeApp.clickBtnCreateEntity();
				await mainKnowledgeApp.entityList.validateEntityListHas(testEntity, selectedEntity);
				await mainKnowledgeApp.entityDetail.validateShowEntityTitleOf(testEntity, selectedEntity);
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
					await mainKnowledgeApp.entityDetail.clickBtnGotoDetailView();
					await mainKnowledgeApp.tagPanel.validateShowParentTag(testParentTag1, 1);
					await mainKnowledgeApp.tagPanel.validateShowParentTag(testParentTag2, 1);
					await mainKnowledgeApp.tagPanel.expandTagElementByTagName(testParentTag2);
					await mainKnowledgeApp.tagPanel.validateTagNameShow(testChildTag1);
					await mainKnowledgeApp.tagPanel.expandTagElementByTagName(testChildTag1);
					await mainKnowledgeApp.tagPanel.validateTagNameShow(testChildTag2);
					await mainKnowledgeApp.tagPanel.validateShowTagTree([
						{ tagName: testParentTag2, tagQuantity: 1 },
						{ tagName: testChildTag1, tagQuantity: 1 },
						{ tagName: testChildTag2, tagQuantity: 1 },
					]);
				},
			);
		},
	);

	knowledgeTest('Verify can create relation @TC_K_05', async ({ mainKnowledgeApp }) => {
		const selectedEntity = 'Person';
		const testEntity1 = `T Entity 1 ${selectedEntity} ${getCurrentUnixTime()}`;
		const testEntity2 = `T Entity 2 ${selectedEntity} ${getCurrentUnixTime()}`;

		await knowledgeTest.step('1. Create Entity', async () => {
			await mainKnowledgeApp.goto('');
			await mainKnowledgeApp.clickBtnNew();
			await mainKnowledgeApp.validateShowPanelCreateEntity();
			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Asc');
			await mainKnowledgeApp.entityList.clickOnOrderType();
			await mainKnowledgeApp.entityList.validateCurrentOrderTypeIs('Desc');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Display');
			await mainKnowledgeApp.entityList.selectSortType('Modified');
			await mainKnowledgeApp.entityList.validateCurrentSortTypeIs('Modified');

			await mainKnowledgeApp.selectEntityType(selectedEntity);
			await mainKnowledgeApp.inputEntityName(testEntity1);
			await mainKnowledgeApp.clickBtnCreateEntity();
			await mainKnowledgeApp.entityList.validateEntityListHas(testEntity1, selectedEntity);
			await mainKnowledgeApp.entityDetail.validateShowEntityTitleOf(testEntity1, selectedEntity);

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
				await mainKnowledgeApp.entityDetail.clickBtnGotoDetailView();
				await mainKnowledgeApp.entityDetail.clickBtnGotoRelationsView();
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
});
