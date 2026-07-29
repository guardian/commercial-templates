import type { Meta, StoryObj } from '@storybook/sveltekit';
import Page from './+page.svelte';
import { gamVariables } from './variables.gam';

const transparentPixel =
	'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=#';

const meta = {
	title: 'Templates/Image Native',
	component: Page,
	args: {
		data: {
			...gamVariables,
			TrackingPixel: transparentPixel,
			ResearchPixel: transparentPixel,
			ViewabilityTracker: transparentPixel,
		},
	},
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
