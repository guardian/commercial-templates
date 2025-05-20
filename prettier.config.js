import guardianPrettier from '@guardian/prettier';

export default {
	...guardianPrettier,
	plugins: ['prettier-plugin-svelte'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
