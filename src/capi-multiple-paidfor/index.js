// Webfonts
import { getIframeId, getWebfonts } from '../_shared/js/messages.js';
import { write } from '../_shared/js/dom.js';

// Loads the card data from CAPI in JSON format.
function retrieveCapiData () {

	// Do request stuff.

}

// Constructs an individual card.
function buildCard (cardInfo) {

	let cardTemplate = document.getElementById('paidfor-card');
	let card = document.importNode(cardTemplate.card, true);

	return card;

}

// Constructs an array of cards from an array of data.
function buildCards (cardsInfo) {

	let cardList = document.createDocumentFragment();

	cardsInfo.foreach(info => {
		cardList.appendChild(buildCard(info));
	});

	return () => {

		let advertRow = document.getElementsByClassName('adverts__row')[0];
		advertRow.appendChild(cardList);

	};

}

// Inserts cards into the advert, retrieving their data from CAPI.
retrieveCapiData().then((data) => {
	return buildCards(data);
}).then(write).catch(err => {
	console.log(err);
});
