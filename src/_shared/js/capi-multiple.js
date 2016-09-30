import config from './config';
import { getIframeId, getWebfonts, resizeIframeHeight } from
	'./messages.js';
import { write } from './dom.js';
import { portify } from './dev';

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
		hidpi.srcset = `${source.hidpiSrcset}`;

		let lodpi = document.createElement('source');
		lodpi.media = `(min-width: ${source.minWidth}px)`;
		lodpi.sizes = source.sizes;
		lodpi.srcset = `${source.lodpiSrcset}`;

		sources.appendChild(hidpi);
		sources.appendChild(lodpi);
		return sources;

	}, sourcesFragment);

}

// Insert between IE comments, a pain.
function insertBetweenComments (card, sources) {

	let picture = card.querySelector('picture');
	let pictureElems = picture.childNodes;

	for (var i = pictureElems.length - 1; i >= 0; i--) {

		if (pictureElems[i].nodeType === Node.COMMENT_NODE) {
			return picture.insertBefore(sources, pictureElems[i]);
		}

	}

}

// Inserts the image source into a card.
function insertImages (card, cardInfo, cardNumber) {

	let backupImg = card.querySelector('.advert__image');

	if (OVERRIDES.images[cardNumber] !== '') {
		backupImg.src = OVERRIDES.images[cardNumber];
	} else {

		let sources = buildSources(cardInfo.articleImage.sources);
		insertBetweenComments(card, sources);
		backupImg.src = cardInfo.articleImage.backupSrc;

	}

}

// Constructs an individual card.
function buildCard (cardInfo, cardNumber, isPaid) {

	let adType = isPaid ? 'paidfor' : 'supported';
	let cardTemplate = document.getElementById(`${adType}-card`);
	let cardFragment = document.importNode(cardTemplate.content, true);
	let card = cardFragment.querySelector(`.advert--${adType}`);

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
function addBranding (brandingCard, isPaid) {

	let imageClass = `.${isPaid ? 'adverts__' : ''}badge__logo`;
	let brandImage = document.querySelector(imageClass);

	if (OVERRIDES.brandLogo === '') {
		brandImage.src = brandingCard.branding.sponsorLogo.url;
	}

}

// Sets correct glabs link based on edition (AU/All others).
function editionLink (edition, isPaid) {

	if (isPaid) {
		let link = edition === 'AU' ? GLABS_EDITION.au : GLABS_EDITION.default;
		document.querySelector('.adverts__stamp a').href = link;
	}

}

// Constructs an array of cards from an array of data.
function buildCards (cardsInfo, isPaid) {

	// Takes branding from last possible card, in case earlier ones overriden.
	let cardList = document.createDocumentFragment();

	cardsInfo.articles.forEach((info, idx) => {
		cardList.appendChild(buildCard(info, idx, isPaid));
	});

	// DOM mutation function.
	return () => {

		addBranding(cardsInfo.articles.slice(-1)[0], isPaid);
		let advertRow = document.querySelector('.adverts__row');
		advertRow.appendChild(cardList);
		editionLink(cardsInfo.articles[0].edition, isPaid);

	};

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

	let aboutButton = document.querySelector('.popup__toggle');
	let popup = document.querySelector('.popup');

	aboutButton.addEventListener('click', () => {

		write(() => {
			togglePopup(aboutButton, popup)
		});

	});

}

export default function capiMultiple (adType) {

	const isPaid = (adType === 'paidfor');

	getIframeId()
	.then(retrieveCapiData)
	.then(capiData => buildCards(capiData, isPaid))
	.then(write)
	.then(() => {
		if (isPaid) {
			write(buttonListener);
		}
	})
	.then(getWebfonts)
	.then(resizeIframeHeight)
	.catch(err => {
		console.log(err);
	});

}
