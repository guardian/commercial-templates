import type { GAMVariable } from './gam';
import type { CapiCardOverride, CapiHostedCard, Single } from './types/capi';

const apiEndpoint =
	'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-multiple.json';

function addCapiCardOverrides(
	cardData: Single[],
	overrideCards: CapiCardOverride[],
): Single[] {
	return cardData.map((capiCard, i) => {
		const headlineOverride = overrideCards[i]?.headline;
		const kickerOverride = overrideCards[i]?.kicker;

		if (headlineOverride && kickerOverride) {
			return {
				...capiCard,
				articleHeadline: headlineOverride,
				articleKicker: kickerOverride,
			};
		}

		return capiCard;
	});
}

function addCapiHostedCardOverrides(
	cardData: Single[],
	overrideCards: CapiCardOverride[],
	overrideLogo?: string,
): { logo: string | null; cards: CapiHostedCard[] } {
	const logo = overrideLogo ?? cardData[0]?.branding.logo.src;
	return {
		logo: logo ?? null,
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

export { retrieveCapiData, addCapiHostedCardOverrides, addCapiCardOverrides };
