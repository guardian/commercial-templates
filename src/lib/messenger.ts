import { timeout } from '$lib/promises';
import type { StringMappingType } from 'typescript';

type StandardMessage<Type = string, Data = unknown> = {
	id?: string;
	type: Type;
	iframeId?: string;
	slotId?: string;
	/**
	 * The `value` property is generic since it is up to the sender to attach arbitrary data
	 *
	 * We mostly treat this as unknown and leave it up to the message
	 * listeners to convert to a type they can handle
	 */
	value: Data;
};

type IframeIdMessageType = StandardMessage<string, string>;

type ResizeMessage = StandardMessage<
	'set-ad-height',
	{ width?: number; height?: number }
>;
type StringMessage = StandardMessage<'message', string>;

type Message = ResizeMessage | StringMessage | IframeIdMessageType;

/**
 * Post message to parent frame
 *
 * @param arg The message to send to the parent frame, see the StandardMessage type for more info
 */
const post = (arg: Message): void => {
	window.top?.postMessage({ ...arg }, '/');
};

// Provided in the response to getIframeId
let iframeId: string | undefined;

// First thing that happens when a native ad is delivered is that the parent
// frame will send a message with the ID of the corresponding iframe. This is
// because of some f**d-up handling of the name attribute that is supposed to
// do the work. On frontend this message is sent by on-slot-load.js.
const getIframeId = (type?: string) => {
	return new Promise((resolve) => {
		self.addEventListener('message', function onMessage(evt) {
			let json;
			try {
				json = JSON.parse(evt.data);
			} catch (_) {
				return;
			}

			const keys = Object.keys(json);
			if (
				keys.length < 2 ||
				!keys.includes('id') ||
				!keys.includes('host')
			)
				return;

			self.removeEventListener('message', onMessage);
			({ id: iframeId } = json);

			if (type) {
				sendMessage('type', type);
			}
			resolve(json);
		});
	});
};

const sendMessage = (
	type: string,
	value: string | { width?: number; height?: number },
) => {
	const id = generateId();

	return timeout(
		new Promise((resolve, reject) => {
			self.addEventListener('message', function onMessage({ data }) {
				let msgId, error, result;
				try {
					({ id: msgId, error, result } = JSON.parse(data));
				} catch (_) {
					return;
				}

				if (msgId !== id) {
					return;
				}

				self.removeEventListener('message', onMessage);
				if (error === null) {
					resolve(result);
				} else {
					reject(error);
				}
			});
			post({ id, iframeId, type, value });
		}),
		300,
	);
};

const generateId = () => {
	return `${_4chars()}${_4chars()}-${_4chars()}-${_4chars()}-${_4chars()}-${_4chars()}${_4chars()}${_4chars()}`;

	function _4chars() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
};

const resizeIframeHeight = (height: number) => {
	sendMessage('resize', { height });
};

export { post, getIframeId, sendMessage, resizeIframeHeight };
export type { Message };
