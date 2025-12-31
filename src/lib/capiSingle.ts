import type { CapiCardOverride, Single } from './types/capi';

const apiEndpoint =
	'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-single.json';

function addCapiCardOverrides(
	cardData: Single,
	overrides: CapiCardOverride,
): Single {
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
	seriesUrl: string,
	cardOverrides: CapiCardOverride,
): Promise<Single> {
	const request = new URL(apiEndpoint);
	request.searchParams.append('k', encodeURI(seriesUrl));
	if (cardOverrides.url) {
		request.searchParams.append('t', cardOverrides.url);
	}

	return fetch(request).then((response) => response.json() as Promise<Single>);
}

export { retrieveCapiData, addCapiCardOverrides };
