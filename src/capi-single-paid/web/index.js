import { enableToggles } from '../_shared/js/ui';
import { write } from '../_shared/js/dom';
import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks } from '../_shared/js/messages';
import { insertImage, checkIcon } from '../_shared/js/capi-images.js';
import { setEditionLink } from '../_shared/js/ads';
import { URLSearchParams } from '../_shared/js/utils';

let container = document.getElementsByClassName('adverts__body')[0];
let params = new URLSearchParams();
let keywords = '[%SeriesUrl%]';
let customUrl = '[%CustomUrl%]';

const GLABS_EDITION = {
    default: 'https://theguardian.com/guardian-labs',
    au: 'https://theguardian.com/guardian-labs-australia',
    us: 'https://theguardian.com/guardian-labs-us'
};

if (customUrl !== '') {
  params.append('t', customUrl);
} else {
  params.append('k', keywords);
}

reportClicks();
enableToggles();
getIframeId()
.then(() => fetch(`https://api.nextgen.guardianapps.co.uk/commercial/api/capi-single.json?${params}`))
.then(response => response.json())
.then(capiData => [capiData.articleImage, populateCard(capiData)])
.then(([imageInfo, html]) => Promise.all([getWebfonts(), write(() => container.innerHTML = html)]).then(() => addImage(imageInfo)))
.then(() => resizeIframeHeight());

function getValue(value, fallback) { return value || fallback; }

function glabsLink(responseJson) {
  let logo = document.getElementsByClassName('creative__glabs-link')[0];

  responseJson.edition === "AU" ?
      logo.href = GLABS_EDITION.au:
  responseJson.edition === "US" ?
      logo.href = GLABS_EDITION.us:
      logo.href = GLABS_EDITION.default;
}

// Adds the ad image to the page.
function addImage (imageInfo) {

  return write(() => {

    let imageContainer = document.querySelector('.advert__image-container');
    insertImage(imageContainer, imageInfo, ['advert__image'],
      '[%ArticleImage%]');

  });

}

function populateCard(responseJson) {
    let icon = checkIcon(responseJson)
    setEditionLink(responseJson.edition, document.querySelector('.creative__glabs-link'));


    return `<div class="adverts__row adverts__row--single">
      <a class="blink advert advert--large advert--capi advert--media advert--inverse advert--paidfor" href="%%CLICK_URL_UNESC%%${getValue('[%ArticleUrl%]', responseJson.articleUrl)}" data-link-name="Offer | ${getValue('[%ArticleHeadline%]', responseJson.articleHeadline)}">
      <div class="advert__text">
        <h2 class="blink__anchor advert__title">
          ${icon}
          ${getValue('[%ArticleHeadline%]', responseJson.articleHeadline)}
        </h2>
        <div class="advert__standfirst">
            ${getValue('[%ArticleText%]', responseJson.articleText)}
        </div>
      </div>
      <div class="advert__image-container"></div>
    </a>
    <a class="hide-until-mobile-landscape button button--large button--legacy-single" href="%%CLICK_URL_UNESC%%https://theguardian.com/[%SeriesUrl%]"  data-link-name="more">
      See more
      ${arrowRight}
    </a>
    </div>
    <div class="badge js-badge">
      Paid for by
      <a class="badge__link" href="" data-link-name="badge">
        <img class="badge__logo" src="${getValue('[%BrandLogo%]', responseJson.branding.sponsorLogo.url)}" alt="">
      </a>
    </div>`;
}