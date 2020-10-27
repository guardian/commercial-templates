import { getIframeId, getWebfonts, resizeIframeHeight, onViewport, reportClicks } from
    './messages.js';
import { write } from './dom.js';
import { enableToggles } from './ui.js';
import { generatePicture } from './capi-images.js';
import { clickMacro, setEditionLink } from './ads';
import { hideOnError, URLSearchParams } from './utils';

const ENDPOINT = 'https://api.nextgen.guardianapps.co.uk/commercial/api/capi-multiple.json';

const OVERRIDES = {
    urls: ['[%Article1URL%]', '[%Article2URL%]', '[%Article3URL%]', '[%Article4URL%]'],
    kickers: ['[%Article1Kicker%]', '[%Article2Kicker%]', '[%Article3Kicker%]', '[%Article4Kicker%]'],
    headlines: ['[%Article1Headline%]', '[%Article2Headline%]', '[%Article3Headline%]', '[%Article4Headline%]'],
    images: ['[%Article1Image%]', '[%Article2Image%]', '[%Article3Image%]', '[%Article4Image%]']
};

// Loads the card data from CAPI in JSON format.
function retrieveCapiData () {
    const params = new URLSearchParams();
    params.append('k', '[%SeriesURL%]');
    OVERRIDES.urls.forEach(url => {
        if (url !== '') {
            params.append('t', url);
        }
    });

    const debugElem = document.createElement("div");
    debugElem.id = 'endpoint-URL';
    debugElem.innerText = params;
    document.body.appendChild(debugElem);

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

    const cardTemplate = document.getElementById(`${adType}-card`);

    // Modern browsers.
    if (cardTemplate.content) {
        return document.importNode(cardTemplate.content, true);
    } else {

        // Internet Explorer doesn't support templates.
        const cardFragment = document.createDocumentFragment();
        const tempDiv = document.createElement('div');

        tempDiv.innerHTML = cardTemplate.innerHTML;
        while (tempDiv.firstChild) cardFragment.appendChild(tempDiv.firstChild);
        return cardFragment;
    }
}

function buildLogo(card, cardNumber, cardsInfo, generateLogo) {
    if (cardsInfo.isSingle) return;

    const cardInfo = cardsInfo.articles[cardNumber];
    if (cardInfo.branding) {
        let logo = generateLogo(cardInfo.branding.logo.src, cardInfo.branding.logo.link, 'badge--branded');
        card.insertAdjacentHTML('beforeend', logo);
    }
}

// Constructs an individual card.
function buildCard (cardInfo, cardNum, adType, cardsInfo, generateLogo) {

    const cardFragment = importCard(adType);
    const card = cardFragment.querySelector(`.advert--${adType}`);
    const imgContainer = card.querySelector('.advert__image-container');

    buildTitle(card, cardInfo, cardNum);
    buildLogo(card, cardNum, cardsInfo, generateLogo);
    card.href = clickMacro + cardInfo.articleUrl;

    const image = generatePicture({
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
    const logoContainer = document.querySelector('.js-logo-container');
    const logoUrl = brandingCard.branding && brandingCard.branding.logo.src;
    const sponsorLink = brandingCard.branding && brandingCard.branding.logo.link;

    if (logoContainer && logoUrl) {
      logoContainer.insertAdjacentHTML('beforeend', generateLogo(logoUrl, sponsorLink));
    } else {
      // TODO: fail gracefully and maybe give a nice debug message
    }
}

// Sets correct glabs link based on edition (AU/All others).
function editionLink (host, edition, adType) {

    if (adType === "paidfor") {
        setEditionLink(host, edition, document.querySelector('.adverts__stamp a'));
    }

}

// Uses cAPI data to build the ad content.
function buildFromCapi (host, cardsInfo, adType, generateLogo) {
    const debugElem = document.createElement("div");
    debugElem.id = 'build-from-capi';
    debugElem.innerText = cardsInfo;
    document.body.appendChild(debugElem);


    const cardList = document.createDocumentFragment();

    cardsInfo.isSingle = adType === 'hosted' || cardsInfo.articles
        .map(cardInfo => cardInfo.branding && cardInfo.branding.logo.src)
        .reduce(((isSingle, url, index, urls) => isSingle && (index === 0 || url === urls[index - 1])), true);

    // Constructs an array of cards from an array of data.
    cardsInfo.articles.forEach((info, idx) => {
        cardList.appendChild(buildCard(info, idx, adType, cardsInfo, generateLogo));
    });

    return write(() => {
        // Takes branding from last possible card, in case earlier ones overridden.
        var brandingCard = cardsInfo.articles.slice(-1)[0];
        if( cardsInfo.isSingle ) {
            addBranding(brandingCard, generateLogo);
        }
        let advertRow = document.querySelector('.adverts__row');
        advertRow.appendChild(cardList);
        editionLink(host, cardsInfo.articles[0].edition, adType);
    });
}

export default function capiMultiple (adType, generateLogo) {
    let lastWidth;

    enableToggles();

    return getIframeId()
    .then(({ host }) => Promise.all([
        reportClicks(),
        getWebfonts(),
        retrieveCapiData()
        .then(capiData => buildFromCapi(host, capiData, adType, generateLogo))
    ]))
    .then(() => {
        const debugElem = document.createElement("div");
        debugElem.id = 'all-promises-success';
        document.body.appendChild(debugElem);

        onViewport(({ width }) => {
            if( width != lastWidth ) {
                resizeIframeHeight();
                lastWidth = width;
            }
        });
    })
    .catch( error => hideOnError(error, `capi-multiple-${adType}`));
}
