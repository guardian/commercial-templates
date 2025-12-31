import { transformGamVariables } from '$lib/transform-gam-variables';
import type { PageServerLoad } from './$types';

export const gamVariables = {
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
	return transformGamVariables(gamVariables);
}) satisfies PageServerLoad;
