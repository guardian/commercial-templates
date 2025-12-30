import type { PageServerLoad } from './$types';
import { building } from '$app/environment';

export const config = {
	SeriesURL: 'guardian-clearing',
	BrandLogo: '',
	BrandColour: '#E1A100',
	TrackingId: '',
	Article1Headline: '',
	Article1Image: '',
	Article1URL: '',
	Article2Headline: '',
	Article2Image: '',
	Article2URL: '',
	Article3Headline: '',
	Article3Image: '',
	Article3URL: '',
	Article4Headline: '',
	Article4Image: '',
	Article4URL: '',
	numberOfElements: '4',
};

export const load = (() => {
	if (building) {
		return Object.fromEntries(
			Object.entries(config).map(([key]) => [key, '[%' + key + '%]']),
		);
	}

	return config;
}) satisfies PageServerLoad;
