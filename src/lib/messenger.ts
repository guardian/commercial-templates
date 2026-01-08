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

type BackgroundMessage = StandardMessage<
	'background',
	{
		scrollType: string;
		backgroundImage: string;
		backgroundRepeat: string;
		backgroundPosition: string;
		backgroundSize: string;
		ctaUrl?: string;
		videoSource?: string;
		transform?: string;
	}
>;

type FabricBackgroundMessage = StandardMessage<
	'background',
	{
		scrollType: string;
		backgroundColor: string;
		backgroundImage: string;
		backgroundRepeat: string;
		backgroundPosition: string;
	}
>;

type StringMessage = StandardMessage<
	| 'message'
	| 'type'
	| 'get-page-url'
	| 'passback-refresh'
	| 'viewport'
	| 'scroll'
	| 'init-video',
	string
>;

type VideoProgressMessage = StandardMessage<
	'video-progress',
	{ progress: number }
>;

type Message =
	| ResizeMessage
	| StringMessage
	| BackgroundMessage
	| FabricBackgroundMessage
	| VideoProgressMessage;

type MessengerResponse = {
	id: string;
	result: unknown;
};

const generateId = () => {
	const _4chars = () =>
		Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	return `${_4chars()}${_4chars()}-${_4chars()}-${_4chars()}-${_4chars()}-${_4chars()}${_4chars()}${_4chars()}`;
};

const timeout = async <T>(promise: Promise<T>, ms: number): Promise<T | void> =>
	Promise.race([
		promise,
		new Promise<void>((resolve) => window.setTimeout(resolve, ms)),
	]);

/**
 * Post message to parent frame
 *
 * @param arg The message to send to the parent frame, see the StandardMessage type for more info
 */
const post = (arg: Message): void => {
	//  frontend messenger.ts discards messages that are not strings and that do not provide an an id in the format of a UUID
	window.top?.postMessage(JSON.stringify({ id: generateId(), ...arg }), '*');
};

const isReplyFromMessenger = (json: unknown): json is MessengerResponse => {
	const reply = json as MessengerResponse;
	return 'result' in reply && 'id' in reply && typeof reply.id === 'string';
};

const decodeReply = (e: MessageEvent<string>): MessengerResponse | void => {
	try {
		const json: unknown = JSON.parse(e.data);

		if (isReplyFromMessenger(json)) {
			return json;
		}

		return;
	} catch (_) {
		return;
	}
};

const postAndListen = (arg: Message): Promise<unknown> =>
	timeout(
		new Promise((resolve) => {
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
		}),
		3000,
	);

export { post, timeout, postAndListen, generateId };
export type { Message };
