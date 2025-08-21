import { getRandomIndex } from '../../../utils/random';

export const ENTITY_LIST = [
	'Person',
	'Org',
	'Location',
	'Event',
	'Movie',
	'Book',
	'Asset',
	'Container',
	'Note',
	'List',
	'Category',
	// 'ListItem', // disable
] as const;

export const KNOWLEDGE_ENTITY = [
	{
		item: 'Person',
		fields:
			'Display|Description|Tags|Profession|Last Name|First Name|Phone|E Mail|Photos|Url|Attachments',
	},
	{ item: 'Org', fields: 'Display|Description|Tags|Name|Kind|Photos|Url|Attachments' },
	{
		item: 'Location',
		fields:
			'Display|Description|Tags|Address 1|Address 2|Postal Code|City|State|Country|Photos|Url|Attachments',
	},
	{ item: 'Event', fields: 'Display|Description|Tags|Photos|Url|Attachments' },
	{
		item: 'Movie',
		fields: 'Display|Description|Tags|Photos|Url|Attachments',
	},
	{
		item: 'Book',
		fields: 'Display|Description|Tags|Language|Country|Summary|Photos|Url|Attachments',
	},
	{
		item: 'Asset',
		fields: 'Display|Description|Tags|Photos|Url|Attachments',
	},
	{
		item: 'Container',
		fields: 'Display|Description|Tags|Photos|Url|Attachments',
	},
	{
		item: 'Note',
		fields: 'Display|Description|Tags|Photos|Url|Attachments',
	},
	{
		item: 'List',
		fields: 'Display|Description|Tags|Name|Photos|Url|Attachments',
	},
	{
		item: 'Category',
		fields: 'Display|Description|Tags|Name|Value|Photos|Url|Attachments',
	},
	// {
	// 	item: 'ListItem',
	// 	fields: 'Display|Description|Tags|Name|Done|Photos|Url|Attachments',
	// },
];

export const getEntityAvailableFields = (fieldConfig: string): string[] => {
	return fieldConfig.split('|');
};

export const getRandomEntity = (): string => {
	const index = getRandomIndex(ENTITY_LIST.length);
	return ENTITY_LIST[index];
};
