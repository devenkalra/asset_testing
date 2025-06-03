import { WEBSITE_URL } from '../constant/env';

//http://localhost/apps/?page=LandingPage&mode=test7&app=asset&

export const getEnvTestVersion = (testVersion: number = 8): string => {
	return `${WEBSITE_URL}&page=LandingPage&mode=test${testVersion}`;
};
