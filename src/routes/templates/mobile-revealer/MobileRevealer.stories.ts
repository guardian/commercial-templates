import type { Meta, StoryObj } from '@storybook/sveltekit';
import { mocked } from 'storybook/test';
import * as messenger from '../../../lib/messenger';
import {
	renderMessengerMessage,
	resetMessengerStyles,
} from '../../../lib/storybook-messenger';
import Page from './+page.svelte';
import { gamVariables } from './variables.gam';

const transparentPixel =
	'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=#';

const meta = {
	title: 'Templates/Mobile Revealer',
	component: Page,
	args: {
		data: {
			...gamVariables,
			TrackingPixel: transparentPixel,
			ResearchPixel: transparentPixel,
			ViewabilityTracker: transparentPixel,
		},
	},
	beforeEach() {
		resetMessengerStyles();
		mocked(messenger.post).mockImplementation(renderMessengerMessage);

		return resetMessengerStyles;
	},
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
