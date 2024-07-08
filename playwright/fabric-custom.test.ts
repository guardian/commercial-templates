import { expect, test } from '@playwright/test';

const viewport = { width: 1600, height: 1000 };

const widths = ['360', '740', '980', '1300', '100%'];

test.describe('Fabric Custom visual regression testing', () => {
	test('Get reference screenshots', async ({ page }) => {
		// increase default test timeout to accommodate waiting for creative to stop moving
		test.setTimeout(60000);

		await page.setViewportSize(viewport);

		await page.goto(
			'https://guardian.github.io/commercial-templates/ssr/fabric-custom/',
			{
				waitUntil: 'networkidle',
			},
		);

		// the Fabric Custom has an animated creative, so we wait for it to stop moving before taking a screenshot
		await page.waitForTimeout(15000);

		for (const breakpoint of widths) {
			const referenceTemplateLocator = page
				.frameLocator(`[name='width-${breakpoint}']`)
				.locator('#creative');
			// check that the template is present on the page
			await referenceTemplateLocator.isVisible();
			// scroll to it
			await referenceTemplateLocator.scrollIntoViewIfNeeded();
			// take a reference screenshot
			await referenceTemplateLocator.screenshot({
				path: `./playwright/reference-images/Fabric-custom-${breakpoint.replace('%', '')}.png`,
			});
		}
	});

	test('Compare PR templates to reference screenshots', async ({ page }) => {
		// increase default test timeout to accommodate waiting for creative to stop moving
		test.setTimeout(60000);

		await page.setViewportSize(viewport);

		await page.goto('http://localhost:7777/ssr/fabric-custom', {
			waitUntil: 'networkidle',
		});

		// the Fabric Custom has an animated creative, so we wait for it to stop moving before taking a screenshot
		await page.waitForTimeout(15000);

		for (const breakpoint of widths) {
			const testTemplateLocator = page
				.frameLocator(`[name='width-${breakpoint}']`)
				.locator('#creative');
			// check that the template is present on the page
			await testTemplateLocator.isVisible();
			// scroll to it
			await testTemplateLocator.scrollIntoViewIfNeeded();
			// compare screenshot to reference
			await expect(testTemplateLocator).toHaveScreenshot(
				`Fabric-custom-${breakpoint.replace('%', '')}.png`,
				{ maxDiffPixelRatio: 0.004 },
			);
		}
	});
});
