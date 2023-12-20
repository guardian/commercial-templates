import type { GAMVariable } from '$lib/gam';

export type Source = {
	minWidth: string;
	sizes: string;
	hidpiSrcset: string;
	lodpiSrcset: string;
};

/**
 * Best effort Scala conversion from [Branding.scala](https://github.com/guardian/commercial-shared/blob/a692e8b2eba6e79eeeb666e5594f2193663f6514/src/main/scala/com/gu/commercial/branding/Branding.scala#L7-L22)
 */
export type Branding = {
	brandingType: {
		name: string;
	};
	sponsorName: string;
	logo: {
		src: string;
		dimensions: {
			width: number;
			height: number;
		};
		link: string;
		label: string;
	};
	edition: 'UK' | 'AU' | 'US';
};

/**
 * Best effort at interpreting Scala types.
 *
 * [Source in `frontend`](https://github.com/guardian/frontend/blob/9d2ee56372de4bb730146100527f83b2efd41c35/commercial/app/model/capi/CapiSingle.scala#L9-L19)
 *
 * [route conf](https://github.com/guardian/frontend/blob/9d2ee56372de4bb730146100527f83b2efd41c35/commercial/conf/routes#L30)
 */
export type Single = {
	articleHeadline: string;
	articleText: string;
	articleUrl: string;
	articleImage: {
		sources: Source[];
		backupSrc: string;
	};
	audioTag: boolean;
	galleryTag: boolean;
	videoTag: boolean;
	branding: Branding;
};

export type CapiCardOverride = {
	headline: GAMVariable;
	image: GAMVariable;
	url: GAMVariable;
	kicker: GAMVariable;
};
