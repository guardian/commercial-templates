import { generateId } from './messenger';

interface ReturnVal {
	dateCreated: string;
	gpcEnabled: boolean;
	newUser: boolean;
	uspString: string;
}

interface CmpReturn {
	__cmpReturn: {
		returnValue: ReturnVal;
		callId: string;
		success: boolean;
	};
}

const replyIsSuccess = (json: unknown): json is CmpReturn => {
	const reply = json as CmpReturn;
	return '__cmpReturn' in reply && typeof reply.__cmpReturn === 'object';
};

const decodeReply = (e: MessageEvent<string>): CmpReturn | void => {
	try {
		const json: unknown = JSON.parse(e.data);

		if (replyIsSuccess(json)) {
			return json;
		}

		console.error('Failed to decode reply from getUSPData', json);
		return;
	} catch (_) {
		return;
	}
};

const getUSPData = async (version: number): Promise<ReturnVal> =>
	new Promise((resolve) => {
		const callId = generateId();
		const message = {
			__cmpCall: {
				command: 'getUSPData',
				version,
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

		window.top?.postMessage(JSON.stringify(message), '*');
	});

export { getUSPData };
