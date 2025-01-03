import { post } from '$lib/messenger';

const CACHE_BUST = '%%CACHEBUSTER%%';
const DapAssetsRoot = `https://s3-eu-west-1.amazonaws.com/adops-assets/dap-fabrics`;
const DapAssetsFolder: string = '[%DapAssetsFolder%]';

const DapAssetsPath = `${DapAssetsRoot}/${DapAssetsFolder}`;
const TrackingPixel: string = '[%TrackingPixel%]';
const ResearchPixel: string = '[%ResearchPixel%]';

const addTrackingPixel = (url: string) => {
	const pixel = new Image();
	pixel.src = url + CACHE_BUST;
};

// relative paths in the CSS need to be replaced with the absolute path
const replaceAssetLinks = (html: string) => {
	const re = /url\('\.\/(.*)'\)/g;
	return html.replace(re, `url('${DapAssetsPath}/$1')`);
};

const getTag = () => {
	if (DapAssetsFolder) {
		return fetch(`${DapAssetsPath}/index.html`)
			.then((res) => res.text())
			.then(replaceAssetLinks);
	}
	return Promise.reject('No tag found');
};

/**
 * This is a hack to insert the html into the DOM,
 * using innerHtml would not work if the tag contains a script tag
 * see https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations
 *
 * @param tag the html to insert
 */
const insertTag = (tag: string) => {
	const placeholder = document.getElementById('creative-link')!;
	const range = document.createRange();
	range.setStart(placeholder, 0);
	range.setEnd(placeholder, 0);
	placeholder.appendChild(range.createContextualFragment(tag));
};

getTag()
	.then((tag) => {
		insertTag(tag);
		post({
			type: 'resize',
			value: { height: document.getElementById('creative')!.offsetHeight },
		});
	})
	.catch((e) => {
		console.error(e);
	});

if (TrackingPixel) {
	addTrackingPixel(TrackingPixel);
}

if (ResearchPixel) {
	addTrackingPixel(ResearchPixel);
}
