import { expect, test } from '@playwright/test';
import { localBaseUrl, referenceBaseUrl } from './utils';

const viewport = { width: 1600, height: 1000 };

const widths = ['360', '740', '980', '1300', '100%'];

test.describe('Manual Multiple visual regression testing', () => {
	test('Get reference screenshots', async ({ page }) => {
		await page.setViewportSize(viewport);

		await page.goto(`${referenceBaseUrl}csr/manual-multiple/`, {
			waitUntil: 'networkidle',
		});

		for (const breakpoint of widths) {
			const referenceTemplateLocator = page
				.frameLocator(`[name='width-${breakpoint}']`)
				.locator('html');
			// check that the template is present on the page
			expect(referenceTemplateLocator).toBeVisible();
			// scroll to it
			await referenceTemplateLocator.scrollIntoViewIfNeeded();
			// take a reference screenshot
			await referenceTemplateLocator.screenshot({
				path: `./playwright/reference-images/Manual-multiple-${breakpoint.replace('%', '')}.png`,
			});
		}
	});

	test('Compare PR templates to reference screenshots', async ({ page }) => {
		await page.setViewportSize(viewport);

		await page.goto(`${localBaseUrl}csr/manual-multiple`, {
			waitUntil: 'networkidle',
		});

		for (const breakpoint of widths) {
			const testTemplateLocator = page
				.frameLocator(`[name='width-${breakpoint}']`)
				.locator('html');
			// check that the template is present on the page
			expect(testTemplateLocator).toBeVisible();
			// scroll to it
			await testTemplateLocator.scrollIntoViewIfNeeded();
			// compare screenshot to reference
			await expect(testTemplateLocator).toHaveScreenshot(
				`Manual-multiple-${breakpoint.replace('%', '')}.png`,
				{ maxDiffPixelRatio: 0.004 },
			);
		}
	});
});
