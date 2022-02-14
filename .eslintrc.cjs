module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['@guardian/eslint-config-typescript'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs', 'svelte.config.js'],
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
	},
	plugins: ['@typescript-eslint', 'import'],
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
};
