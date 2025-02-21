import { WEBSITE_URL } from '../constant/env';

export const getEnvTestVersion = (testVerion: number = 8): string => {
	return `${WEBSITE_URL}?mode=test${testVerion}`;
};
