/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'@guardian/eslint-config-typescript',
		'plugin:svelte/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	extends: ['@guardian/eslint-config-typescript'],
	plugins: ['svelte3', '@typescript-eslint', 'import'],
	ignorePatterns: [
		'*.cjs',
		'svelte.config.js',
		'vite.config.js',
		'legacy/**',
		'backstop_data/**',
	],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript'),
		'import/resolver': {
			typescript: {},
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
			rules: {
				'svelte/no-at-html-tags': 'off',
			},
		},
	],
	rules: {
		// doesn't seem to work with svelte's `$app/*` imports
		'import/no-unresolved': 'off',
	},
};
