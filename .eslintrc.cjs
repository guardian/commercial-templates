module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['@guardian/eslint-config-typescript'],
	plugins: ['svelte3', '@typescript-eslint', 'import'],
	ignorePatterns: ['*.cjs', 'svelte.config.js', 'vite.config.js', 'legacy/**'],
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
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
};
