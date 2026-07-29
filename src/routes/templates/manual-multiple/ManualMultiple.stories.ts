import type { Meta, StoryObj } from '@storybook/sveltekit';
import Page from './+page.svelte';
import { gamVariables } from './variables.gam';

const meta = {
	title: 'Templates/Manual Multiple',
	component: Page,
	args: {
		data: gamVariables,
	},
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
