import config from '../_shared/js/config';
import { write } from '../_shared/js/dom';
import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages';

let container = document.getElementsByClassName('adverts__row')[0];

getIframeId()
.then(() => getWebfonts())
.then(() => fetch(host + config.travelUrl))
.then(response => response.json())
.then(offers => offers.slice(0, '[%NumberofCards%]').map(createAdvert))
.then(html => write(() => container.innerHTML = html.join('')))
.then(resizeIframeHeight);


/* Outputs the HTML for a travel advert */
function createAdvert(offer, index) {
    return `<a class="blink advert advert--travel advert--prominent-${ index === 0 ? '[%IsProminent%]' : 'false'} ${ index > 1 ? 'hide-until-tablet' : '' }" href="%%CLICK_URL_UNESC%%${offer.offerUrl}" data-link-name="">
        <div class="advert__image-container">
            <img class="advert__image" src="${offer.imageUrl}">
        </div>
        <div class="advert__text">
            <h2 class="blink__anchor advert__title" itemprop="name">${offer.title}</h2>
            <div class="advert__meta">
                ${formatDuration(offer.duration)} from <strong class="advert__price">${formatPrice(offer.fromPrice)}</strong>
            </div>
            <span class="advert__more button button--small">
                See more
                ${arrowRight}
            </span>
        </div>
    </a>`;
}

function formatDuration(duration) {
    return `${duration} night${duration > 1 ? 's' : ''}`;
}

function formatPrice(price) {
    return `£${(price / 100).toFixed(2)}`;
}
