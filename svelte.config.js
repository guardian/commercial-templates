import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: 'index.html',
		}),

		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
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
