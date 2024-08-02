/**
 * https://assets.publicgood.com/docs/gen/pgmApi.html#create__anchor
 */
export interface PgmApiOptions {
	partnerId: string;
	attributes: {
		targetId?: string;
		targetType?: string;
		url: string;
	};
	onShow?: () => void;
	onHide?: () => void;
}

/**
 * https://assets.publicgood.com/docs/gen/global.html#MatchInfo
 */
interface MatchInfo {
	action: string;
	cpm: number;
	partner_id: string;
	campaign_id: string;
}

export interface PgmApi {
	create: (el: HTMLElement, options: PgmApiOptions) => void;
	getAdvice(options: PgmApiOptions): Promise<MatchInfo>;
}

export const create = (el: HTMLElement, options: PgmApiOptions) => {
	const win = window as typeof window & { pgmApi: PgmApi };

	win.pgmApi.create(el, options);
};
