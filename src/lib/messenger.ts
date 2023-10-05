type StandardMessage<Type = string, Data = unknown> = {
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
		videoSource: string;
	}
>;

type TypeMessage = StandardMessage<'type', string>;

type Message = ResizeMessage | StringMessage | BackgroundMessage | TypeMessage;

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

export { post };
export type { Message };
