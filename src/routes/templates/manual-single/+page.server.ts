import { transformGamVariables } from '$lib/transform-gam-variables';
import type { PageServerLoad } from './$types';

type Tone = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle' | 'travel';

export const gamVariables = {
	Tone: 'travel' as Tone,
	TitleURL: '',
	OfferURL: '',
	Explainer: 'Discover unique travel experiences',
	ViewAll: 'View all',
	OmnitureId: 'manual-single',
};

export const load = (() => {
	return transformGamVariables(gamVariables);
}) satisfies PageServerLoad;
