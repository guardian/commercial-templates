/** @file This file is a version of ./messenger.ts specifically for fetching consent for Public Good ads */
import { generateId, timeout } from './messenger';

// GPP types and interfaces copied from @guardian/libs
type GPPSignalStatus = 'not ready' | 'ready';
type GppParsedSections = Record<
	string,
	{
		Version: number;
		SaleOptOut: number;
		Gpc: boolean;
	}
>;
interface GPPData {
	gppVersion: number;
	gppString: string;
	applicableSections: number[];
	supportedAPIs: string[];
	parsedSections: GppParsedSections;
	signalStatus: GPPSignalStatus;
	gpcEnabled: boolean;
}
interface GppReturn {
	__gppReturn: {
		returnValue: GPPData;
		callId: string;
		success: boolean;
	};
}

const isReplyFromGPP = (json: unknown): json is GppReturn => {
	const reply = json as GppReturn;
	return '__gppReturn' in reply && typeof reply.__gppReturn === 'object';
};

const decodeReply = (e: MessageEvent<string>): GppReturn | void => {
	try {
		const json: unknown = JSON.parse(e.data);
		if (isReplyFromGPP(json)) {
			return json;
		}
	} catch (err) {
		// Do nothing
	}
};

/**
 * Checks if the user has opted out of consent ie "do not sell" in the GPP data
 * Example of "do not sell" GPP response data: @see https://github.com/guardian/csnx/blob/3af1d83d53473ea098246bb83075d4b4a99634ce/libs/%40guardian/libs/src/consent-management-platform/usnat/__fixtures__/api.getGPPData.doNotSell.json
 */
const isGppOptedOut = (gppData: GPPData) => {
	// If the user has opted "do not sell" for any of the supported apis, mark them as opted out
	return Object.values(gppData.parsedSections).some(
		(sectionData) => sectionData.SaleOptOut === 1,
	);
};

/**
 * Sets up event listener and posts message from the iframe this ad is running in to the top frame.
 * Uses the GPP framework to determine consent status.
 * @see https://github.com/guardian/csnx/blob/3af1d83d53473ea098246bb83075d4b4a99634ce/libs/%40guardian/libs/src/consent-management-platform/stub_gpp_usnat.js#L129-L154
 */
const getGPPData = async (): Promise<GPPData | void> =>
	timeout(
		new Promise((resolve) => {
			const callId = generateId();
			const message = {
				__gppCall: {
					command: 'ping',
					version: 1,
					callId,
				},
			};

			const listener = (e: MessageEvent<string>) => {
				const decoded = decodeReply(e);
				if (decoded && decoded.__gppReturn.callId === callId) {
					resolve(decoded.__gppReturn.returnValue);
					window.removeEventListener('message', listener);
				}
			};
			window.addEventListener('message', listener);

			window.top?.postMessage(JSON.stringify(message), '*');
		}),
		3000,
	);

export { getGPPData, isGppOptedOut };
