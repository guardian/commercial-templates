// Webfonts
import { getIframeId, getWebfonts } from '../_shared/js/messages.js';
import { write } from '../_shared/js/dom.js';

// Glabs edition links.
const GLABS_EDITION = {
	default: 'https://theguardian.com/guardian-labs',
	au: 'https://theguardian.com/guardian-labs-australia'
}

// Loads the card data from CAPI in JSON format.
function retrieveCapiData () {

	// Do request stuff.
	var capiData = [];

	return Promise(resolve => {
		resolve(capiData);
	});

}

// Constructs the title part of the card: headline and media icon.
function buildTitle (card, cardInfo) {

	let title = document.querySelector('.advert__title');

	if (cardInfo.isVideo) {
		title.insertAdjacentHTML('afterbegin', mediaIcons.video);
	} else if (cardInfo.isGallery) {
		title.insertAdjacentHTML('afterbegin', mediaIcons.video);
	} else if (cardInfo.isAudio) {
		title.insertAdjacentHTML('afterbegin', mediaIcons.volume);
	}

	title.textContent = cardInfo.headline;
	return card;

}

// Constructs an individual card.
function buildCard (cardInfo) {

	let cardTemplate = document.getElementById('paidfor-card');
	let card = document.importNode(cardTemplate.card, true);

	card = buildTitle(card, cardInfo);

	return card;

}

// Constructs an array of cards from an array of data.
function buildCards (cardsInfo) {

	let cardList = document.createDocumentFragment();

	cardsInfo.forEach(info => {
		cardList.appendChild(buildCard(info));
	});

	// DOM mutation function.
	return () => {

		let advertRow = document.querySelector('.adverts__row');
		advertRow.appendChild(cardList);

	};

}

// Sets correct glabs link based on edition (AU/All others).
function editionLink () {

	let edition = guardian.config.page.edition;
	let link = edition === 'AU' ? GLABS_EDITION.au : GLABS_EDITION.default;

	document.querySelector('.adverts__badge__link').href = link;

}

// Inserts cards into the advert, retrieving their data from CAPI.
retrieveCapiData().then((data) => {
	return buildCards(data);
}).then(write).catch(err => {
	console.log(err);
});
