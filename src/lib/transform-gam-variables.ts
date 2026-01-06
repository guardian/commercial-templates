import { building } from '$app/environment';
import { REPLACE_GAM_VARS } from '$env/static/private';

export const transformGamVariables = <T extends Record<string, string>>(
	vars: T,
): T => {
	if (building && REPLACE_GAM_VARS) {
		return Object.fromEntries(
			Object.entries(vars).map(([key]) => [key, '[%' + key + '%]']),
		) as T;
	}
	return vars;
};
