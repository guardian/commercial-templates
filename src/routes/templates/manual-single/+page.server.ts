import type { PageServerLoad } from './$types';
import { building } from '$app/environment';

type Tone = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle' | 'travel';

export const config = {
	Tone: 'travel' as Tone,
	TitleURL: '',
	OfferURL: '',
	Explainer: 'Discover unique travel experiences',
	ViewAll: 'View all',
	OmnitureId: 'manual-single',
};

export const load = (() => {
	if (building) {
		return Object.fromEntries(
			Object.entries(config).map(([key]) => [key, '[%' + key + '%]']),
		);
	}

	return config;
}) satisfies PageServerLoad;
