import type { PageServerLoad } from './$types';
import { building } from '$app/environment';

type Config = Record<string, string> & {
	Trackingpixel: string;
	Researchpixel: string;
	Viewabilitypixel: string;
	BackgroundScrollType: 'parallax' | 'none' | 'fixed';
	BackgroundColour: string;
	BackgroundImage: string;
	BackgroundImagePosition: string;
	BackgroundImageRepeat: string;
	Layer1BackgroundImage: string;
	Layer1BackgroundPosition: string;
	Layer2BackgroundImage: string;
	Layer2BackgroundPosition: string;
	Layer3BackgroundImage: string;
	Layer3BackgroundPosition: string;
	MobileBackgroundImage: string;
	MobileBackgroundImagePosition: string;
	MobileBackgroundImageRepeat: string;
	MobileLayer1BackgroundImage: string;
	MobileLayer1BackgroundPosition: string;
	MobileLayer2BackgroundImage: string;
	MobileLayer2BackgroundPosition: string;
	MobileLayer3BackgroundImage: string;
	MobileLayer3BackgroundPosition: string;
};

export const config: Config = {
	Trackingpixel: '',
	Researchpixel: '',
	Viewabilitypixel: '',
	thirdPartyJSTracking:
		"<SCRIPT TYPE='application/javascript' SRC='https://pixel.adsafeprotected.com/rjss/st/726370/54949606/skeleton.js'></SCRIPT> <NOSCRIPT><IMG SRC='https://pixel.adsafeprotected.com/rfw/st/726370/54949605/skeleton.gif?gdpr=${GDPR}&gdpr_consent=${GDPR_CONSENT_278}&gdpr_pd=${GDPR_PD}' BORDER=0 WIDTH=1 HEIGHT=1 ALT=''></NOSCRIPT>",
	BackgroundScrollType: 'none',
	BackgroundColour: 'transparent',
	BackgroundImage: '',
	BackgroundImagePosition: 'center center',
	BackgroundImageRepeat: 'no-repeat',
	Layer1BackgroundImage:
		'https://tpc.googlesyndication.com/simgad/4236174091030258227',
	Layer1BackgroundPosition: 'center center',
	Layer2BackgroundImage:
		'https://tpc.googlesyndication.com/simgad/2695461227376319820',
	Layer2BackgroundPosition: 'right top',
	Layer3BackgroundImage:
		'https://tpc.googlesyndication.com/simgad/1795279117852043234',
	Layer3BackgroundPosition: 'left top',
	MobileBackgroundImage: '',
	MobileBackgroundImagePosition: 'center center',
	MobileBackgroundImageRepeat: 'no-repeat',
	MobileLayer1BackgroundImage:
		'https://tpc.googlesyndication.com/simgad/836090238410598281',
	MobileLayer1BackgroundPosition: 'center center',
	MobileLayer2BackgroundImage:
		'https://tpc.googlesyndication.com/simgad/14002881522005975546',
	MobileLayer2BackgroundPosition: 'left top',
	MobileLayer3BackgroundImage:
		'https://tpc.googlesyndication.com/simgad/7459013320672839574',
	MobileLayer3BackgroundPosition: 'right top',
};

export const load = (() => {
	if (building) {
		return Object.fromEntries(
			Object.entries(config).map(([key]) => [key, '[%' + key + '%]']),
		) as Config;
	}

	return config;
}) satisfies PageServerLoad;
