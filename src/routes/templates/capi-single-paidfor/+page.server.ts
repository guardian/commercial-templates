import { transformGamVariables } from '$lib/transform-gam-variables';
import type { PageServerLoad } from './$types';

export const gamVariables = {
	SeriesUrl: 'guardian-clearing',
	ComponentTitle: 'The Guardian Hub',
	ArticleHeadline: '',
	ArticleText: '',
	ArticleImage: '',
	TrackingPixel: '',
};

export const load = (() => {
	return transformGamVariables(gamVariables);
}) satisfies PageServerLoad;
