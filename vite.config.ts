/* eslint-disable import/no-default-export -- vite config */
import { sveltekit } from '@sveltejs/kit/vite';
import { extractTemplateAssets } from './src/vite/vite-plugin-extract-assets';
import { transformGAMVariables } from './src/vite/vite-plugin-transform-gam-variables';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [transformGAMVariables(), sveltekit(), extractTemplateAssets()],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
};

export default config;
