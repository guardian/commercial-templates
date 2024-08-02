import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testMatch: 'playwright/**/*.test.ts',
	projects: [
		{
			name: 'Chrome Stable',
			use: {
				browserName: 'chromium',
				channel: 'chrome',
			},
		},
	],
	testDir: './playwright',
	snapshotPathTemplate: '{testDir}/reference-images/{arg}{ext}',
};

export default config;
