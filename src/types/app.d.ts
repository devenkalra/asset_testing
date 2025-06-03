import { Locator } from '@playwright/test';
import { LOCATION_TYPE } from '../constant/app';

export type ElementInfo = { element: Locator; index: number };

export type LocationType = (typeof LOCATION_TYPE)[number];
