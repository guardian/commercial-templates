import { expect, test } from '@playwright/test';
import { localBaseUrl, referenceBaseUrl, templates } from './utils';

const viewport = { width: 1600, height: 1000 };

test.describe.configure({ mode: 'parallel' });

templates.forEach(({ name, path, templatePreviewWidths }) =>
	test(`Compare snapshots for ${name}`, async ({ page }) => {
		test.setTimeout(60000);
		if (path.includes('fabric-custom')) {
			test.slow();
		}
		await page.setViewportSize(viewport);

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
				// expand the template ad
				referenceTemplateLocator.locator('.toggle-arrow').click();
				// wait for template expansion transition
				await new Promise((r) => setTimeout(r, 1500));
				// take a reference screenshot of the expanded template
				await referenceTemplateLocator.screenshot({
					path: `./playwright/reference-images/Fabric-expandable-${width.replace('%', '')}-expanded.png`,
				});
				// collapse the template ad
				referenceTemplateLocator.locator('.toggle-arrow').click();
				// wait for template collapse transition
				await new Promise((r) => setTimeout(r, 1500));
				// take a reference screenshot of the template when not expanded
				await referenceTemplateLocator.screenshot({
					path: `./playwright/reference-images/Fabric-expandable-${width.replace('%', '')}-not-expanded.png`,
				});
			} else {
				// take a reference screenshot
				await referenceTemplateLocator.screenshot({
					path: `./playwright/reference-images/${name}-${width.replace('%', '')}.png`,
				});
			}
		}

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
				// expand the template ad
				testTemplateLocator.locator('.toggle-arrow').click();
				// wait for template expansion transition
				await new Promise((r) => setTimeout(r, 1500));
				// take a reference screenshot of the expanded template
				await expect(testTemplateLocator).toHaveScreenshot(
					`Fabric-expandable-${width.replace('%', '')}-expanded.png`,
					{ maxDiffPixelRatio: 0.006 },
				);
				// collapse the template ad
				testTemplateLocator.locator('.toggle-arrow').click();
				// wait for template collapse transition
				await new Promise((r) => setTimeout(r, 1500));
				//take a reference screenshot of the template when not expanded
				await expect(testTemplateLocator).toHaveScreenshot(
					`Fabric-expandable-${width.replace('%', '')}-not-expanded.png`,
					{ maxDiffPixelRatio: 0.006 },
				);
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
