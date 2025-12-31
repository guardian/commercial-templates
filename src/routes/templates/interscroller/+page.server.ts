import { transformGamVariables } from '$lib/transform-gam-variables';
import type { PageServerLoad } from './$types';

export const gamVariables = {
	thirdPartyJSTracking: '',
	TrackingPixel: '',
	ViewabilityTracker: '',
	ResearchPixel: '',
};

export const load = (() => {
	return transformGamVariables(gamVariables);
}) satisfies PageServerLoad;
