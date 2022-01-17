type Message =
	| {
			id: string;
			type: 'resize';
			value: number;
	  }
	| {
			id: string;
			type: 'message';
			value: string;
	  };

const post = (arg: Omit<Message, 'id'>): void => {
	window.top?.postMessage({ id: self.name, ...arg });
};

export { post };
export type { Message };
