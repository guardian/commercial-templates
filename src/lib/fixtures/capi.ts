import type { Branding, Single } from '$lib/types/capi';

const fordFoundationBranding: Branding = {
	brandingType: { name: 'paid-content' },
	sponsorName: 'Ford Foundation',
	logo: {
		src: 'https://static.theguardian.com/commercial/sponsor/16/Nov/2021/32d19e8d-189c-40fd-8880-a5b17064d149-ford-logo-badge.png',
		dimensions: { width: 280, height: 34 },
		link: 'https://www.fordfoundation.org/',
		label: 'Paid for by',
	},
	edition: 'UK',
};

const guardianUniversitiesBranding: Branding = {
	brandingType: { name: 'paid-content' },
	sponsorName: 'The Guardian Universities',
	logo: {
		src: 'https://static.theguardian.com/commercial/sponsor/08/Jul/2021/7d48144c-63d9-4a42-a0a0-020d0aa5d172-The%20Guardian_Universities_Stacked_Black.png',
		dimensions: { width: 140, height: 90 },
		link: 'https://www.theguardian.com/education/universityguide',
		label: 'Paid for by',
	},
	edition: 'UK',
};

const weAreStillInBranding: Branding = {
	brandingType: { name: 'paid-content' },
	sponsorName: 'We Are Still In',
	logo: {
		src: 'https://static.theguardian.com/commercial/sponsor/16/Aug/2018/d5e82ba3-297d-473d-8362-c04f519e5fe1-WASI-logo-grey.png',
		dimensions: { width: 1250, height: 575 },
		link: 'https://www.wearestillin.com/',
		label: 'Paid for by',
	},
	edition: 'UK',
};

const article = (
	data: Omit<Single, 'articleImage' | 'articleKicker'> & {
		backupSrc: string;
		altText: string;
	},
): Single => {
	const { backupSrc, altText, ...articleData } = data;

	return {
		...articleData,
		articleKicker: '',
		articleImage: { sources: [], backupSrc, altText },
	};
};

export const capiSinglePaidForArticle = article({
	articleHeadline: 'More than 2 billion workers make up the informal economy',
	articleUrl:
		'https://www.theguardian.com/the-future-of-work--forging-an-inclusive-economy/ng-interactive/2021/nov/16/more-than-2-billion-workers-make-up-the-informal-economy',
	articleText:
		'The informal economy employs 6 out of every 10 workers in the world—and the economic recovery of these workers is a critical component of a global economic rebound from the Covid-19 crisis.',
	backupSrc:
		'https://i.guim.co.uk/img/media/58221c78e98948484ff20514c3cc8ee9fda19907/247_0_2500_1500/master/2500.jpg?width=300&quality=85&auto=format&fit=max&s=8036a767046c0010500ed75d13a8a48b',
	altText:
		'Collage of informal economy workers in black and white on colorful red, orange and yellow graphic background',
	audioTag: false,
	galleryTag: false,
	videoTag: false,
	branding: fordFoundationBranding,
});

export const capiMultiplePaidForArticles = [
	article({
		articleHeadline:
			'Why summer is the perfect time to bolster your CV – even if you can’t find a holiday job',
		articleUrl:
			'https://www.theguardian.com/guardian-clearing/2026/jul/06/how-to-boost-your-cv-without-a-summer-job',
		articleText:
			'With a little initiative and ingenuity you can find opportunities in your local area that will help you gain the skills that graduate employers love to see',
		backupSrc:
			'https://i.guim.co.uk/img/media/0909440c5ccf94d3577a53ac355c0a52c9f478e7/904_0_4713_3773/master/4713.jpg?width=300&quality=85&auto=format&fit=max&s=efd7c712f63d9c45e7ff9b505eda4d7f',
		altText:
			'Teenage Girl At Home In Kitchen Stroking Pet Golden Retriever Dog Lying On Floor',
		audioTag: false,
		galleryTag: false,
		videoTag: false,
		branding: guardianUniversitiesBranding,
	}),
	article({
		articleHeadline:
			'Vegan bolognese, naan pizza and chicken traybake: three nutritious meals that are perfect for students',
		articleUrl:
			'https://www.theguardian.com/guardian-clearing/2026/jul/06/student-recipes-vegan-bolognese-naan-pizza-and-chicken-traybake',
		articleText:
			'You don’t need the latest gadgets, fancy ingredients or a big budget to make delicious meals for you and your friends – but planning is key',
		backupSrc:
			'https://i.guim.co.uk/img/media/6e835b1a030ea0650a5876db3af6bc2c3f99cbed/507_0_4813_3850/master/4813.jpg?width=300&quality=85&auto=format&fit=max&s=e50674b87191068acd7b6339809a2691',
		altText: 'American hot pepperoni pizza\n Header GMS EXT DSC00488',
		audioTag: false,
		galleryTag: false,
		videoTag: false,
		branding: guardianUniversitiesBranding,
	}),
	article({
		articleHeadline:
			'How AI can supercharge your studies – but don’t cross any red lines',
		articleUrl:
			'https://www.theguardian.com/guardian-clearing/2026/jul/06/how-to-use-ai-for-studying-without-breaking-the-rules',
		articleText:
			'Prof Louise Hague, from the University of Reading, says that if students follow the guidelines they can get the most out of this gamechanging technology',
		backupSrc:
			'https://i.guim.co.uk/img/media/6977c423e1ccfd4b99bd23dd133ddb8f169f511e/605_152_4369_3496/master/4369.jpg?width=300&quality=85&auto=format&fit=max&s=6cc90a53ae15ecb53859abb1146a940a',
		altText: 'Student working with laptop and notebooks',
		audioTag: false,
		galleryTag: false,
		videoTag: false,
		branding: guardianUniversitiesBranding,
	}),
	article({
		articleHeadline:
			'A students’ guide to cracking the first year: ‘If someone invites you somewhere … go’',
		articleUrl:
			'https://www.theguardian.com/guardian-clearing/2026/jul/06/first-year-university-survival-guide-tips-for-new-students',
		articleText:
			'From coping with messy flatmates to balancing your budget, students share the tips they wish they’d known before starting university',
		backupSrc:
			'https://i.guim.co.uk/img/media/05bc20b3383e23ca283f8028306ccb14932c33a5/0_0_4750_3800/master/4750.jpg?width=300&quality=85&auto=format&fit=max&s=27d617e7b1372d868b82d8559146e9b1',
		altText:
			'Smiling young male student washing dishes while standing in kitchen with roommatesHeader GettyImages-2198064216',
		audioTag: false,
		galleryTag: false,
		videoTag: false,
		branding: guardianUniversitiesBranding,
	}),
] satisfies [Single, ...Single[]];

