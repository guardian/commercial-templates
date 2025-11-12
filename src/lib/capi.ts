import type { GAMVariable } from './gam';
import type {
	CapiCardOverride,
	CapiRequestType,
	CapiResponse,
	Single,
} from './types/capi';

const apiEndpoint = 'https://api.nextgen.guardianapps.co.uk/commercial/api';

async function retrieveCapiData<T extends CapiRequestType>(
	type: T,
	seriesUrl: GAMVariable,
): Promise<CapiResponse<T>> {
	const request = new URL(`${apiEndpoint}/capi-${type}.json`);
	request.searchParams.append('k', encodeURI(seriesUrl));
	return fetch(request).then(
		(resp) => resp.json() as unknown as CapiResponse<T>,
	);
}

function addCapiCardOverrides(
	cardData: Single[],
	overrideCards: CapiCardOverride[],
): Single[] {
	return cardData.map((capiCard, i) => ({
		...capiCard,
		/* eslint-disable @typescript-eslint/prefer-nullish-coalescing -- nullish coalescing operator doesn't handle empty strings */
		articleHeadline: overrideCards[i]?.headline || capiCard.articleHeadline,
		articleKicker: overrideCards[i]?.kicker || capiCard.articleKicker,
		articleText: overrideCards[i]?.text || capiCard.articleText,
		articleImage: overrideCards[i]?.image
			? { sources: [], backupSrc: overrideCards[i]?.image ?? '' }
			: capiCard.articleImage,
		/* eslint-enable @typescript-eslint/prefer-nullish-coalescing -- nullish coalescing operator doesn't handle empty strings */
	}));
}

export { addCapiCardOverrides, retrieveCapiData };
