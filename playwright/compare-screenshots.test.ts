import { expect, test } from '@playwright/test';
import { localBaseUrl, referenceBaseUrl, templates } from './utils';
import {
	takeScreenshotsFabricExpandable,
	compareScreenshotsFabricExpandable,
} from './fabric-expandable';

const viewport = { width: 1600, height: 1000 };
test.describe.configure({ mode: 'parallel' });

templates.forEach(({ name, path, templatePreviewWidths }) =>
	test(`Compare snapshots for ${name}`, async ({ page }) => {
		test.setTimeout(60000);
		if (path.includes('fabric-custom')) {
			test.slow();
		}
		await page.setViewportSize(viewport);

		// Take screenshots of templates in PROD for reference
		await page.goto(`${referenceBaseUrl}${path}/`, {
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

			if (path.includes('fabric-video')) {
				// remove autoplay from video to get a repeatable screenshot
				const templateVideo = await referenceTemplateLocator.locator('video');
				await templateVideo.evaluate((video) =>
					video.removeAttribute('autoplay'),
				);
			}

			if (path.includes('fabric-custom')) {
				// wait for animations to complete so that we can get a repeatable screenshot
				await new Promise((r) => setTimeout(r, 12000));
			}

			if (path.includes('fabric-expandable')) {
				takeScreenshotsFabricExpandable(referenceTemplateLocator, width);
			} else {
				// take a reference screenshot
				await referenceTemplateLocator.screenshot({
					path: `./playwright/reference-images/${name}-${width.replace('%', '')}.png`,
				});
			}
		}

		// Compare current templates with reference templates
		await page.goto(`${localBaseUrl}${path}/`, {
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

			if (path.includes('fabric-expandable')) {
				compareScreenshotsFabricExpandable(testTemplateLocator, width);
			} else {
				// compare screenshot to reference
				await expect(testTemplateLocator).toHaveScreenshot(
					`${name}-${width.replace('%', '')}.png`,
					{ maxDiffPixelRatio: 0.006 },
				);
			}
		}
	}),
);
