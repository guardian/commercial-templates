import type { Meta, StoryObj } from '@storybook/sveltekit';
import { mocked } from 'storybook/test';
import * as capiMultiple from '$lib/capiMultiple';
import { capiMultipleHostedArticles } from '../../../lib/fixtures/capi';
import Page from './+page.svelte';
import { gamVariables } from './variables.gam';

const meta = {
	title: 'Templates/CAPI Multiple Hosted',
	component: Page,
	args: { data: gamVariables },
	beforeEach() {
		mocked(capiMultiple.retrieveCapiData).mockResolvedValue({
			articles: capiMultipleHostedArticles,
		});
	},
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
