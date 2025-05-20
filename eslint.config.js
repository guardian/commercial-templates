import globals from 'globals';
import guardian from '@guardian/eslint-config';
import svelte from 'eslint-plugin-svelte';
import svelteConfig from './svelte.config.js';

const svelteFiles = ['**/*.svelte', '**/*.svelte.{js,ts}'];

export default [
	{
		ignores: [
			...svelteFiles,
			'**/*.config.{js,ts}',
			'**/build',
			'**/.svelte-kit',
			'**/playwright',
		],
	},
	...guardian.configs.recommended,
	...guardian.configs.typescript,
	...guardian.configs.jest,
	...svelte.configs.base,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: svelteFiles,
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				svelteConfig,
			},
		},
	},
];
