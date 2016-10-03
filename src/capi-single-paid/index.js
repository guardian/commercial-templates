import { enableToggles } from '../_shared/js/ui.js';
import { write } from '../_shared/js/dom';
import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages';
import { addSourceset, insertBetweenComments, checkIcon } from '../_shared/js/images.js';

let container = document.getElementsByClassName('adverts__body')[0];
let params = new URLSearchParams();
let keywords = '[%SeriesUrl%]';
let customUrl = '[%CustomUrl%]';

if (customUrl !== '') {
  params.append('t', customUrl);
} else {
  params.append('k', keywords);
}

enableToggles();
getIframeId()
.then(() => fetch(`https://api.nextgen.guardianapps.co.uk/commercial/api/capi-single.json?${params}`))
.then(response => response.json())
.then(capiData => [addSourceset(capiData.articleImage.sources), populateCard(capiData)])
.then(([sources, html]) => Promise.all([getWebfonts(['GuardianTextSansWeb', 'GuardianSansWeb']), write(() => container.innerHTML = html)]).then(() => insertBetweenComments(sources)))
.then(resizeIframeHeight);

function getValue(value, fallback) { return value || fallback; }

/* Outputs the HTML for a travel advert */
function populateCard(responseJson) {
    let icon = checkIcon(responseJson)

    return `<div class="adverts__row adverts__row--single">
      <a class="blink advert advert--large advert--capi advert--media advert--inverse advert--paidfor" href="%%CLICK_URL_UNESC%%${getValue('[%ArticleUrl%]', responseJson.articleUrl)}" data-link-name="merchandising | capi | single">
      <div class="advert__text">
        <h2 class="blink__anchor advert__title">
          ${icon}
          ${getValue('[%ArticleHeadline%]', responseJson.articleHeadline)}
        </h2>
        <div class="advert__standfirst">
            ${getValue('[%ArticleText%]', responseJson.articleText)}
        </div>
      </div>
      <div class="advert__image-container">
        <picture>
          <img class="advert__image" src="${getValue('[%ArticleImage%]', responseJson.articleImage.backupSrc)}" alt="">
        </picture>
      </div>
    </a>
    <a class="hide-until-mobile-landscape button button--large button--legacy-single" href="%%CLICK_URL_UNESC%%https://theguardian.com/[%SeriesUrl%]"  data-link-name="merchandising-single-more">
      See more
      ${arrowRight}
    </a>
    </div>
    <div class="adverts__badge js-badge">
      Paid for by
      <a class="adverts__badge__link" href="" data-link-name="logo link">
        <img class="adverts__badge__logo" src="${getValue('[%BrandLogo%]', responseJson.branding.sponsorLogo.url)}" alt="">
      </a>
    </div>`;
}
