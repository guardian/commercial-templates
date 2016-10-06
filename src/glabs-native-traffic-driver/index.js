import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages.js';
import { enableToggles } from '../_shared/js/ui.js';
import { addTrackingPixel } from '../_shared/js/ads.js';

const OVERRIDES = {
	headline: '[%ArticleHeaderText%]'
};

// Inserts a
function insertHeadline (articleInfo) {

	let headline;

	if (OVERRIDES.headline !== '') {
		headline = OVERRIDES.headline;
	} else {
		headline = articleInfo.articleHeadline;
	}

	document.querySelector('.creative__title').textContent = headline;

}

getIframeId()
.then(() => {
    enableToggles();
    addTrackingPixel(document.getElementById('creative'));
    return getWebfonts(['GuardianSansWeb', 'GuardianTextSansWeb'])
})
.then(resizeIframeHeight);
