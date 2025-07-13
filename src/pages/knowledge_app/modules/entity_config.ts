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
			'Display|Description|Tags|Profession|Last Name|First Name|Phone|dob|E Mail|Photos|Url|Attachment',
	},
	{ item: 'Org', fields: 'Display|Description|Tags|Name|Kind|Photos|Url|Attachment' },
	{
		item: 'Location',
		fields:
			'Display|Description|Tags|Address 1|Address 2|Postal Code|City|State|Country|Photos|Url|Attachment',
	},
	{ item: 'Event', fields: 'Display|Description|Tags|heldOn|heldOnTZ|Photos|Url|Attachment' },
	{
		item: 'Movie',
		fields: 'Display|Description|Tags|year|language|country|Photos|Url|Attachment',
	},
	{
		item: 'Book',
		fields: 'Display|Description|Tags|Year|Language|Country|Summary|Photos|Url|Attachment',
	},
	{
		item: 'Asset',
		fields: 'Display|Description|Tags|acquiredOn|Photos|Url|Attachment',
	},
	{
		item: 'Container',
		fields: 'Display|Description|Tags|Photos|Url|Attachment',
	},
	{
		item: 'Note',
		fields: 'Display|Description|Tags|Date Time|Photos|Url|Attachment',
	},
	{
		item: 'List',
		fields: 'Display|Description|Tags|Name|Photos|Url|Attachment',
	},
	{
		item: 'Category',
		fields: 'Display|Description|Tags|Name|Value|Photos|Url|Attachment',
	},
	// {
	// 	item: 'ListItem',
	// 	fields: 'Display|Description|Tags|Name|Done|Photos|Url|Attachment',
	// },
];

export const getEntityAvailableFields = (fieldConfig: string): string[] => {
	return fieldConfig.split('|');
};

export const getRandomEntity = (): string => {
	const index = getRandomIndex(ENTITY_LIST.length);
	return ENTITY_LIST[index];
};
