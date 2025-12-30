import type { PageServerLoad } from './$types';
import { building } from '$app/environment';

type Tone = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle' | 'live';

export const config = {
	Tone: 'news' as Tone,
	TitleURL: '',
	Explainer: 'Sample Explainer Text',
	ViewAll: 'View all',
	IsProminent: 'false',
	Offer1Title: 'Offer 1 Title',
	Offer2Title: 'Offer 2 Title',
	Offer3Title: 'Offer 3 Title',
	Offer4Title: 'Offer 4 Title',
	Offer1Meta: 'Meta text 1',
	Offer2Meta: 'Meta text 2',
	Offer3Meta: 'Meta text 3',
	Offer4Meta: 'Meta text 4',
	Offer1LinkText: 'Learn more',
	Offer2LinkText: 'Learn more',
	Offer3LinkText: 'Learn more',
	Offer4LinkText: 'Learn more',
	Offer1Image: '',
	Offer2Image: '',
	Offer3Image: '',
	Offer4Image: '',
	Offer1URL: '',
	Offer2URL: '',
	Offer3URL: '',
	Offer4URL: '',
};

export const load = (() => {
	if (building) {
		return Object.fromEntries(
			Object.entries(config).map(([key]) => [key, '[%' + key + '%]']),
		);
	}

	return config;
}) satisfies PageServerLoad;
