import { transformGamVariables } from '$lib/transform-gam-variables';
import type { PageServerLoad } from './$types';

export const gamVariables = {
	BannerDescription: 'Join Guardian Live for exclusive cultural events',
	HeaderButtonText: 'See all events',
	HeaderButtonUrl: 'https://membership.theguardian.com/events',
	EventTitle1: 'Bold text: Regular text',
	EventTitle2: 'Bold text: Regular text',
	EventTitle3: 'Bold text: Regular text',
	EventTitle4: 'Bold text: Regular text',
	EventDateTime1: '7:30pm to 9:00pm, Thursday 1st January 2024',
	EventDateTime2: '7:30pm to 9:00pm, Thursday 1st January 2024',
	EventDateTime3: '7:30pm to 9:00pm, Thursday 1st January 2024',
	EventDateTime4: '7:30pm to 9:00pm, Thursday 1st January 2024',
	EventImage1: '',
	EventImage2: '',
	EventImage3: '',
	EventImage4: '',
	EventUrl1: '',
	EventUrl2: '',
	EventUrl3: '',
	EventUrl4: '',
};

export const load = (() => {
	return transformGamVariables(gamVariables);
}) satisfies PageServerLoad;
