import type { PageServerLoad } from './$types';
import { building } from '$app/environment';

interface Props {
	DapAssetsFolder: string;
	TrackingPixel: string;
	ResearchPixel: string;
	ViewabilityTracker: string;
	thirdPartyJSTracking: string;
}
export const config: Props = {
	DapAssetsFolder: 'GooglePixel2',
	TrackingPixel: '',
	ResearchPixel: '',
	ViewabilityTracker: '<img src="">',
	thirdPartyJSTracking:
		"<SCRIPT TYPE='application/javascript' SRC='https://pixel.adsafeprotected.com/rjss/st/726370/54949606/skeleton.js'></SCRIPT> <NOSCRIPT><IMG SRC='https://pixel.adsafeprotected.com/rfw/st/726370/54949605/skeleton.gif?gdpr=${GDPR}&gdpr_consent=${GDPR_CONSENT_278}&gdpr_pd=${GDPR_PD}' BORDER=0 WIDTH=1 HEIGHT=1 ALT=''></NOSCRIPT>",
};

export const load = (() => {
	if (building) {
		return Object.fromEntries(
			Object.entries(config).map(([key]) => [key, '[%' + key + '%]']),
		) as unknown as Props;
	}

	return config;
}) satisfies PageServerLoad;
