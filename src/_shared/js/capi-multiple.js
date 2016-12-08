import { getIframeId, getWebfonts, resizeIframeHeight, onViewport, reportClicks } from
    './messages.js';
import { write } from './dom.js';
import { enableToggles } from './ui.js';
import { generatePicture } from './capi-images.js';
import { clickMacro, setEditionLink } from './ads';
import { URLSearchParams } from './utils';

const ENDPOINT = 'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-multiple.json';

const OVERRIDES = {
    urls: ['[%Article1URL%]', '[%Article2URL%]', '[%Article3URL%]', '[%Article4URL%]'],
    headlines: ['[%Article1Headline%]', '[%Article2Headline%]', '[%Article3Headline%]', '[%Article4Headline%]'],
    images: ['[%Article1Image%]', '[%Article2Image%]', '[%Article3Image%]', '[%Article4Image%]'],
    brandLogo: '[%BrandLogo%]'
};

// Loads the card data from CAPI in JSON format.
function retrieveCapiData () {
    let params = new URLSearchParams();
    params.append('k', '[%SeriesURL%]');
    OVERRIDES.urls.forEach(url => {
        if (url !== '') {
            params.append('t', url);
        }
    });
    return fetch(`${ENDPOINT}?${params}`)
    .then(response => response.json());
}

// Sets up media icon information on a card (SVG and class).
function setMediaIcon (card, title, mediaType) {
    title.insertAdjacentHTML('afterbegin', mediaIcons[mediaType]);
    card.classList.add('advert--media');
}

// Inserts capi headline or DFP override.
function buildHeadline (card, title, cardInfo, cardNumber) {
    let headline = OVERRIDES.headlines[cardNumber] || cardInfo.articleHeadline;
    title.textContent = headline;
    card.setAttribute('data-link-name', headline);
}

// Constructs the title part of the card: headline and media icon.
function buildTitle (card, cardInfo, cardNumber) {

    let title = card.querySelector('.advert__title');

    buildHeadline(card, title, cardInfo, cardNumber);

    if (cardInfo.videoTag) {
        setMediaIcon(card, title, 'video');
    } else if (cardInfo.galleryTag) {
        setMediaIcon(card, title, 'camera');
    } else if (cardInfo.audioTag) {
        setMediaIcon(card, title, 'volume');
    } else {
        card.classList.add('advert--text');
    }
}

// Either from template, or workaround for IE (sigh).
function importCard (adType) {

    let cardTemplate = document.getElementById(`${adType}-card`);

    // Modern browsers.
    if (cardTemplate.content) {
        return document.importNode(cardTemplate.content, true);
    } else {

        // Internet Explorer doesn't support templates.
        let cardFragment = document.createDocumentFragment();
        let tempDiv = document.createElement('div');

        tempDiv.innerHTML = cardTemplate.innerHTML;
        while (tempDiv.firstChild) cardFragment.appendChild(tempDiv.firstChild);
        return cardFragment;

    }

}

// Constructs an individual card.
function buildCard (cardInfo, cardNum, adType) {

    let cardFragment = importCard(adType);
    let card = cardFragment.querySelector(`.advert--${adType}`);
    let imgContainer = card.querySelector('.advert__image-container');

    buildTitle(card, cardInfo, cardNum);
    card.href = clickMacro + cardInfo.articleUrl;

    let image = generatePicture({
        url: OVERRIDES.images[cardNum] || cardInfo.articleImage.backupSrc,
        classes: ['advert__image'],
        sources: !OVERRIDES.images[cardNum] && cardInfo.articleImage.sources
    });

    imgContainer.insertAdjacentHTML('afterbegin', image);

    if (cardNum > 0 && adType !== "hosted") {
        imgContainer.classList.add('hide-until-tablet');
    }

    return cardFragment;

}

// Adds branding information from cAPI or DFP override.
function addBranding (brandingCard) {

    let brandImage = document.querySelector('.badge__logo');

    if (OVERRIDES.brandLogo === '') {
        brandImage.src = brandingCard.branding.sponsorLogo.url;
    }

}

// Sets correct glabs link based on edition (AU/All others).
function editionLink (host, edition, adType) {

    if (adType === "paidfor") {
        setEditionLink(host, edition, document.querySelector('.adverts__stamp a'));
    }

}

// Uses cAPI data to build the ad content.
function buildFromCapi (host, cardsInfo, adType) {

    let cardList = document.createDocumentFragment();

    // Constructs an array of cards from an array of data.
    cardsInfo.articles.forEach((info, idx) => {
        cardList.appendChild(buildCard(info, idx, adType));
    });

    return write(() => {
        // Takes branding from last possible card, in case earlier ones overriden.
        addBranding(cardsInfo.articles.slice(-1)[0]);
        let advertRow = document.querySelector('.adverts__row');
        advertRow.appendChild(cardList);
        editionLink(host, cardsInfo.articles[0].edition, adType);
    });
}

export default function capiMultiple (adType) {
    let lastWidth;

    enableToggles();

    return getIframeId()
    .then(({ host }) => Promise.all([
        reportClicks(),
        getWebfonts(),
        retrieveCapiData()
        .then(capiData => buildFromCapi(host, capiData, adType))
    ]))
    .then(() => {
        onViewport(({ width }) => {
            if( width != lastWidth ) {
                resizeIframeHeight();
                lastWidth = width;
            }
        });
    });
}
