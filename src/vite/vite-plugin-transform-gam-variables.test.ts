import { describe, expect, it } from 'vitest';
import { transformGAMVariables } from './vite-plugin-transform-gam-variables.js';

describe('transformGAMVariables', () => {
	const plugin = transformGAMVariables() as {
		transform: (
			code: string,
			path: string,
		) => Promise<{ code: string; map: null } | null>;
	};
	const { transform } = plugin;

	it('should return null for files not ending with variables.gam.ts', async () => {
		const result = await transform('some code', '/path/to/file.ts');
		expect(result).toBeNull();
	});

	it('should transform single-quoted string values', async () => {
		const input = `export const gamVariables = { Title: 'Test Ad' };`;
		const expected = `export const gamVariables = { Title: '[%Title%]' };`;

		const result = await transform(input, '/path/to/variables.gam.ts');
		expect(result?.code).toBe(expected);
	});

	it('should transform double-quoted string values', async () => {
		const input = `export const gamVariables = { Title: "Test Ad" };`;
		const expected = `export const gamVariables = { Title: '[%Title%]' };`;

		const result = await transform(input, '/path/to/variables.gam.ts');
		expect(result?.code).toBe(expected);
	});

	it('should transform backtick-quoted string values', async () => {
		const input = `export const gamVariables = { Title: \`Test Ad\` };`;
		const expected = `export const gamVariables = { Title: '[%Title%]' };`;

		const result = await transform(input, '/path/to/variables.gam.ts');
		expect(result?.code).toBe(expected);
	});

	it('should transform multiple properties', async () => {
		const input = `export const gamVariables = {
    Title: 'Test Ad',
    Description: "Ad description",
    ImageUrl: \`https://example.com\`
};`;
		const expected = `export const gamVariables = {
    Title: '[%Title%]',
    Description: '[%Description%]',
    ImageUrl: '[%ImageUrl%]'
};`;

		const result = await transform(input, '/path/to/variables.gam.ts');
		expect(result?.code).toBe(expected);
	});

	it('should handle empty gamVariables object', async () => {
		const input = `export const gamVariables = {};`;
		const expected = `export const gamVariables = {};`;

		const result = await transform(input, '/path/to/variables.gam.ts');
		expect(result?.code).toBe(expected);
	});

	it('should preserve other exports', async () => {
		const input = `export const otherVar = 'keep me';
export const gamVariables = { Title: 'Test Ad' };
export const anotherVar = 'keep me too';`;

		const result = await transform(input, '/path/to/variables.gam.ts');
		expect(result?.code).toContain(`export const otherVar = 'keep me'`);
		expect(result?.code).toContain(`export const anotherVar = 'keep me too'`);
		expect(result?.code).toContain(`Title: '[%Title%]'`);
	});

	it('should handle whitespace variations', async () => {
		const input = `export const gamVariables={Title:'Test Ad',Name:"John"};`;

		const result = await transform(input, '/path/to/variables.gam.ts');
		expect(result?.code).toContain(`Title: '[%Title%]'`);
		expect(result?.code).toContain(`Name: '[%Name%]'`);
	});

	it('should return code and null map', async () => {
		const input = `export const gamVariables = { Title: 'Test Ad' };`;

		const result = await transform(input, '/path/to/variables.gam.ts');
		expect(result).toHaveProperty('code');
		expect(result).toHaveProperty('map');
		expect(result?.map).toBeNull();
	});
});
