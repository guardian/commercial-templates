import { write } from '../../_shared/js/dom';
import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks, onViewport } from '../../_shared/js/messages';
import { getApiBaseUrl } from '../../_shared/js/dev';
import { URLSearchParams } from '../../_shared/js/utils';

let container = document.getElementsByClassName('adverts__body')[0];

let params = new URLSearchParams();
params.append('t', '[%ISBN%]');

reportClicks();
getIframeId()
.then(({ host, preview }) => fetch(`${getApiBaseUrl(host, preview)}/commercial/books/api/book.json?${params}`))
.then(response => response.json())
.then(createAdvert)
.then(html => Promise.all([getWebfonts(), write(() => container.innerHTML = html)]))
.then(() => {
    let lastWidth;
    onViewport(({ width }) => {
        if( width !== lastWidth ) {
            lastWidth = width;
            resizeIframeHeight();
        }
    });
});

function createAdvert(book) {

  return `<a class="blink advert advert--inline" href="%%CLICK_URL_ESC%%${book.buyUrl}" data-link-name="${book.isbn}-${book.author}-${book.title}" target="_top">
        <div class="advert__image-container">
            ${displayPicture(book.jacketUrl)}
        </div>
        <h2 class="advert__title blink__anchor">${book.title}</h2>
        <div class="advert__meta">
            ${book.author},
        </div>
        <div class="advert__meta">
            ${displayPrice(book.price)}
            ${displayOurPrice(book.offerPrice)}
        </div>
        <span class="advert__more button button--small button--primary">
            Buy now ${arrowRightSvg}
        </span>
    </a>`;
}

function displayPrice(price) {
    return price ? `RRP £${price.toFixed(2)}<br>` : '';
}

function displayOurPrice(price) {
    return price ? `<strong class="tone-book-highlight">Our price: £${price.toFixed(2)}</strong>` : '';
}

function displayPicture(picture) {
    return picture ? `<img class="advert__image" src="${picture}" alt>` : '';
}
