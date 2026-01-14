import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const buildRoute = process.env.BUILD_TEMPLATE;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: 'index.html',
			pages: buildRoute ? `build/templates/${buildRoute}` : 'build',
		}),

		outDir: buildRoute ? `.svelte-kit/${buildRoute}` : '.svelte-kit',

		paths: {
			base: process.argv.includes('dev') ? '' : '/gampad/ads',
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
			crawl: false,
		},
	},
};

export default config;
