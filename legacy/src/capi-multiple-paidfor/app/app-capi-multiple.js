import { write } from '../../_shared/js/dom.js';
import { enableToggles } from '../../_shared/js/ui.js';
import { generatePicture } from '../../_shared/js/capi-images.js';
import { clickMacro, setEditionLink } from '../../_shared/js/ads';
import { URLSearchParams } from '../../_shared/js/utils';

const ENDPOINT = 'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-multiple.json';

const OVERRIDES = {
    urls: ['[%Article1URL%]', '[%Article2URL%]', '[%Article3URL%]', '[%Article4URL%]'],
    kickers: ['[%Article1Kicker%]', '[%Article2Kicker%]', '[%Article3Kicker%]', '[%Article4Kicker%]'],
    headlines: ['[%Article1Headline%]', '[%Article2Headline%]', '[%Article3Headline%]', '[%Article4Headline%]'],
    images: ['[%Article1Image%]', '[%Article2Image%]', '[%Article3Image%]', '[%Article4Image%]']
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

// Constructs the title part of the card: headline and media icon.
function buildTitle (card, cardInfo, cardNumber) {
    let title = card.querySelector('.advert__title');
    let kickerText = OVERRIDES.kickers[cardNumber];

    let kicker = kickerText ? `<span class="advert__kicker">${kickerText}</span>` : '';
    let icon = '';
    let headline = OVERRIDES.headlines[cardNumber] || cardInfo.articleHeadline;

    if (cardInfo.videoTag) {
        card.classList.add('advert--media');
        icon = mediaIcons['video'];
    } else if (cardInfo.galleryTag) {
        card.classList.add('advert--media');
        icon = mediaIcons['camera'];
    } else if (cardInfo.audioTag) {
        card.classList.add('advert--media');
        icon = mediaIcons['volume'];
    } else {
        card.classList.add('advert--text');
    }

    card.setAttribute('data-link-name', headline);

    title.insertAdjacentHTML('beforeend', [kicker, icon, headline].join(' '));
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

function buildLogo(card, cardNumber, cardsInfo, generateLogo) {
    if (cardsInfo.isSingle) return;

    let cardInfo = cardsInfo.articles[cardNumber];
    if(cardInfo.branding){
        let logo = generateLogo(cardInfo.branding.logo.src, cardInfo.branding.logo.link, 'badge--branded');
        card.insertAdjacentHTML('beforeend', logo);
    }
}

// Constructs an individual card.
function buildCard (cardInfo, cardNum, adType, cardsInfo, generateLogo) {

    let cardFragment = importCard(adType);
    let card = cardFragment.querySelector(`.advert--${adType}`);
    let imgContainer = card.querySelector('.advert__image-container');

    buildTitle(card, cardInfo, cardNum);
    buildLogo(card, cardNum, cardsInfo, generateLogo);
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

// Adds branding information from cAPI.
function addBranding (brandingCard, generateLogo) {

    let body = document.querySelector('.js-logo-container');
    let logoUrl = brandingCard.branding && brandingCard.branding.logo.src;
    let sponsorLink = brandingCard.branding && brandingCard.branding.logo.link;

    body.insertAdjacentHTML('beforeend', generateLogo(logoUrl, sponsorLink));
}

// Sets correct glabs link based on edition (AU/All others).
function editionLink (host, edition, adType) {

    if (adType === "paidfor") {
        setEditionLink(host, edition, document.querySelector('.adverts__stamp a'));
    }

}

// Uses cAPI data to build the ad content.
function buildFromCapi (host, cardsInfo, adType, generateLogo) {

    let cardList = document.createDocumentFragment();

    cardsInfo.isSingle = adType === 'hosted' || cardsInfo.articles
        .map(cardInfo => cardInfo.branding && cardInfo.branding.logo.src)
        .reduce(((isSingle, url, index, urls) => isSingle && (index === 0 || url === urls[index - 1])), true);

    // Constructs an array of cards from an array of data.
    cardsInfo.articles.forEach((info, idx) => {
        cardList.appendChild(buildCard(info, idx, adType, cardsInfo, generateLogo));
    });

    return write(() => {
        // Takes branding from last possible card, in case earlier ones overridden.
        let brandingCard = cardsInfo.articles.slice(-1)[0];
        if( cardsInfo.isSingle ) {
            addBranding(brandingCard, generateLogo);
        }
        let advertRow = document.querySelector('.adverts__row');
        advertRow.appendChild(cardList);
        editionLink(host, cardsInfo.articles[0].edition, adType);
    });
}

export default function capiMultiple (adType, generateLogo) {
    enableToggles();
    retrieveCapiData()
        .then(capiData => buildFromCapi("www.theguardian.com", capiData, adType, generateLogo));
}
