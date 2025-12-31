import { building } from '$app/environment';
import { REPLACE_GAM_VARS } from '$env/static/private';

export const gamVariables = (config: Record<string, string>) => {
	if (building && REPLACE_GAM_VARS) {
		return Object.fromEntries(
			Object.entries(config).map(([key]) => [key, '[%' + key + '%]']),
		);
	}
	return config;
};
