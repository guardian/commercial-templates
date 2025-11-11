import type { GAMVariable } from './gam';
import type { CapiCard, CapiCardOverride } from './types/capi';

const apiEndpoint =
	'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-single.json';

function addCapiCardOverrides(
	cardData: CapiCard,
	overrides: CapiCardOverride,
): CapiCard {
	return {
		...cardData,
		...(overrides.headline ? { articleHeadline: overrides.headline } : {}),
		...(overrides.text ? { articleText: overrides.text } : {}),
		...(overrides.image
			? { articleImage: { sources: [], backupSrc: overrides.image } }
			: {}),
	};
}

async function retrieveCapiData(
	seriesUrl: GAMVariable,
	cardOverrides: CapiCardOverride,
): Promise<CapiCard> {
	const request = new URL(apiEndpoint);
	request.searchParams.append('k', encodeURI(seriesUrl));
	if (cardOverrides.url) {
		request.searchParams.append('t', cardOverrides.url);
	}

	return fetch(request).then(
		(response) => response.json() as Promise<CapiCard>,
	);
}

export { retrieveCapiData, addCapiCardOverrides };
