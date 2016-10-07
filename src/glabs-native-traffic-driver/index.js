import { getIframeId, getWebfonts, resizeIframeHeight } from
	'../_shared/js/messages';
import { enableToggles } from '../_shared/js/ui';
import { addTrackingPixel, setEditionLink } from '../_shared/js/ads';
import { write } from '../_shared/js/dom';
import { insertImage } from '../_shared/js/capi-images';

const ENDPOINT = 'https://api.nextgen.guardianapps.co.uk/commercial/api/traffic-driver.json';

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

// Uses cAPI data to build the ad content.
function buildFromCapi (data) {

	return () => {

		let clickThroughs = document.getElementsByClassName('creative__ctu');
		let editionLink = document.querySelector('.creative__glabs-link');

		insertText(data.articleHeadline, 'creative__title', OVERRIDES.headline);
		insertText(data.articleText, 'creative__standfirst', OVERRIDES.text);
		setEditionLink(data.edition, editionLink);

		for (var i = clickThroughs.length - 1; i >= 0; i--) {
			clickThroughs[i].href = data.articleUrl;
		}

		let image = insertImage(clickThroughs[0], data.articleImage,
			['creative__image'], OVERRIDES.image);
		image.alt = OVERRIDES.imageAlt;

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
