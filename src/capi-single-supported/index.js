import { enableToggles } from '../_shared/js/ui';
import { write } from '../_shared/js/dom';
import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages';
import { insertImage, checkIcon } from '../_shared/js/capi-images.js';

let container = document.getElementsByClassName('adverts--supported')[0];
let params = new URLSearchParams();
let keywords = '[%SeriesUrl%]';
let customUrl = '[%CustomUrl%]';

if (customUrl !== '') {
  params.append('t', customUrl);
} else {
  params.append('k', keywords);
};

enableToggles();
getIframeId()
.then(() => fetch(`https://api.nextgen.guardianapps.co.uk/commercial/api/capi-single.json?${params}`))
.then(response => response.json())
.then(capiData => [capiData.articleImage, populateCard(capiData)])
.then(([imageInfo, html]) => Promise.all([getWebfonts(['GuardianTextSansWeb', 'GuardianSansWeb']), write(() => container.innerHTML = html)]).then(() => addImage(imageInfo)))
.then(resizeIframeHeight);

function getValue(value, fallback) { return value || fallback; }

// Adds the ad image to the page.
function addImage (imageInfo) {

  return write(() => {

    let imageContainer = document.querySelector('.advert__image-container');
    insertImage(imageContainer, imageInfo, '[%ArticleImage%]');

  });

}

/* Outputs the HTML */
function populateCard(responseJson) {
    let icon = checkIcon(responseJson)

    return`<header class="adverts__header">
      <h1 class="adverts__title">
        <a class="adverts__logo blink" href="%%CLICK_URL_UNESC%%https://theguardian.com/[%SeriesUrl%]" data-link-name="header link">
          [%ComponentTitle%]
        </a>
      </h1>
      <div class="adverts__badge adverts__badge--alt js-badge">
        Supported by
        <a class="adverts__badge__link" href="[%SeriesUrl%]%%" data-link-name="logo link">
        <img class="adverts__badge__logo" src="${getValue('[%BrandLogo%]', responseJson.branding.sponsorLogo.url)}" alt="">
      </a>
      <a href="%%CLICK_URL_ESC%%http://theguardian.com/about" class="adverts__badge__help" data-link-name="about link">
        About this content
      </a>
      </div>
    </header>
    <div class="adverts__body">
    <div class="adverts__row adverts__row--single">
      <a class="blink advert advert--large advert--capi advert--media advert--inverse advert--supported" href="%%CLICK_URL_UNESC%%${getValue('[%ArticleUrl%]', responseJson.articleUrl)}" data-link-name="merchandising | capi | single | [%TrackingId%]">
        <div class="advert__text">
          <h2 class="blink__anchor advert__title">
            ${icon}
            ${getValue('[%ArticleHeadline%]', responseJson.articleHeadline)}
          </h2>
          <p class="advert_standfirst">
            ${getValue('[%ArticleText%]', responseJson.articleText)}
          </p>
        </div>
        <div class="advert__image-container"></div>
      </a>
      <a class="hide-until-mobile-landscape button button--primary button--large button--legacy-single" href="%%CLICK_URL_ESC%%[%SeriesUrl%]"  data-link-name="merchandising-single-more">
        See more
        ${arrowRight}
      </a>
    </div>
    </div>`;
}
