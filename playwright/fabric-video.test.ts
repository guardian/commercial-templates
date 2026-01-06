import { expect, test } from '@playwright/test';
import { localBaseUrl, referenceBaseUrl, templatePreviewWidths } from './utils';

const viewport = { width: 1600, height: 1000 };

test.describe('Fabric Video', () => {
	test('Get reference screenshots', async ({ page }) => {
		await page.setViewportSize(viewport);

		await page.goto(`${referenceBaseUrl}csr/fabric-video/`, {
			waitUntil: 'networkidle',
		});

		for (const width of templatePreviewWidths) {
			const referenceTemplateLocator = page
				.frameLocator(`[name='width-${width}']`)
				.locator('html');
			// check that the template is present on the page
			expect(referenceTemplateLocator).toBeVisible();
			// scroll to it
			await referenceTemplateLocator.scrollIntoViewIfNeeded();
			// remove autoplay from video to get a repeatable screenshot
			const templateVideo = await referenceTemplateLocator.locator('video');
			await templateVideo.evaluate((video) =>
				video.removeAttribute('autoplay'),
			);
			// take a reference screenshot
			await referenceTemplateLocator.screenshot({
				path: `./playwright/reference-images/Fabric-video-${width.replace('%', '')}.png`,
			});
		}
	});

	test('Compare PR templates to reference screenshots', async ({ page }) => {
		await page.setViewportSize(viewport);

		await page.goto(`${localBaseUrl}/fabric-video`, {
			waitUntil: 'networkidle',
		});

		for (const width of templatePreviewWidths) {
			const testTemplateLocator = page
				.frameLocator(`[name='width-${width}']`)
				.locator('html');
			// check that the template is present on the page
			expect(testTemplateLocator).toBeVisible();
			// scroll to it
			await testTemplateLocator.scrollIntoViewIfNeeded();
			// remove autoplay from video to get a repeatable screenshot
			const templateVideo = await testTemplateLocator.locator('video');
			await templateVideo.evaluate((video) =>
				video.removeAttribute('autoplay'),
			);
			// compare screenshot to reference
			await expect(testTemplateLocator).toHaveScreenshot(
				`Fabric-video-${width.replace('%', '')}.png`,
				{ maxDiffPixelRatio: 0.006 },
			);
		}
	});
});
