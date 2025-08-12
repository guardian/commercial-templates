import type { GAMVariable } from './gam';
import type { CapiCardOverride, CapiHostedCard, Single } from './types/capi';

const apiEndpoint =
	'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-multiple.json';

function addCapiCardOverrides(
	cardData: Single[],
	overrideCards: CapiCardOverride[],
): Single[] {
	return cardData.map((capiCard, i) => {
		const { headline, kicker, image, text, url } = overrideCards[i] ?? {};
		return {
			...capiCard,
			...(headline ? { articleHeadline: headline } : {}),
			...(kicker ? { articleKicker: kicker } : {}),
			...(text ? { articleText: text } : {}),
			...(url ? { articleUrl: url } : {}),
			...(image ? { articleImage: { sources: [], backupSrc: image } } : {}),
		};
	});
}

function decideLogo(cardLogo?: string, overrideLogo?: string): string | null {
	if (overrideLogo) {
		return overrideLogo;
	} else {
		return cardLogo ?? null;
	}
}

function addCapiHostedCardOverrides(
	cardData: Single[],
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
	articles: Single[];
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
