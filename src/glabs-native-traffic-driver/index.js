import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages.js';
import { enableToggles } from '../_shared/js/ui.js';
import { addTrackingPixel } from '../_shared/js/ads.js';

const OVERRIDES = {
	headline: '[%ArticleHeaderText%]',
	text: '[%ArticleText%]'
};

// Loads the article data from CAPI in JSON format.
function retrieveCapiData () {

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

// Uses cAPI data to build the ad content.
function buildFromCapi (data) {

	return () => {

		insertText(data.articleHeadline, 'creative__title', OVERRIDES.headline);
		insertText(data.articleText, 'creative__standfirst', OVERRIDES.text);
		document.querySelector('.creative__ctu') = data.articleUrl;

	};

}

getIframeId()
.then(() => {
    enableToggles();
    addTrackingPixel(document.getElementById('creative'));
    return getWebfonts(['GuardianSansWeb', 'GuardianTextSansWeb'])
})
.then(resizeIframeHeight);
