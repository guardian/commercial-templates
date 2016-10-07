import { getIframeId, getWebfonts, resizeIframeHeight } from
	'../_shared/js/messages.js';
import { enableToggles } from '../_shared/js/ui.js';
import { addTrackingPixel } from '../_shared/js/ads.js';
import { write } from '../_shared/js/dom.js';
import { getApiBaseUrl } from '../_shared/js/dev';
import { insertImage } from '../_shared/js/capi-images';

const ENDPOINT = 'https://api.nextgen.guardianapps.co.uk/commercial/api/traffic-driver.json';

// Glabs edition links.
const GLABS_EDITION = {
	default: 'https://theguardian.com/guardian-labs',
	au: 'https://theguardian.com/guardian-labs-australia',
	us: 'https://theguardian.com/guardian-labs-us'
};

const OVERRIDES = {
	headline: '[%ArticleHeaderText%]',
	text: '[%ArticleText%]',
	image: '[%ArticleImage%]',
	imageAlt: '[%ArticleImageAlternateText%]'
};

// Loads the article data from CAPI in JSON format.
function retrieveCapiData ({host, preview}) {

	let params = new URLSearchParams();
	params.append('t', '[%ArticleShortURL%]')

	let url = `${ENDPOINT}?${params}`;

	return fetch(url).then(response => response.json());

}

// Inserts text from capi into container element, with optional DFP override.
function insertText (capiText, containerClass, override) {

	let container = document.querySelector(`.${containerClass}`);
	let text = (override !== '') ? override : capiText;

	container.textContent = text;

}

// Sets correct glabs link based on edition (AU/All others).
function editionLink (edition) {

	let link = GLABS_EDITION.default;

	if (edition === 'AU') {
		link = GLABS_EDITION.au;
	} else if (edition === 'US') {
		link = GLABS_EDITION.us;
	}

	document.querySelector('.creative__glabs-link').href = link;

}

// Uses cAPI data to build the ad content.
function buildFromCapi (data) {

	return () => {

		insertText(data.articleHeadline, 'creative__title', OVERRIDES.headline);
		insertText(data.articleText, 'creative__standfirst', OVERRIDES.text);

		let clickThrough = document.querySelector('.creative__ctu');
		clickThrough.href = data.articleUrl;

		let image = insertImage(clickThrough, data.articleImage,
			['creative__image'], OVERRIDES.image);
		image.alt = OVERRIDES.imageAlt;

		editionLink(data.edition);

	};

}

getIframeId()
.then(retrieveCapiData)
.then(buildFromCapi)
.then(write)
.then(() => {
    enableToggles();
    addTrackingPixel(document.getElementById('creative'));
})
.then(getWebfonts)
.then(resizeIframeHeight)
.catch(err => {
	console.log(err);
});
