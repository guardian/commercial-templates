/* eslint-disable import/no-default-export -- vite config */
import { sveltekit } from '@sveltejs/kit/vite';
import { extractTemplateAssets } from './vite-plugin-extract-assets.js';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), extractTemplateAssets()],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
};

export default config;
