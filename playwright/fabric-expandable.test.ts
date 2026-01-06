import { expect, test } from '@playwright/test';
import { localBaseUrl, referenceBaseUrl, templatePreviewWidths } from './utils';

const viewport = { width: 1600, height: 1000 };

test.describe('Fabric Expandable', () => {
	test('Get reference screenshots', async ({ page }) => {
		await page.setViewportSize(viewport);

		await page.goto(`${referenceBaseUrl}csr/fabric-expandable/`, {
			waitUntil: 'networkidle',
		});

		for (const width of templatePreviewWidths) {
			const referenceTemplateLocator = page.locator(`[name='width-${width}']`);
			const referenceTemplateHtmlLocator = page
				.frameLocator(`[name='width-${width}']`)
				.locator('html');
			// check that the template is present on the page
			expect(referenceTemplateLocator).toBeVisible();
			// scroll to it
			await referenceTemplateLocator.scrollIntoViewIfNeeded();
			// expand the template ad
			referenceTemplateHtmlLocator.locator('.toggle-arrow').click();
			// wait for template expansion transition
			await new Promise((r) => setTimeout(r, 1500));
			// take a reference screenshot of the expanded template
			await referenceTemplateLocator.screenshot({
				path: `./playwright/reference-images/Fabric-expandable-${width.replace('%', '')}-expanded.png`,
			});
			// collapse the template ad
			referenceTemplateHtmlLocator.locator('.toggle-arrow').click();
			// wait for template collapse transition
			await new Promise((r) => setTimeout(r, 1500));
			// take a reference screenshot of the template when not expanded
			await referenceTemplateLocator.screenshot({
				path: `./playwright/reference-images/Fabric-expandable-${width.replace('%', '')}-not-expanded.png`,
			});
		}
	});

	test('Compare PR templates to reference screenshots', async ({ page }) => {
		await page.setViewportSize(viewport);

		await page.goto(`${localBaseUrl}/fabric-expandable`, {
			waitUntil: 'networkidle',
		});

		for (const width of templatePreviewWidths) {
			const testTemplateLocator = page.locator(`[name='width-${width}']`);
			const testTemplateHtmlLocator = page
				.frameLocator(`[name='width-${width}']`)
				.locator('html');
			// check that the template is present on the page
			expect(testTemplateLocator).toBeVisible();
			// scroll to it
			await testTemplateLocator.scrollIntoViewIfNeeded();
			// expand the template ad
			testTemplateHtmlLocator.locator('.toggle-arrow').click();
			// wait for template expansion transition
			await new Promise((r) => setTimeout(r, 1500));
			// take a reference screenshot of the expanded template
			await expect(testTemplateLocator).toHaveScreenshot(
				`Fabric-expandable-${width.replace('%', '')}-expanded.png`,
				{ maxDiffPixelRatio: 0.006 },
			);
			// collapse the template ad
			testTemplateHtmlLocator.locator('.toggle-arrow').click();
			// wait for template collapse transition
			await new Promise((r) => setTimeout(r, 1500));
			//take a reference screenshot of the template when not expanded
			await expect(testTemplateLocator).toHaveScreenshot(
				`Fabric-expandable-${width.replace('%', '')}-not-expanded.png`,
				{ maxDiffPixelRatio: 0.006 },
			);
		}
	});
});
