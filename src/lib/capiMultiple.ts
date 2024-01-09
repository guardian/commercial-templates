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
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- headline should always be defined
			cardData[i]!.articleHeadline = overrideCards[i]?.headline as string;
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we define the kicker here - it's an optional parameter
			cardData[i]!.kicker = overrideCards[i]?.kicker as string;
		}
	}

	return cardData;
}

function retrieveCapiData(cards: CapiCardOverride[], seriesUrl: GAMVariable) {
	let request = `${apiEndpoint}?k=${encodeURI(seriesUrl)}`;
	cards.forEach((card) => {
		if (card.url) {
			request += `&t=${encodeURI(card.url)}`;
		}
	});
	return fetch(request).then((response) => response.json());
}

export { retrieveCapiData, addHeadlineKicker };
