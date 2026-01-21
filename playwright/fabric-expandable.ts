import { expect, Locator } from '@playwright/test';

const takeScreenshotsFabricExpandable = async (
	referenceTemplateLocator: Locator,
	width: string,
) => {
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
};

const compareScreenshotsFabricExpandable = async (
	testTemplateLocator: Locator,
	width: string,
) => {
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
};

export { takeScreenshotsFabricExpandable, compareScreenshotsFabricExpandable };
