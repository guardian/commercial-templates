import type { ScrollType } from '$lib/types/background';

export const gamVariables = {
	TrackingPixel: '',
	ResearchPixel: '',
	ViewabilityPixel: '',
	thirdPartyJSTracking:
		"<SCRIPT TYPE='application/javascript' SRC='https://pixel.adsafeprotected.com/rjss/st/726370/54949606/skeleton.js'></SCRIPT> <NOSCRIPT><IMG SRC='https://pixel.adsafeprotected.com/rfw/st/726370/54949605/skeleton.gif?gdpr=${GDPR}&gdpr_consent=${GDPR_CONSENT_278}&gdpr_pd=${GDPR_PD}' BORDER=0 WIDTH=1 HEIGHT=1 ALT=''></NOSCRIPT>",
	BackgroundScrollType: 'none' as ScrollType,
	BackgroundColour: 'transparent',
	BackgroundImage: '',
	BackgroundImagePosition: 'center center',
	BackgroundImageRepeat: 'no-repeat',
	Layer1BackgroundImage:
		'https://tpc.googlesyndication.com/simgad/13007098383699728101',
	Layer1BackgroundPosition: 'left center',
	Layer2BackgroundImage:
		'https://tpc.googlesyndication.com/simgad/10345270359807415857',
	Layer2BackgroundPosition: 'left center',
	Layer3BackgroundImage:
		'https://tpc.googlesyndication.com/simgad/4103002460035353348',
	Layer3BackgroundPosition: 'right center',
	MobileBackgroundImage: '',
	MobileBackgroundImagePosition: 'center center',
	MobileBackgroundImageRepeat: 'no-repeat',
	MobileLayer1BackgroundImage:
		'https://pagead2.googlesyndication.com/simgad/17831817542221842548',
	MobileLayer1BackgroundPosition: 'left center',
	MobileLayer2BackgroundImage:
		'https://tpc.googlesyndication.com/simgad/17902384313816297650',
	MobileLayer2BackgroundPosition: 'right center',
	MobileLayer3BackgroundImage:
		'https://tpc.googlesyndication.com/simgad/12866258743989584254',
	MobileLayer3BackgroundPosition: 'left center',
};
