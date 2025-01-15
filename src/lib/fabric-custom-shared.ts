const CACHE_BUST = '%%CACHEBUSTER%%';
const DapAssetsRoot = `https://s3-eu-west-1.amazonaws.com/adops-assets/dap-fabrics`;

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
	return Promise.reject('No tag found');
};

const insertTag = (tag: string) => {
	const placeholder = document.getElementById('creative-link')!;
	const range = document.createRange();
	range.setStart(placeholder, 0);
	range.setEnd(placeholder, 0);
	placeholder.appendChild(range.createContextualFragment(tag));
};

export { addTrackingPixel, replaceAssetLinks, getTag, insertTag };
