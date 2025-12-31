import { transformGamVariables } from '$lib/transform-gam-variables';
import type { PageServerLoad } from './$types';

export const gamVariables = {};

export const load = (() => {
	return transformGamVariables(gamVariables);
}) satisfies PageServerLoad;
