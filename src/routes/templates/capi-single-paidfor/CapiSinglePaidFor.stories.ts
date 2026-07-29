import type { Meta, StoryObj } from '@storybook/sveltekit';
import { mocked } from 'storybook/test';
import * as capi from '$lib/capi';
import { capiSinglePaidForArticle } from '../../../lib/fixtures/capi';
import Page from './+page.svelte';
import { gamVariables } from './variables.gam';

const meta = {
	title: 'Templates/CAPI Single Paid For',
	component: Page,
	args: { data: gamVariables },
	beforeEach() {
		mocked(capi.retrieveCapiData<'single'>).mockResolvedValue(
			capiSinglePaidForArticle,
		);
	},
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
