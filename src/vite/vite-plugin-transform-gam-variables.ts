import type { Plugin } from 'vite';

const transformGAMVariables = (): Plugin => {
	if (process.env.REPLACE_GAM_VARS) {
		return {
			name: 'transform-gam-variables',
			apply: 'build',
			transform: (code, id) => {
				if (!id.endsWith('variables.gam.ts')) {
					return null;
				}
				// Example transformation: replace values of exports `gamVariables` with GAM variable names
				// { Title: 'Test Ad' } becomes { Title: '[%Title%]' }
				const transformedCode = code.replace(
					/export const gamVariables\s*=\s*{([\s\S]*?)};/,
					(_, vars: string) => {
						const transformedVars = vars.replace(
							/(\w+)\s*:\s*(['"`])(.*?)\2/g,
							(_, key: string) => {
								return `${key}: '[%${key}%]'`;
							},
						);
						return `export const gamVariables = {${transformedVars}};`;
					},
				);

				return { code: transformedCode, map: null };
			},
		};
	} else {
		return {
			name: 'transform-gam-variables',
			apply: 'build',
		};
	}
};

export { transformGAMVariables };
