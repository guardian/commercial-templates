const CLICK_MACRO = '%%CLICK_URL_UNESC%%';
const CACHE_BUST = '%%CACHEBUSTER%%';
const DEST_URL = '%%DEST_URL%%';

const addTrackingPixel = (url: string) => {
	const pixel = new Image();
	pixel.src = url + CACHE_BUST;
};

const isValidReplacedVariable = (s: string): boolean =>
	s.length > 0 && !s.startsWith('[%') && !s.endsWith('%]');

const clickMacro = (url: string): string => `${CLICK_MACRO}${url}`;

export {
	CACHE_BUST,
	DEST_URL,
	addTrackingPixel,
	isValidReplacedVariable,
	clickMacro,
};
