import config from '../_shared/js/config';
import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages';
import { write } from '../_shared/js/dom';
import { portify } from '../_shared/js/dev';

const cardContainer = document.getElementsByClassName("adverts__row")[0];

getIframeId()
  .then(({host}) => fetch(`${portify(host)}${config.soulmatesUrl}`))
  .then(response => response.json())
  .then(soulmates => soulmates.map(createSoulmateCard))
  .then(cards => Promise.all([addSoulmatesCards(cards), getWebfonts()]))
  .then(resizeIframeHeight);

function createSoulmateCard(soulmate, index) {

  return `<a class="advert advert--soulmate blink" href="%%CLICK_URL_ESC%%${soulmate.profilePhoto}" data-link-name="merchandising-soulmates-v2_2_2014-03-28-profile-${soulmate.gender}">
      <h2 class="advert__title u-text-hyphenate blink__anchor" itemprop="name">${soulmate.username}</h2>
      <div class="advert__image-container">
        <img class="advert__image" src="${soulmate.profilePhoto}" />
      </div>
      <div class="advert__meta">${soulmate.age}, ${soulmate.location}</div>
    </a>`;
}

function addSoulmatesCards(cards) {
  return write(() => cardContainer.insertAdjacentHTML('afterbegin', cards.join('')));
}
