import type { GAMVariable } from './gam';
import type { CapiCard, CapiCardOverride, CapiHostedCard } from './types/capi';

const apiEndpoint =
	'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-multiple.json';

function addCapiCardOverrides(
	cardData: CapiCard[],
	overrideCards: CapiCardOverride[],
): CapiCard[] {
	return cardData.map((capiCard, i) => ({
		...capiCard,
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- nullish coalescing operator doesn't handle empty strings
		articleHeadline: overrideCards[i]?.headline || capiCard.articleHeadline,
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- nullish coalescing operator doesn't handle empty strings
		articleKicker: overrideCards[i]?.kicker || capiCard.articleKicker,
	}));
}

function decideLogo(cardLogo?: string, overrideLogo?: string): string | null {
	if (overrideLogo) {
		return overrideLogo;
	} else {
		return cardLogo ?? null;
	}
}

function addCapiHostedCardOverrides(
	cardData: CapiCard[],
	overrideCards: CapiCardOverride[],
	overrideLogo?: string,
): { logo: string | null; cards: CapiHostedCard[] } {
	const logo = decideLogo(cardData[0]?.branding.logo.src, overrideLogo);
	return {
		logo,
		cards: cardData
			.map((capiCard, i) => {
				const headlineOverride = overrideCards[i]?.headline ?? '';
				const imageOverride = overrideCards[i]?.image ?? '';

				return {
					...capiCard,
					headline: headlineOverride || capiCard.articleHeadline,
					image: imageOverride
						? { sources: [], backupSrc: overrideCards[i]?.image ?? '' }
						: cardData[i]?.articleImage,
					url: capiCard.articleUrl,
				};
			})
			// A card should only be displayed if and only if a headline is available
			.filter((card) => card.headline !== ''),
	};
}

interface CapiMultipleResponse {
	articles: CapiCard[];
}

async function retrieveCapiData(
	seriesUrl: GAMVariable,
	cardOverrides: CapiCardOverride[],
): Promise<CapiMultipleResponse> {
	const request = new URL(apiEndpoint);
	request.searchParams.append('k', encodeURI(seriesUrl));
	cardOverrides.forEach(({ url }) => {
		if (url) {
			request.searchParams.append('t', url);
		}
	});

	return fetch(request).then(
		(response) => response.json() as Promise<CapiMultipleResponse>,
	);
}

export { retrieveCapiData, addCapiHostedCardOverrides, addCapiCardOverrides };
