import { transformGamVariables } from '$lib/transform-gam-variables';
import type { PageServerLoad } from './$types';

export const gamVariables = {
	TrackingPixel: '',
	ResearchPixel: '',
	ViewabilityPixel: '',
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
};

export const load = (() => {
	return transformGamVariables(gamVariables);
}) satisfies PageServerLoad;
