import type { PageServerLoad } from './$types';
import { building } from '$app/environment';

export const config = {
	thirdPartyJSTracking: '',
	TrackingPixel: '',
	ViewabilityTracker: '',
	ResearchPixel: '',
};

export const load = (() => {
	if (building) {
		return Object.fromEntries(
			Object.entries(config).map(([key]) => [key, '[%' + key + '%]']),
		);
	}

	return config;
}) satisfies PageServerLoad;
