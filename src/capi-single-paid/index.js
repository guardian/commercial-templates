// import config from '../_shared/js/config';
// import { write } from '../_shared/js/dom';
// import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages';
//
// let container = document.getElementsByClassName('adverts__row');
// let params = new URLSearchParams();
// params.append('keywords', keywords);
// params.append('t', shortUrl);
//
// getIframeId()
// .then(() => getWebfonts())
// .then(() => fetch(host + config.capiSingleUrl + params))
// .then(response => response.json())
// .then(capiData => capiData.map(populateCard))
// .then(html => write(() => container.innerHTML = html.join('')))
// .then(resizeIframeHeight);
//
// function getValue([dfpValue, capiValue]) {
//    return dfpValue || capiValue
// }
//
// /* Outputs the HTML for a travel advert */
// function populateCard(capiData) {
//
//   var overrideData = [
//      ['[%ArticleHeadline%]', capiData.articleHeadline],
//      ['[%ArticleUrl%]', capiData.articleUrl],
//      ['[%ArticleText%]', capiData.articleHeadline],
//      ['[%ArticleImage%]', capiData.articleHeadline]
//   ].map(getValue)
//
//     return `<a class="blink advert advert--large advert--capi advert--media advert--inverse advert--paidfor" href="%%CLICK_URL_UNESC%%${overrideData[1]} data-link-name="merchandising | capi | single">
//       <div class="advert__text">
//         <h2 class="blink__anchor advert__title">${overrideData[0]}</h2>
//         <p class="advert_standfirst">${overrideData[2]}</p>
//       </div>
//       <div class="advert__image-container">
//         <img class="advert__image" src="${overrideData[3]}" alt>
//       </div>
//     </a>
//     <a class="hide-until-mobile-landscape button button--primary button--large button--legacy-single" href="%%CLICK_URL_UNESC%%https://theguardian.com/[%SeriesUrl%]"  data-link-name="merchandising-single-more">
//       [%ViewAll%]
//       {{#svg}}arrow-right{{/svg}}
//     </a>`;
//   }
//
// function checkEdition{}
//
// function checkIcon{}
