import { expect, test } from '@playwright/test';
import { localBaseUrl, referenceBaseUrl, templatePreviewWidths } from './utils';

const viewport = { width: 1600, height: 1000 };

test.skip('Fabric', () => {
	test('Get reference screenshots', async ({ page }) => {
		await page.setViewportSize(viewport);

		await page.goto(`${referenceBaseUrl}csr/fabric/`, {
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
			// take a reference screenshot
			await referenceTemplateLocator.screenshot({
				path: `./playwright/reference-images/Fabric-${width.replace('%', '')}.png`,
			});
		}
	});

	test('Compare PR templates to reference screenshots', async ({ page }) => {
		await page.setViewportSize(viewport);

		await page.goto(`${localBaseUrl}csr/fabric`, {
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
			// compare screenshot to reference
			await expect(testTemplateLocator).toHaveScreenshot(
				`Fabric-${width.replace('%', '')}.png`,
				{ maxDiffPixelRatio: 0.006 },
			);
		}
	});
});
