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

export type Single = {
	articleHeadline: string;
	articleText: string;
	articleUrl: string;
	articleImage: {
		sources: Array<Source>;
		backupSrc: string;
	};
	audioTag: boolean;
	galleryTag: boolean;
	videoTag: boolean;
	branding: Branding;
};
