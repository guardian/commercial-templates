import config from '../_shared/js/config';
import { getIframeId, getWebfonts, resizeIframeHeight } from
	'../_shared/js/messages.js';
import { write } from '../_shared/js/dom.js';
import { portify } from '../_shared/js/dev';

// Glabs edition links.
const GLABS_EDITION = {
	default: 'https://theguardian.com/guardian-labs',
	au: 'https://theguardian.com/guardian-labs-australia'
};

const OVERRIDES = {
	urls: ['[%Article1URL%]', '[%Article2URL%]', '[%Article3URL%]',
		'[%Article4URL%]'],
	headlines: ['[%Article1Headline%]', '[%Article2Headline%]',
		'[%Article3Headline%]', '[%Article4Headline%]'],
	images: ['[%Article1Image%]', '[%Article2Image%]', '[%Article3Image%]',
		'[%Article4Image%]'],
	brandLogo: '[%BrandLogo%]'
};

// Loads the card data from CAPI in JSON format.
function retrieveCapiData () {

	let params = new URLSearchParams();
	params.append('k', '[%SeriesURL%]');

	OVERRIDES.urls.map(url => {

		if (url !== '') {
			params.append('t', url);
		}

	})

	let url = `${config.capiMultipleUrl}?${params}`;

	return fetch(url).then(response => response.json());

}

// Sets up media icon information on a card (SVG and class).
function setMediaIcon (card, title, mediaType) {

	title.insertAdjacentHTML('afterbegin', mediaIcons[mediaType]);
	card.classList.add('advert--media');

}

// Inserts capi headline or DFP override.
function buildHeadline (title, cardInfo, cardNumber) {

	let headline;

	if (OVERRIDES.headlines[cardNumber] !== '') {
		headline = document.createTextNode(OVERRIDES.headlines[cardNumber]);
	} else {
		headline = document.createTextNode(cardInfo.articleHeadline);
	}

	title.appendChild(headline);

}

// Constructs the title part of the card: headline and media icon.
function buildTitle (card, cardInfo, cardNumber) {

	let title = card.querySelector('.advert__title');

	if (cardInfo.videoTag) {
		setMediaIcon(card, title, 'video');
	} else if (cardInfo.galleryTag) {
		setMediaIcon(card, title, 'camera');
	} else if (cardInfo.audioTag) {
		setMediaIcon(card, title, 'volume');
	} else {
		card.classList.add('advert--text');
	}

	buildHeadline(title, cardInfo, cardNumber);

}

// Creates a set of source elements for an image.
function buildSources (sourceData) {

	let sourcesFragment = document.createDocumentFragment();

	return sourceData.reduce((sources, source) => {

		let hidpi = document.createElement('source');
		hidpi.media = `(min-width: ${source.minWidth}px) and
			(-webkit-min-device-pixel-ratio: 1.25),
			(min-width: ${source.minWidth}px) and (min-resolution: 120dpi)`;
		hidpi.sizes = source.sizes;
		hidpi.srcset = `${window.location.protocol}${source.hidpiSrcset}`;

		let lodpi = document.createElement('source');
		lodpi.media = `(min-width: ${source.minWidth}px)`;
		lodpi.sizes = source.sizes;
		lodpi.srcset = `${window.location.protocol}${source.lodpiSrcset}`;

		sources.appendChild(hidpi);
		sources.appendChild(lodpi);
		return sources;

	}, sourcesFragment);

}

// Inserts the image source into a card.
function insertImages (card, cardInfo, cardNumber) {

	let backupImg = card.querySelector('.advert__image');

	if (OVERRIDES.images[cardNumber] !== '') {
		backupImg.src = OVERRIDES.images[cardNumber];
	} else {

		backupImg.src = cardInfo.articleImage.backupSrc;
		let sources = buildSources(cardInfo.articleImage.sources);
		card.querySelector('picture').insertBefore(sources, backupImg);

	}

}

// Constructs an individual card.
function buildCard (cardInfo, cardNumber) {

	let cardTemplate = document.getElementById('supported-card');
	let cardFragment = document.importNode(cardTemplate.content, true);
	let card = cardFragment.querySelector('.advert--supported');

	buildTitle(card, cardInfo, cardNumber);
	card.querySelector('a.advert').href = cardInfo.articleUrl;
	insertImages(card, cardInfo, cardNumber);

	// Only first two cards show on mobile portrait.
	if (cardNumber >= 2) {
		card.classList.add('hide-until-mobile-landscape');
	}

	return cardFragment;

}

// Adds branding information from cAPI or DFP override.
function addBranding (brandingCard) {

	return () => {

		let brandImage = document.querySelector('.badge__logo');

		if (OVERRIDES.brandLogo === '') {
			brandImage.src = brandingCard.branding.sponsorLogo.url;
		}

	}

}

// Constructs an array of cards from an array of data.
function buildCards (cardsInfo) {

	// Takes branding from last possible card, in case earlier ones overriden.
	let brandingChange = addBranding(cardsInfo.articles.slice(-1)[0]);
	let cardList = document.createDocumentFragment();

	cardsInfo.articles.forEach((info, idx) => {
		cardList.appendChild(buildCard(info, idx));
	});

	// DOM mutation function.
	return () => {

		brandingChange();
		let advertRow = document.querySelector('.adverts__row');
		advertRow.appendChild(cardList);

	};

}

// Sets correct glabs link based on edition (AU/All others).
function editionLink () {

	return () => {

		let edition = guardian.config.page.edition;
		let link = edition === 'AU' ? GLABS_EDITION.au : GLABS_EDITION.default;

		document.querySelector('.adverts__stamp a').href = link;

	}

}

// Displays or hides a popup.
function togglePopup (button, popup) {

	if (button.classList.contains('is-active')) {

		button.classList.remove('is-active');
		popup.classList.add('is-off');

	} else {

		button.classList.add('is-active');
		popup.classList.remove('is-off');

	}

}

// Toggles the about information.
function buttonListener () {

	return () => {

		let aboutButton = document.querySelector('.popup__toggle');
		let popup = document.querySelector('.popup');

		aboutButton.addEventListener('click', () => {

			write(() => {
				togglePopup(aboutButton, popup)
			});

		});

	};

}

// Inserts cards into the advert, retrieving their data from CAPI.
getIframeId()
.then(retrieveCapiData)
.then(buildCards)
.then(write)
.then(editionLink)
.then(write)
.then(buttonListener)
.then(write)
.then(getWebfonts)
.then(resizeIframeHeight)
.catch(err => {
	console.log(err);
});
