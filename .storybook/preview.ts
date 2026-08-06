import { breakpoints } from '@guardian/source/foundations';
import type { Preview } from '@storybook/sveltekit';
import { sb } from 'storybook/test';
import '../src/styles/global.scss';

sb.mock(import('../src/lib/capi.ts'), { spy: true });
sb.mock(import('../src/lib/capiMultiple.ts'), { spy: true });
sb.mock(import('../src/lib/messenger.ts'), { spy: true });
sb.mock(import('../src/lib/cmp.ts'), { spy: true });
sb.mock(import('../src/lib/messenger/get-page-url.ts'), { spy: true });
sb.mock(import('../src/lib/public-good.ts'), { spy: true });

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
