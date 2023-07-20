import { generateId } from './messenger';

interface UspapReturn {
	__uspapiReturn: {
		returnValue: string;
		callId: string;
		success: boolean;
	};
}

const replyIsSuccess = (json: unknown): json is UspapReturn => {
	const reply = json as UspapReturn;
	return '__uspapiReturn' in reply && typeof reply.__uspapiReturn === 'object';
};

const decodeReply = (e: MessageEvent<string>): UspapReturn | void => {
	try {
		const json: unknown = JSON.parse(e.data);

		if (replyIsSuccess(json)) {
			return json;
		}

		return;
	} catch (_) {
		return;
	}
};

const getUSPData = async (version: string) =>
	new Promise((resolve) => {
		const callId = generateId();
		const message = {
			command: 'getUSPData',
			version,
			callId,
		};

		const listener = (e: MessageEvent<string>) => {
			const decoded = decodeReply(e);

			if (decoded && decoded.__uspapiReturn.callId === callId) {
				resolve(decoded.__uspapiReturn.returnValue);
				window.removeEventListener('message', listener);
			}
		};

		window.addEventListener('message', listener);

		window.top?.postMessage(
			JSON.stringify({ type: '__cmpCall', data: JSON.stringify(message) }),
			'*',
		);
	});

export { getUSPData };
