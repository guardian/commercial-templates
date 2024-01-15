import type { GAMVariable } from './gam';
import type { CapiCardOverride, Single } from './types/capi';

const apiEndpoint =
	'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-multiple.json';

function addHeadlineKicker(
	overrideCards: CapiCardOverride[],
	cardData: Single[],
) {
	for (let i = 0; i < overrideCards.length; i++) {
		if (overrideCards[i]?.kicker && overrideCards[i]?.headline) {
			cardData[i]!.articleHeadline = overrideCards[i]?.headline;

			cardData[i]!.kicker = overrideCards[i]?.kicker;
		}
	}

	return cardData;
}

function retrieveCapiData(
	cards: CapiCardOverride[],
	seriesUrl: GAMVariable,
): Promise<{ articles: Single[] }> {
	let request = `${apiEndpoint}?k=${encodeURI(seriesUrl)}`;
	cards.forEach((card) => {
		if (card.url) {
			request += `&t=${encodeURI(card.url)}`;
		}
	});
	return fetch(request).then((response) => response.json()) as Promise<{
		articles: Single[];
	}>;
}

export { retrieveCapiData, addHeadlineKicker };
