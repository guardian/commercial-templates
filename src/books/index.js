import config from '../_shared/js/config';
import { write } from '../_shared/js/dom';
import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages';

let container = document.getElementsByClassName('adverts__row')[0];

getIframeId()
.then(({ host }) => fetch('http://localhost:9000' + config.booksUrl))
.then(response => response.json())
.then(books => books.slice(0, '[%NumberofCards%]').map(createAdvert))
.then(html => Promise.all([
    getWebfonts(),
    write(() => container.innerHTML = html.join(''))
]))
.then(resizeIframeHeight);


/* Outputs the HTML for a book advert */
function createAdvert(book, index) {
    return `<a class="blink advert advert--book advert--prominent-${ index === 0 ? '[%IsProminent%]' : 'false'} ${ index > 1 ? 'hide-until-tablet' : '' }" href="%%CLICK_URL_UNESC%%${book.buyUrl}" data-link-name="">
        <div class="advert__image-container">
            <img class="advert__image" src="${book.jacketUrl}">
        </div>
        <div class="advert__text">
            <h2 class="blink__anchor advert__title" itemprop="name">${book.title}</h2>
            <div class="advert__meta">By ${book.author}</div>
            <div class="advert__meta">
                ${ book.price ? formatPrice(book.price) + '<br>' : '' }
                ${ book.offerPrice ? '<strong>Our price: ' + formatPrice(book.offerPrice) + '</strong>' : '' }
            </div>
            <span class="advert__more button button--small">
                Buy now
                ${arrowRight}
            </span>
        </div>
    </a>`;
}

function formatPrice(price) {
    return `<span>£${price.toFixed(2)}</span>`;
}
