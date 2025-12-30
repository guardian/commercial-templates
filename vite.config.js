/* eslint-disable import/no-default-export -- vite config */
import { sveltekit } from '@sveltejs/kit/vite';
import { extractTemplateAssets } from './vite-plugin-extract-assets.js';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), extractTemplateAssets()],
};

export default config;
