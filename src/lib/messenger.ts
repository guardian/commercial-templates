type StandardMessage<Type = string, Data = unknown> = {
	// id: string;
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
	'set-ad-height',
	{ width: number; height: number }
>;
type StringMessage = StandardMessage<'message', string>;

type Message = ResizeMessage | StringMessage;

const post = (arg: Message): void => {
	window.top?.postMessage({ id: self.name, ...arg }, '/');
};

export { post };
export type { Message };
