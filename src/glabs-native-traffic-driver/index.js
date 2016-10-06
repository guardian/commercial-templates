import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages.js';
import { enableToggles } from '../_shared/js/ui.js';
import { addTrackingPixel } from '../_shared/js/ads.js';

const OVERRIDES = {
	headline: '[%ArticleHeaderText%]'
};

// Loads the article data from CAPI in JSON format.
function retrieveCapiData () {

	let params = new URLSearchParams();
	params.append('t', '[%ArticleShortURL%]')

	let url = `${ENDPOINT}?${params}`;

	return fetch(url).then(response => response.json());

}

// Inserts a headline into the ad, from cAPI or using override.
function insertHeadline (articleInfo) {

	let headline;

	if (OVERRIDES.headline !== '') {
		headline = OVERRIDES.headline;
	} else {
		headline = articleInfo.articleHeadline;
	}

	return () => {
		document.querySelector('.creative__title').textContent = headline;
	}

}

getIframeId()
.then(() => {
    enableToggles();
    addTrackingPixel(document.getElementById('creative'));
    return getWebfonts(['GuardianSansWeb', 'GuardianTextSansWeb'])
})
.then(resizeIframeHeight);
