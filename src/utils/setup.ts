// http://localhost/apps/?app=knowledge?page=LandingPage&mode=test7
// https://bldrdojo.com/apps/?app=assets&page=LandingPage&mode=test1

const AppName = ['assets', 'knowledge'] as const;

export const getAppUrl = (appName: (typeof AppName)[number]) => {
	if (!process.env.BASE_URL) {
		throw new Error('BASE_URL environment variable is not set');
	}
	if(process.env.BASE_URL.startsWith('localhost'))
		return `http://${process.env.BASE_URL}/apps/?app=${appName}`;

	return `https://${process.env.BASE_URL}/apps/?app=${appName}`;
};

export const getEnvTestVersion = (
	appName: (typeof AppName)[number],
	testVersion: number = 8,
): string => {
	const url = getAppUrl(appName);
	return `${url}&page=LandingPage&mode=test${testVersion}`;
};
