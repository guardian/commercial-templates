import { generateId, timeout } from './messenger';

interface ConsentState {
	dateCreated: string;
	gpcEnabled: boolean;
	newUser: boolean;
	uspString: string;
}

interface CmpReturn {
	__cmpReturn: {
		returnValue: ConsentState;
		callId: string;
		success: boolean;
	};
}

const isReplyFromCMP = (json: unknown): json is CmpReturn => {
	const reply = json as CmpReturn;
	return '__cmpReturn' in reply && typeof reply.__cmpReturn === 'object';
};

const decodeReply = (e: MessageEvent<string>): CmpReturn | void => {
	try {
		const json: unknown = JSON.parse(e.data);

		if (isReplyFromCMP(json)) {
			return json;
		}

		return;
	} catch (_) {
		return;
	}
};

const getUSPData = async (): Promise<ConsentState> =>
	timeout(
		new Promise((resolve) => {
			const callId = generateId();
			const message = {
				__cmpCall: {
					command: 'getUSPData',
					version: 1,
					callId,
				},
			};

			const listener = (e: MessageEvent<string>) => {
				const decoded = decodeReply(e);
				console.info('decoded getUSPData', decoded);
				if (decoded && decoded.__cmpReturn.callId === callId) {
					resolve(decoded.__cmpReturn.returnValue);
					window.removeEventListener('message', listener);
				}
			};

			window.addEventListener('message', listener);

			console.info('sending getUSPData');

			window.top?.postMessage(JSON.stringify(message), '*');
		}),
		3000,
	);

export { getUSPData };
