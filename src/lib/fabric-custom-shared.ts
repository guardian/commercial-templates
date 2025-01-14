const CACHE_BUST = '%%CACHEBUSTER%%';
const DapAssetsRoot = `https://s3-eu-west-1.amazonaws.com/adops-assets/dap-fabrics`;

export const getDapAssetsPath = (DapAssetsFolder: string) =>
	`${DapAssetsRoot}/${DapAssetsFolder}`;

export const addTrackingPixel = (url: string) => {
	const pixel = new Image();
	pixel.src = url + CACHE_BUST;
};

// relative paths in the CSS need to be replaced with the absolute path
export const replaceAssetLinks = (html: string, DapAssetsPath: string) => {
	const re = /url\('\.\/(.*)'\)/g;
	return html.replace(re, `url('${DapAssetsPath}/$1')`);
};

export const getTag = (DapAssetsFolder: string, DapAssetsPath: string) => {
	if (DapAssetsFolder) {
		return fetch(`${DapAssetsPath}/index.html`)
			.then((res) => res.text())
			.then((html) => replaceAssetLinks(html, DapAssetsPath));
	}
	return Promise.reject('No tag found');
};
