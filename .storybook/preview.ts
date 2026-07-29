import type { Preview } from '@storybook/sveltekit';
import '../src/styles/global.scss';

const preview: Preview = {
	parameters: {
		layout: 'fullscreen',
	},
};

// eslint-disable-next-line import/no-default-export -- Storybook preview config
export default preview;
