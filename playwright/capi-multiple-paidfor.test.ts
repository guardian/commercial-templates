import { expect, test } from '@playwright/test';
import { localBaseUrl, referenceBaseUrl, templatePreviewWidths } from './utils';

test.describe('CAPI Multiple Paidfor', () => {
	test('Get reference screenshots', async ({ page }) => {
		await page.goto(`${referenceBaseUrl}csr/capi-multiple-paidfor/`, {
			waitUntil: 'networkidle',
		});

		for (const width of templatePreviewWidths) {
			const referenceTemplateLocator = page
				.frameLocator(`[name='width-${width}']`)
				.locator('aside');
			// check that the template is present on the page
			expect(referenceTemplateLocator).toBeVisible();
			// scroll to it
			await referenceTemplateLocator.scrollIntoViewIfNeeded();
			// take a reference screenshot
			await referenceTemplateLocator.screenshot({
				path: `./playwright/reference-images/CAPI-Multiple-Paidfor-${width.replace('%', '')}.png`,
			});
		}
	});

	test('Compare PR templates to reference screenshots', async ({ page }) => {
		await page.goto(`${localBaseUrl}csr/capi-multiple-paidfor`, {
			waitUntil: 'networkidle',
		});

		for (const width of templatePreviewWidths) {
			const testTemplateLocator = page
				.frameLocator(`[name='width-${width}']`)
				.locator('aside');
			// check that the template is present on the page
			expect(testTemplateLocator).toBeVisible();
			// scroll to it
			await testTemplateLocator.scrollIntoViewIfNeeded();
			// compare screenshot to reference
			await expect(testTemplateLocator).toHaveScreenshot(
				`CAPI-Multiple-Paidfor-${width.replace('%', '')}.png`,
				{ maxDiffPixelRatio: 0.006 },
			);
		}
	});
});
