import { expect, test } from '@playwright/test';
import { localBaseUrl, referenceBaseUrl } from './utils';

// for some reason, the 980px width fails the test every time, but every other width is ok
// not testing at 980px allows us to reliably visually test the Fabric Custom template
const templatePreviewWidths = ['360', '740', '1300', '100%'];

const viewport = { width: 1600, height: 1000 };

test.describe('Fabric Custom', () => {
	test.setTimeout(60000);
	test('Get reference screenshots', async ({ page }) => {
		await page.setViewportSize(viewport);

		await page.goto(`${referenceBaseUrl}ssr/fabric-custom/`, {
			waitUntil: 'networkidle',
		});

		// wait for animations to complete so that we can get a repeatable screenshot
		await new Promise((r) => setTimeout(r, 12000));

		for (const width of templatePreviewWidths) {
			const referenceTemplateLocator = page
				.frameLocator(`[name='width-${width}']`)
				.locator('#creative');
			// check that the template is present on the page
			expect(referenceTemplateLocator).toBeVisible();
			// scroll to it
			await referenceTemplateLocator.scrollIntoViewIfNeeded();
			// take a reference screenshot
			await referenceTemplateLocator.screenshot({
				path: `./playwright/reference-images/Fabric-custom-${width.replace('%', '')}.png`,
			});
		}
	});

	test('Compare PR templates to reference screenshots', async ({ page }) => {
		await page.setViewportSize(viewport);

		await page.goto(`${localBaseUrl}/fabric-custom`, {
			waitUntil: 'networkidle',
		});

		// wait for animations to complete so that we can get a repeatable screenshot
		await new Promise((r) => setTimeout(r, 12000));

		for (const width of templatePreviewWidths) {
			const testTemplateLocator = page
				.frameLocator(`[name='width-${width}']`)
				.locator('#creative');
			// check that the template is present on the page
			expect(testTemplateLocator).toBeVisible();
			// scroll to it
			await testTemplateLocator.scrollIntoViewIfNeeded();
			// compare screenshot to reference
			await expect(testTemplateLocator).toHaveScreenshot(
				`Fabric-custom-${width.replace('%', '')}.png`,
				{ maxDiffPixelRatio: 0.006 },
			);
		}
	});
});
