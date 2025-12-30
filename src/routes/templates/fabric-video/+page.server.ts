import type { PageServerLoad } from './$types';
import { building } from '$app/environment';

export const config = {
	Trackingpixel: '',
	Researchpixel: '',
	Viewabilitypixel: '',
	BackgroundColour: 'transparent',
	BackgroundImage: '',
	BackgroundPosition: 'center center',
	BackgroundRepeat: 'no-repeat',
	Layer1BackgroundImage: '',
	Layer1BackgroundPosition: 'center center',
	Layer2BackgroundImage: '',
	Layer2BackgroundPosition: 'center center',
	Layer3BackgroundImage: '',
	Layer3BackgroundPosition: 'center center',
	MobileBackgroundImage: '',
	MobileBackgroundPosition: 'center center',
	MobileBackgroundRepeat: 'no-repeat',
	MobileLayer1BackgroundImage: '',
	MobileLayer1BackgroundPosition: 'center center',
	MobileLayer2BackgroundImage: '',
	MobileLayer2BackgroundPosition: 'center center',
	MobileLayer3BackgroundImage: '',
	MobileLayer3BackgroundPosition: 'center center',
	VideoURL: '',
	VideoBackupImage: '',
	MobileVideoBackupImage: '',
	VideoURLMobile: '',
	VideoAlignment: 'center',
	IsFullWidthTopSlot: 'no' as 'yes' | 'no',
};

export const load = (() => {
	if (building) {
		return Object.fromEntries(
			Object.entries(config).map(([key]) => [key, '[%' + key + '%]']),
		);
	}

	return config;
}) satisfies PageServerLoad;
