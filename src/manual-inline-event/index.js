import { write } from '../_shared/js/dom';
import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks } from '../_shared/js/messages';
import { getApiBaseUrl } from '../_shared/js/dev';
import { formatPrice, formatDuration } from '../_shared/js/utils';
import { generatePicture } from '../_shared/js/capi-images';

let container = document.getElementsByClassName('adverts__body')[0];

let params = new URLSearchParams();
params.append('t', '[%EventId%]');

reportClicks();
getIframeId()
.then(({ host, preview }) => fetch(`${getApiBaseUrl(host, preview)}/commercial/api/liveevent.json?${params}`, {mode: 'cors'}))
.then(response => response.json())
.then(createAdvert)
.then(html => Promise.all([getWebfonts(), write(() => container.innerHTML = html)]))
.then(() => resizeIframeHeight())

function createAdvert(event) {

  let lastFew = event.ratioTicketsLeft <= 0.1 ? '<div class="advert__meta advert__meta--scarcity">Last few tickets remaining</div>' : '';

  return `<a class="blink advert advert--inline advert--brand" href="%%CLICK_URL_ESC%%${event.eventUrl}" data-link-name="${event.eventId}-${event.name}">
        <div class="advert__image-container">
            ${generatePicture(event.image, ["advert__image"])}
        </div>
        <h2 class="advert__title blink__anchor">${event.name}</h2>
        <div class="advert__meta">
            ${event.date}, ${event.venue.name}, ${event.venue.city ? event.venue.city : event.venue.country}
        </div>
        ${lastFew}
        <div class="advert__standfirst">
            <strong>${displayPriceRange(event.tickets)}</strong>
        </div>
        <span class="advert__more button button--small button--primary">
            Book now ${arrowRightSvg}
        </span>
    </a>`;
}

function displayPriceRange(tickets) {

  let prices = tickets.map(ticket => ticket.price);
  let [low, high] = [Math.min(...prices), Math.max(...prices)];

  let format = (price) => `£${price.toFixed(2)}`;

  return (low === high) ? format(low) : `${format(low)} to ${format(high)}`;
}
