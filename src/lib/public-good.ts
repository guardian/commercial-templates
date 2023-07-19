export interface PgmApiOptions {
	partnerId: string;
	attributes: {
		url: string;
	};
}

export interface PgmApi {
	create: (el: HTMLElement, options: PgmApiOptions) => void;
}

export const create = (el: HTMLElement, options: PgmApiOptions) => {
	const win = window as typeof window & { pgmApi: PgmApi };

	win.pgmApi.create(el, options);
};
