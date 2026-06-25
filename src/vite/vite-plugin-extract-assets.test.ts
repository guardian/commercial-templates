import { describe, expect, it } from 'vitest';
import { escapeScriptMarkup } from './vite-plugin-extract-assets.js';

describe('escapeScriptMarkup', () => {
	it('leaves a script with no "<" unchanged', () => {
		const code = `const total = a + b;`;
		expect(escapeScriptMarkup(code)).toBe(code);
	});

	it('escapes tag-like markup inside a double-quoted string', () => {
		const code = `const html = "<header><h1>Hi</h1></header>";`;
		expect(escapeScriptMarkup(code)).toBe(
			`const html = "\\x3cheader>\\x3ch1>Hi\\x3c/h1>\\x3c/header>";`,
		);
	});

	it('escapes markup inside a template literal but keeps interpolation', () => {
		const code = 'const html = `<div>${value}</div>`;';
		expect(escapeScriptMarkup(code)).toBe(
			'const html = `\\x3cdiv>${value}\\x3c/div>`;',
		);
	});

	it('does not touch "<" used as a comparison or bit-shift operator', () => {
		const code = `for (let i = 0; i < n; i++) { mask = 1 << i; }`;
		expect(escapeScriptMarkup(code)).toBe(code);
	});

	it('escapes markup in a string while leaving operators in the same script alone', () => {
		const code = `if (i < n) { el.innerHTML = "</p>"; }`;
		expect(escapeScriptMarkup(code)).toBe(
			`if (i < n) { el.innerHTML = "\\x3c/p>"; }`,
		);
	});

	it('preserves the runtime value: un-escaping "\\x3c" returns the original source', () => {
		const code = `const html = "<header></header>";`;
		const escaped = escapeScriptMarkup(code);

		// `\x3c` is the character `<`, so the script's behaviour is unchanged...
		expect(escaped.replaceAll('\\x3c', '<')).toBe(code);
		// ...but the served source no longer contains any tag-like `<`.
		expect(escaped).not.toContain('<');
	});
});
