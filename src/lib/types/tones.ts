const tones = [
	'brand',
	'brand-new',
	'job',
	'live',
	'travel',
	'money',
	'book',
	'weekly',
	'members',
	'patron',
	'lifestyle',
	'climate',
	'climate2',
	'support',
	'subscription',
	'subs-rebrand'
] as const;

type Tone = (typeof tones)[number];

export type { Tone };

export { tones };
