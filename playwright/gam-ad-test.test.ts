import { expect, test } from '@playwright/test';

const viewport = { width: 1600, height: 1000 };

const templates = [
	'events-multiple',
	'fabric',
	'fabric-xl',
	'fabric-custom',
	'fabric-custom-xl',
	'fabric-expandable',
	'fabric-video',
	'fabric-video-xl',
	'image-native',
	'manual-single',
	'manual-multiple',
	'capi-single-paidfor',
	'capi-multiple-paidfor',
	'capi-multiple-hosted',
	'mobile-revealer',
	'public-good',
];

const templatesWithVideos = [
	'fabric-video',
	'fabric-video-xl',
	'fabric-custom',
	'fabric-custom-xl',
];

test.describe('GAM Ad Test - Visual Regression', () => {
	templates.forEach((template) => {
		test(`${template} - Ad loads with test parameter`, async ({ page }) => {
			await page.setViewportSize(viewport);

			await page.goto(
				`http://localhost:7777/commercial-templates/gam-ad-test/${template}/`,
				{ waitUntil: 'networkidle' }
			);

			const adContainer = page.locator('#dfp-ad--top-above-nav');

			await expect(adContainer).toBeVisible({ timeout: 20000 });

			if (templatesWithVideos.includes(template)) {
				// Wait for video to play
				await page.waitForTimeout(20000);
			}

			await expect(page).toHaveScreenshot(`GAM-${template}.png`, {
				maxDiffPixelRatio: 0.01,
				timeout: 20000,
				fullPage: true,
			});
		});
	});
});
