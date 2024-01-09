import type { GAMVariable } from './gam';
import type { CapiCard, CapiCardOverride, Single } from './types/capi';

const apiEndpoint =
	'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-multiple.json';

function addHeadlineKicker(
	overrideCards: CapiCardOverride[],
	cardData: Single[],
) {
	for (let i = 0; i < overrideCards.length; i++) {
		if (overrideCards[i]?.kicker && overrideCards[i]?.headline) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- headline should always be defined
			cardData[i]!.articleHeadline = overrideCards[i]?.headline as string;
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we define the kicker here - it's an optional parameter
			cardData[i]!.articleKicker = overrideCards[i]?.kicker as string;
		}
	}

	return cardData;
}

function addOverridesToCardData(
	cardData: Single[],
	overrideCards: CapiCardOverride[],
	overrideLogo: string,
): { logo: string | null; cards: CapiCard[] } {
	return {
		logo: (overrideLogo || cardData[0]?.branding.logo.src) ?? null,
		cards: cardData
			.map((capiCard, i) => ({
				...cardData,
				headline: overrideCards[i]?.headline ?? capiCard.articleHeadline,
				url: overrideCards[i]?.url ?? capiCard.articleUrl,
				image: overrideCards[i]?.image
					? { sources: [], backupSrc: overrideCards[i]?.image ?? '' }
					: cardData[i]?.articleImage,
				audioTag: capiCard.audioTag,
				galleryTag: capiCard.galleryTag,
				videoTag: capiCard.videoTag,
			}))
			// A card will be displayed if and only if a headline is available
			.filter((card) => card.headline !== ''),
	};
}

async function retrieveCapiData(
	seriesUrl: GAMVariable,
	cardOverrides: CapiCardOverride[],
) {
	const request = new URL(apiEndpoint);
	request.searchParams.append('k', encodeURI(seriesUrl));
	cardOverrides.forEach(({ url }) => {
		if (url) {
			request.searchParams.append('t', url);
		}
	});

	return fetch(request).then((response) => response.json());
}

export { retrieveCapiData, addOverridesToCardData, addHeadlineKicker };
