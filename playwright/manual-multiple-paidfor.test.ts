import { expect, test } from '@playwright/test';

const viewport = { width: 1600, height: 1000 };

const widths = ['360', '740', '980', '1300', '100%'];

test.describe('Manual Multiple visual regression testing', () => {
	for (const breakpoint of widths) {
		test(`Manual Multiple: ${breakpoint}`, async ({ page }) => {
			await page.setViewportSize(viewport);

			await page.goto(
				'https://guardian.github.io/commercial-templates/csr/manual-multiple/',
				{
					waitUntil: 'networkidle',
				},
			);

			const referenceTemplateLocator = page
				.frameLocator(`[name='width-${breakpoint}']`)
				.locator('html');
			// check that the template is present on the page
			await referenceTemplateLocator.isVisible();
			// scroll to it
			await referenceTemplateLocator.scrollIntoViewIfNeeded();

			await referenceTemplateLocator.screenshot({
				path: `./playwright/reference-images/Manual-multiple-${breakpoint.replace('%', '')}.png`,
			});

			await page.goto('http://localhost:7777/csr/manual-multiple', {
				waitUntil: 'networkidle',
			});

			const testTemplateLocator = page
				.frameLocator(`[name='width-${breakpoint}']`)
				.locator('html');
			// check that the template is present on the page
			await testTemplateLocator.isVisible();
			// scroll to it
			await testTemplateLocator.scrollIntoViewIfNeeded();
			// compare screenshot
			await expect(testTemplateLocator).toHaveScreenshot(
				`Manual-multiple-${breakpoint.replace('%', '')}.png`,
				{ maxDiffPixelRatio: 0.02 },
			);
		});
	}
});
