import type { Meta, StoryObj } from '@storybook/sveltekit';
import Page from './+page.svelte';
import { gamVariables } from './variables.gam';

const meta = {
	title: 'Templates/Fabric Custom XL',
	component: Page,
	args: { data: gamVariables },
	// the creative markup is fetched over the network onMount and inserted into the DOM, so give it time to arrive before Chromatic snapshots
	parameters: {
		chromatic: { delay: 12000 },
	},
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
