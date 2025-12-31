import { transformGamVariables } from '$lib/transform-gam-variables';
import type { PageServerLoad } from './$types';
import { gamVariables } from './variables';

export const load = (() => {
	return transformGamVariables(gamVariables);
}) satisfies PageServerLoad;
