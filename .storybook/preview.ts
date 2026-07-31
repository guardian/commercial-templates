import { breakpoints } from '@guardian/source/foundations';
import type { Preview } from '@storybook/sveltekit';
import '../src/styles/global.scss';

const preview: Preview = {
	parameters: {
		layout: 'fullscreen',
		chromatic: {
			viewports: [
				360,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.wide,
				1600,
			],
		},
	},
};

// eslint-disable-next-line import/no-default-export -- Storybook preview config
export default preview;
