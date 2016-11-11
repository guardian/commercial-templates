import { write } from '../../_shared/js/dom';
import { getIframeId, getWebfonts, resizeIframeHeight, reportClicks, onViewport } from '../../_shared/js/messages';
import { generatePicture, checkIcon } from '../../_shared/js/capi-images';
import { URLSearchParams } from '../../_shared/js/utils';

let container = document.getElementsByClassName('adverts__body')[0];
let header = document.getElementsByClassName('badge__link')[0];
let params = new URLSearchParams();
let keywords = '[%SeriesUrl%]';
let customUrl = '[%CustomUrl%]';

if (customUrl !== '') {
  params.append('t', customUrl);
} else {
  params.append('k', keywords);
};

reportClicks();
getIframeId()
.then(() => fetch(`https://api.nextgen.guardianapps.co.uk/commercial/api/capi-single.json?${params}`))
.then(response => response.json())
.then(capiData => [populateLogo(capiData), populateCard(capiData)])
.then(([logo, body]) => Promise.all([getWebfonts(), write(() => header.innerHTML = logo, container.innerHTML = body)]))
.then(() => {
    let lastWidth;
    onViewport(({ width }) => {
        if( width !== lastWidth ) {
            resizeIframeHeight();
            lastWidth = width;
        }
    });
});

function getValue(value, fallback) { return value || fallback; }

function populateLogo(responseJson) {
  return `<img class="badge__logo" src="${getValue('[%BrandLogo%]', responseJson.branding.sponsorLogo.url)}" alt="">`;
}


/* Outputs the HTML */
function populateCard(responseJson) {
    let icon = checkIcon(responseJson);
    let imageUrl = '[%ArticleImage%]';

    return `<div class="adverts__row adverts__row--single">
      <a class="blink advert advert--large advert--capi advert--media advert--inverse advert--supported" href="%%CLICK_URL_UNESC%%${getValue('[%ArticleUrl%]', responseJson.articleUrl)}" data-link-name="Offer | ${getValue('[%ArticleHeadline%]', responseJson.articleHeadline)}">
        <div class="advert__text">
          <h2 class="blink__anchor advert__title">
            ${icon}
            ${getValue('[%ArticleHeadline%]', responseJson.articleHeadline)}
          </h2>
          <p class="advert__standfirst">
            ${getValue('[%ArticleText%]', responseJson.articleText)}
          </p>
        </div>
        <div class="advert__image-container">${generatePicture({
            url: imageUrl || responseJson.articleImage.backupSrc,
            classes: ['advert__image'],
            sources: responseJson.articleImage.sources
        })}</div>
      </a>
      <a class="hide-until-mobile-landscape button button--primary button--large button--legacy-single" href="%%CLICK_URL_UNESC%%https://theguardian.com/[%SeriesUrl%]"  data-link-name="merchandising-single-more">
        See more
        ${arrowRight}
      </a>
    </div>`;
}
