const CACHE_BUST = '%%CACHEBUSTER%%';
const DapAssetsRoot = `https://adops-assets.global.ssl.fastly.net/dap-fabrics`;

const addTrackingPixel = (url: string) => {
	const pixel = new Image();
	pixel.src = url + CACHE_BUST;
};

// relative paths in the CSS need to be replaced with the absolute path
const replaceAssetLinks = (html: string, DapAssetsPath: string) => {
	const re = /url\('\.\/(.*)'\)/g;
	return html.replace(re, `url('${DapAssetsPath}/$1')`);
};

const getTag = (DapAssetsFolder: string) => {
	const DapAssetsPath = `${DapAssetsRoot}/${DapAssetsFolder}`;
	if (DapAssetsFolder) {
		return fetch(`${DapAssetsPath}/index.html`)
			.then((res) => res.text())
			.then((html) => replaceAssetLinks(html, DapAssetsPath));
	}
	return Promise.reject(Error('No tag found'));
};

const insertTag = (tag: string, target: HTMLElement) => {
	const range = document.createRange();
	range.setStart(target, 0);
	range.setEnd(target, 0);
	target.appendChild(range.createContextualFragment(tag));
};

export { addTrackingPixel, replaceAssetLinks, getTag, insertTag };