export const capiMultipleHostedArticles: Single[] = [
	article({
		articleHeadline: 'Faces of We Are Still In',
		articleUrl:
			'https://www.theguardian.com/advertiser-content/we-are-still-in/faces-of-we-are-still-in',
		articleText: 'A photo gallery',
		backupSrc:
			'https://i.guim.co.uk/img/media/3e10857a494a7765614b771e9f6d6ebfea41667b/0_79_802_481/master/802.jpg?width=300&quality=85&auto=format&fit=max&s=55bcd0409bff5a3fc7b18624fdc43fde',
		altText:
			'Crowd gathered at the We Are Still In Day Rally at the US Capitol in DC',
		audioTag: false,
		galleryTag: true,
		videoTag: false,
		branding: weAreStillInBranding,
	}),
	article({
		articleHeadline: 'The global groundswell',
		articleUrl:
			'https://www.theguardian.com/advertiser-content/we-are-still-in/the-global-groundswell',
		articleText: 'Local climate action goes global.',
		backupSrc:
			'https://i.guim.co.uk/img/media/668d69bce3a26f4b0f946fdae56ac1fc771fc34c/42_0_917_550/master/917.png?width=300&quality=85&auto=format&fit=max&s=71bca98ee5c4ef5ee0d2214973c31ed2',
		altText: 'Patchwork of flags from Japan, United States, and Mexico',
		audioTag: false,
		galleryTag: false,
		videoTag: false,
		branding: weAreStillInBranding,
	}),
	article({
		articleHeadline:
			"A call for stronger climate leadership from We Are Still In's circle of American leaders",
		articleUrl:
			'https://www.theguardian.com/advertiser-content/we-are-still-in/a-call-for-stronger-climate-leadership-from-we-are-still-ins-circle-of-american-leaders',
		articleText: 'To those who can make a change on climate change,',
		backupSrc:
			'https://i.guim.co.uk/img/media/7539fd056ddcbf1bd24ce44c55d375157e859bae/0_289_2000_1200/master/2000.jpg?width=300&quality=85&auto=format&fit=max&s=4a0b32d6a6de8a16037069aa43634fbe',
		altText:
			'Great Barrier Reef. Aerial photo in September 2017 of a portion of the Great Barrier Reef off the coast of Cairns, Queensland, Australia. Parts of the reef have been subjected to a bleaching event which can damage the coral. Above-average sea water temperatures caused by global warming have been identified as a leading cause for coral bleaching worldwide. Between 2014 and 2016, the longest global bleaching events ever were recorded. In 2016, bleaching of coral on the Great Barrier Reef killed between 29 and 50 percent of the reef’s coral.',
		audioTag: false,
		galleryTag: false,
		videoTag: false,
		branding: weAreStillInBranding,
	}),
	article({
		articleHeadline:
			'Americans will not retreat from the Paris Climate Agreement',
		articleUrl:
			'https://www.theguardian.com/advertiser-content/we-are-still-in/americans-will-not-retreat-from-the-paris-climate-agreement',
		articleText:
			'Since its launch on June 5, 2017 We Are Still In has nearly tripled in size. ',
		backupSrc:
			'https://i.guim.co.uk/img/media/27b54ab797d3388a77abcb5dd2159ab4b71e8211/0_166_5020_3014/master/5020.jpg?width=300&quality=85&auto=format&fit=max&s=33eef2dd31d91d3c65b09827f65555cd',
		altText: 'Smog over Los Angeles, California',
		audioTag: false,
		galleryTag: false,
		videoTag: false,
		branding: weAreStillInBranding,
	}),
];
