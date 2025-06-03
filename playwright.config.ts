import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default  ({
	testDir: './tests',
	/* Run tests in files in parallel */
	fullyParallel: false,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: 0,
	/* Opt out of parallel tests on CI. */
	workers: 1,

	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [['html'], ['list']],
	/* Shared settings for all the projects below. cd
	See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://127.0.0.1:3000',
    extraHTTPHeaders: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		bypassCSP: true,
		storageState: undefined,
		viewport: { width: 2000, height: 1000},
		trace: 'on',
		headless: false, //for running on github action. run cmd line by addition --headed
		permissions: ['camera', 'microphone'],
		actionTimeout: 10 * 1000, // for upload take times to wait
	},
	expect: {
		timeout: 10 * 1000,
	},
	/* Timeout settings
	timeout: 2 * 60 * 1000,
	globalTimeout: 10 * 60 * 1000,
 */
	timeout: 600 * 1000,
	globalTimeout: 600 * 1000,
	/* Configure projects for major browsers */
	projects: [
		/*
		{
			name: 'iphone-chromium',
			use: {
				...devices['iPhone 15'],
				browserName: 'chromium',
				isMobile: true,
				permissions: ['camera'],
			},
		},

		 */

		// {
		//   name: 'firefox',
		//   use: { ...devices['Desktop Firefox'] },
		// },

		// {
		//   name: 'webkit',
		//   use: { ...devices['Desktop Safari'] },
		// },

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		 {
		   name: 'Google Chrome',
		   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		 },
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
