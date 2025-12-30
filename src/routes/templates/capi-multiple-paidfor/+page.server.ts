import type { PageServerLoad } from './$types';
import { building } from '$app/environment';

export const config = {
	SeriesURL: 'guardian-clearing',
	ComponentTitle: 'The Guardian Hub',
	Article1Headline: '',
	Article1Image: '',
	Article1Kicker: 'Kicker 1',
	Article2Headline: '',
	Article2Image: '',
	Article2Kicker: 'Kicker 2',
	Article3Headline: '',
	Article3Image: '',
	Article3Kicker: 'Kicker 3',
	Article4Headline: '',
	Article4Image: '',
	Article4Kicker: 'Kicker 4',
	TrackingPixel: '',
};

export const load = (() => {
	if (building) {
		return Object.fromEntries(
			Object.entries(config).map(([key]) => [key, '[%' + key + '%]']),
		);
	}

	return config;
}) satisfies PageServerLoad;
