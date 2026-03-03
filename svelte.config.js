import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readdir } from 'fs/promises';

const buildRoute = process.env.BUILD_TEMPLATE;

const dirs = await readdir('src/routes/templates');
const templateNames = dirs.filter((dir) => !dir.startsWith('+'));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: buildRoute ? `build/templates/${buildRoute}` : 'build',
		}),

		outDir: buildRoute ? `.svelte-kit/${buildRoute}` : '.svelte-kit',

		paths: {
			base: buildRoute ? '/gampad/ads' : '/commercial-templates',
		},

		files: {
			routes: buildRoute ? `src/routes/templates/${buildRoute}` : 'src/routes',
		},

		alias: {
			$templates: './src/templates',
			$styles: './src/styles',
		},
		output: {
			bundleStrategy: 'inline',
		},

		prerender: {
			// The crawler tries to follow %%CLICK_URL_UNESC%% and breaks the build, so we disable it and instead specify the entries to prerender manually.
			crawl: false,
			entries: buildRoute
				? undefined
				: ['*', ...templateNames.map((name) => `/preview/${name}/`)],
		},
	},
};

export default config;
