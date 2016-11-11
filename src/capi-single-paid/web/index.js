import { enableToggles } from '../../_shared/js/ui';
import { write } from '../../_shared/js/dom';
import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks, onViewport } from '../../_shared/js/messages';
import { generatePicture, checkIcon } from '../../_shared/js/capi-images.js';
import { clickMacro, setEditionLink } from '../../_shared/js/ads';
import { URLSearchParams } from '../../_shared/js/utils';

let container = document.getElementsByClassName('adverts__body')[0];
let params = new URLSearchParams();
let keywords = '[%SeriesUrl%]';
let customUrl = '[%CustomUrl%]';

const GLABS_EDITION = {
    default: 'guardian-labs',
    au: 'guardian-labs-australia',
    us: 'guardian-labs-us'
};

if (customUrl !== '') {
  params.append('t', customUrl);
} else {
  params.append('k', keywords);
}

reportClicks();
enableToggles();
getIframeId()
.then(({ host }) => Promise.all([
    getWebfonts(),
    fetch(`https://api.nextgen.guardianapps.co.uk/commercial/api/capi-single.json?${params}`)
    .then(response => response.json())
    .then(json => populateCard(host, json))
    .then(html => write(() => container.innerHTML = html))
]))
.then(() => {
    let lastWidth;
    onViewport(({ width }) => {
        if( lastWidth !== width ) {
            resizeIframeHeight();
            lastWidth = width;
        }
    });
});

function getValue(value, fallback) {
    return value || fallback;
}

function populateCard(host, responseJson) {
    let icon = checkIcon(responseJson)
    setEditionLink(host, responseJson.edition, document.querySelector('.creative__glabs-link'));
    let imageUrl = '[%ArticleImage%]';

    return `<div class="adverts__row adverts__row--single">
      <a class="blink advert advert--large advert--capi advert--media advert--inverse advert--paidfor" href="${clickMacro}${getValue('[%ArticleUrl%]', responseJson.articleUrl)}" data-link-name="Offer | ${getValue('[%ArticleHeadline%]', responseJson.articleHeadline)}">
      <div class="advert__text">
        <h2 class="blink__anchor advert__title">
          ${icon}
          ${getValue('[%ArticleHeadline%]', responseJson.articleHeadline)}
        </h2>
        <div class="advert__standfirst">
            ${getValue('[%ArticleText%]', responseJson.articleText)}
        </div>
      </div>
      <div class="advert__image-container">${generatePicture({
          url: imageUrl || responseJson.articleImage.backupSrc,
          classes: ['advert__image'],
          sources: responseJson.articleImage.sources
      })}</div>
    </a>
    <a class="hide-until-mobile-landscape button button--large button--legacy-single" href="${clickMacro}${host}/[%SeriesUrl%]"  data-link-name="more">
      See more
      ${arrowRight}
    </a>
    </div>
    <div class="badge js-badge">
      Paid for by
      <a class="badge__link" href="${clickMacro}${responseJson.branding.sponsorLink}" data-link-name="badge">
        <img class="badge__logo" src="${getValue('[%BrandLogo%]', responseJson.branding.sponsorLogo.url)}" alt="">
      </a>
    </div>`;
}
