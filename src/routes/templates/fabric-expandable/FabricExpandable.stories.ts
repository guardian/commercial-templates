import type { Meta, StoryObj } from '@storybook/sveltekit';
import { userEvent } from 'storybook/test';
import Page from './+page.svelte';
import { gamVariables } from './variables.gam';

// GAM clips the ad slot iframe to the collapsed/expanded height; simulate that on the body so the two states actually render at different sizes
const clipBody = (height: number) => () => {
	document.body.style.height = `${height}px`;
	document.body.style.overflow = 'hidden';

	return () => {
		document.body.style.height = '';
		document.body.style.overflow = '';
	};
};

const meta = {
	title: 'Templates/Fabric Expandable',
	component: Page,
	args: { data: gamVariables },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
	beforeEach: clipBody(250),
};

export const Expanded: Story = {
	// mirrors the playwright reference capture: click to expand, then wait out the 1s height transition
	beforeEach: clipBody(500),
	parameters: {
		chromatic: { delay: 1500 },
	},
	play: async ({ canvasElement }) => {
		const toggle =
			canvasElement.querySelector<HTMLButtonElement>('.toggle-arrow');

		if (!toggle) {
			throw new Error('Expected story to render an expand button');
		}

		await userEvent.click(toggle);
	},
};
