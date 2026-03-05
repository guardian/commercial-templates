import type {
	CapiCardOverride,
	CapiRequestType,
	CapiResponse,
	Single,
} from './types/capi';

const apiEndpoint = 'https://api.nextgen.guardianapps.co.uk/commercial/api';

async function retrieveCapiData<T extends CapiRequestType>(
	type: T,
	seriesUrl: string,
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

		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- we want to override empty strings too
		articleHeadline: overrideCards[i]?.headline || capiCard.articleHeadline,
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- we want to override empty strings too
		articleKicker: overrideCards[i]?.kicker || capiCard.articleKicker,
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- we want to override empty strings too
		articleText: overrideCards[i]?.text || capiCard.articleText,
		articleImage: overrideCards[i]?.image
			? { sources: [], backupSrc: overrideCards[i]?.image ?? '' }
			: capiCard.articleImage,
	}));
}

export { addCapiCardOverrides, retrieveCapiData };
