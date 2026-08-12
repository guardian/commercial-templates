import type { Meta, StoryObj } from '@storybook/sveltekit';
import { expect, mocked, waitFor } from 'storybook/test';
import * as cmp from '$lib/cmp';
import * as messenger from '$lib/messenger';
import * as getPageUrl from '$lib/messenger/get-page-url';
import * as publicGood from '$lib/public-good';
import Page from './+page.svelte';

const notOptedOutGppData = {
	gppVersion: 1,
	gppString: '',
	applicableSections: [],
	supportedAPIs: [],
	parsedSections: {},
	signalStatus: 'ready' as const,
	gpcEnabled: false,
};

const optedOutGppData = {
	...notOptedOutGppData,
	parsedSections: { usnat: { Version: 1, SaleOptOut: 1, Gpc: false } },
};

const pageUrl = 'https://www.theguardian.com/lifeandstyle';

const meta = {
	title: 'Templates/Public Good',
	component: Page,
	beforeEach() {
		mocked(getPageUrl.getPageURL).mockResolvedValue(pageUrl);
		mocked(publicGood.create).mockImplementation((el) => {
			el.textContent = '[Public Good ad - mocked creative]';
			el.style.cssText =
				'display:flex;align-items:center;justify-content:center;height:100%;background:#f0f0f0;border:1px dashed #999;font:14px sans-serif;color:#555;';
		});
	},
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

// asserts the real consent/URL/create wiring in +page.svelte
export const Default: Story = {
	beforeEach() {
		mocked(cmp.getGPPData).mockResolvedValue(notOptedOutGppData);
	},
	play: async ({ canvasElement }) => {
		const container = canvasElement.querySelector<HTMLElement>('#public-good');

		await waitFor(() => {
			void expect(publicGood.create).toHaveBeenCalledWith(
				container,
				expect.objectContaining({
					partnerId: 'gmg-guardian',
					attributes: { url: pageUrl },
				}),
			);
		});
	},
};

// verifies the "do not sell" opt-out is respected: no ad is requested, and the slot is passed back for a refresh
export const OptedOut: Story = {
	beforeEach() {
		mocked(cmp.getGPPData).mockResolvedValue(optedOutGppData);
	},
	play: async () => {
		await waitFor(() => {
			void expect(messenger.post).toHaveBeenCalledWith(
				expect.objectContaining({
					type: 'passback-refresh',
					value: 'public-good',
				}),
			);
		});

		void expect(publicGood.create).not.toHaveBeenCalled();
	},
};
