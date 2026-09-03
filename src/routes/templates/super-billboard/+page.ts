import type { PageLoad } from './$types';
import { gamVariables } from './variables.gam';

export const prerender = true;

export const load = (() => {
	return gamVariables;
}) satisfies PageLoad;
