import { expect, test } from '@playwright/test';

const viewport = { width: 1400, height: 1000 };

const widths = [360, 740, 980, 1300, '100%'];

test.describe('CAPI Multiple PaidFor visual regression testing', () => {
	for (const breakpoint of widths) {
		test(`CAPI Multiple PaidFor: ${breakpoint}`, async ({ page }) => {
			await page.setViewportSize(viewport);

			await page.goto('http://localhost:7777/csr/capi-multiple-paidfor', {
				waitUntil: 'networkidle',
			});

			const templateLocator = page.locator(`[name='width-${breakpoint}']`);
			// check that the template is present on the page
			await templateLocator.isVisible();
			// update viewport to ensure that iframes size properly
			await page.setViewportSize(viewport);
			// scroll to it
			await templateLocator.scrollIntoViewIfNeeded();
			// compare screenshot
			await expect(templateLocator).toHaveScreenshot(
				`CAPI-Multiple-PaidFor-${breakpoint}.png`,
				{ maxDiffPixels: 100 },
			);
		});
	}
});
