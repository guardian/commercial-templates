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

const isGppOptedOut = (gppData: GPPData) =>
	gppData.parsedSections.usnat?.SaleOptOut === 1;

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
