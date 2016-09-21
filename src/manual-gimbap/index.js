// Webfonts
import { getIframeId, getWebfonts } from '../_shared/js/messages.js';
import { write } from '../_shared/js/dom.js';

getIframeId().then(() => {
    getWebfonts();
});

// Retrieve DFP variables.
var offerQuotes = ['[%Offer1Quotes%]', '[%Offer2Quotes%]', '[%Offer3Quotes%]',
	'[%Offer4Quotes%]'];
var offerTones = ['[%Offer1Tone%]', '[%Offer2Tone%]', '[%Offer3Tone%]',
	'[%Offer4Tone%]'];
var authorImage = '[%Offer1AuthorImage%]';
var arrowLinks = '[%LinksWithArrows%]';

// DOM mutations.
write(() => {

	// Adds quotes to title if set in DFP.
	Array.from(document.getElementsByClassName('gimbap__title'), insertQuotes);

	function insertQuotes (title, adNumber) {

		if (offerQuotes[adNumber] === 'yes') {
			title.insertAdjacentHTML('afterbegin', quoteSvg);
		}

	}

	// Inserts appropriate SVG logos for certain tones.
	Array.from(document.getElementsByClassName('gimbap-logo'), (logo, idx) => {
		logo.insertAdjacentHTML('afterbegin', logoSvgs[offerTones[idx]]);
	});

	// Adds author image if there is an author image URL present in DFP.
	if (authorImage !== "") {

		var firstGimbap = document.getElementsByClassName('gimbap')[0];

		firstGimbap.classList.add('gimbap--has-author');
		firstGimbap.insertAdjacentHTML('afterbegin',
			`<img class="gimbap__author" src="${authorImage}" alt="" />`);

	}

	// Displays arrows if set in DFP.
	if (arrowLinks === 'yes') {

		Array.from(document.getElementsByClassName('gimbap__arrow'), showArrow);

		function showArrow (arrow) {
			arrow.classList.add('gimbap__arrow--show');
		}

	}

}).catch(err => {
	console.log(err);
});
