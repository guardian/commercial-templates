import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isDev = process.env.NODE_ENV === 'development';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		prerender: {
			default: true,
		},

		paths: {
			base: isDev ? undefined : '/commercial-templates',
		},

		// Github pages really likes its trailing slashes!
		trailingSlash: isDev ? 'never' : 'always',
	},
};

export default config;
