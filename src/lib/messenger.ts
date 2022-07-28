type StandardMessage<Type = string, Data = unknown> = {
	// id?: string;
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

// type IframeIdMessageType = StandardMessage<string, string>;

type ResizeMessage = StandardMessage<
	'set-ad-height',
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

type Message = ResizeMessage | StringMessage | BackgroundMessage;

/**
 * Post message to parent frame
 *
 * @param arg The message to send to the parent frame, see the StandardMessage type for more info
 */
const post = (arg: Message): void => {
	window.top?.postMessage({ id: self.name, ...arg }, '/');
};

export interface IframeIdResponse {
	id: string;
	type: string;
}

export { post };
export type { Message };
