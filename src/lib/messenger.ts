type StandardMessage<Type = string, Data = unknown> = {
	type: Type;
	id?: string;
	iframeId?: string;
	slotId?: string;
	/**
	 * The `value` property is generic since it is up to the sender to attach arbitrary data
	 *
	 * We mostly treat this as unknown and leave it up to the message
	 * listeners to convert to a type they can handle
	 *
	 * Although some messages don't have a value property, e.g. 'get-page-url', this property is still required due to validation in messenger.ts in the commercial repo
	 */
	value: Data;
};

type ResizeMessage = StandardMessage<
	'set-ad-height' | 'resize',
	{ width?: number | string; height?: number | string }
>;

type StringMessage = StandardMessage<'message', string>;

type BackgroundMessage = StandardMessage<
	'background',
	{
		scrollType: string;
		backgroundImage: string;
		backgroundRepeat: string;
		backgroundPosition: string;
		backgroundSize: string;
		ctaUrl: string;
	}
>;

type TypeMessage = StandardMessage<'type', string>;

type GetPageURLMessage = StandardMessage<'get-page-url', string>;

type Message =
	| ResizeMessage
	| StringMessage
	| BackgroundMessage
	| TypeMessage
	| GetPageURLMessage;

type ErrorResponse = {
	id: string;
	error: string;
};
type SuccessResponse = {
	id: string;
	result: string;
};

type ResponseMessage = SuccessResponse | ErrorResponse;

const generateId = () => {
	const _4chars = () =>
		Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	return `${_4chars()}${_4chars()}-${_4chars()}-${_4chars()}-${_4chars()}-${_4chars()}${_4chars()}${_4chars()}`;
};

/**
 * Post message to parent frame
 *
 * @param arg The message to send to the parent frame, see the StandardMessage type for more info
 */
const post = (arg: Message): void => {
	//  frontend messenger.ts discards messages that are not strings and that do not provide an an id in the format of a UUID
	window.top?.postMessage(JSON.stringify({ id: generateId(), ...arg }), '*');
};

const replyIsError = (json: unknown): json is ErrorResponse => {
	const reply = json as ErrorResponse;
	return (
		'error' in reply &&
		typeof reply.error === 'string' &&
		'id' in reply &&
		typeof reply.id === 'string'
	);
};

const replyIsSuccess = (json: unknown): json is SuccessResponse => {
	const reply = json as SuccessResponse;
	return (
		'result' in reply &&
		typeof reply.result === 'string' &&
		'id' in reply &&
		typeof reply.id === 'string'
	);
};

const decodeReply = (e: MessageEvent<string>): SuccessResponse | void => {
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

const postAndListen = (arg: Message): Promise<string> => {
	return new Promise((resolve) => {
		const id = generateId();

		const listener = (e: MessageEvent<string>) => {
			const decoded = decodeReply(e);
			if (decoded && decoded.id === id) {
				resolve(decoded.result);
				window.removeEventListener('message', listener);
			}
		};

		window.addEventListener('message', listener);

		post({ ...arg, id });
	});
};

export { post, postAndListen };
export type { Message };
