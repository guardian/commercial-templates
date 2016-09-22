// Webfonts
import { getIframeId, getWebfonts, resizeIframeHeight } from '../_shared/js/messages.js';
import { write } from '../_shared/js/dom.js';

getIframeId()
.then(() => Promise.all([getWebfonts(), formatGimbap()]))
.then(resizeIframeHeight);

function formatGimbap() {
    // Retrieve DFP variables.
    let offerQuotes = ['[%Offer1Quotes%]', '[%Offer2Quotes%]', '[%Offer3Quotes%]',
        '[%Offer4Quotes%]'];
    let offerTones = ['[%Offer1Tone%]', '[%Offer2Tone%]', '[%Offer3Tone%]',
        '[%Offer4Tone%]'];
    let authorImage = '[%Offer1AuthorImage%]';
    let arrowLinks = '[%LinksWithArrows%]';

    // DOM mutations.
    return write(() => {

        // Adds quotes to title if set in DFP.
        Array.from(document.getElementsByClassName('gimbap__title')).forEach(insertQuotes);
        // Inserts appropriate SVG logos for certain tones.
        Array.from(document.getElementsByClassName('gimbap-logo')).forEach(insertLogo);
        // Adds author image if there is an author image URL present in DFP.
        if( authorImage.length ) insertAuthorImage(document.getElementsByClassName('gimbap')[0]);
        // Displays arrows if set in DFP.
        if( arrowLinks === 'yes' ) Array.from(document.getElementsByClassName('gimbap__arrow')).forEach(showArrow);

        function insertQuotes (title, adNumber) {
            if( offerQuotes[adNumber] === 'yes' ) {
                title.insertAdjacentHTML('afterbegin', quoteSvg);
            }
        }

        function insertLogo(logo, idx) {
            logo.insertAdjacentHTML('afterbegin', logoSvgs[offerTones[idx]]);
        }

        function insertAuthorImage(firstGimbap) {
            firstGimbap.classList.add('gimbap--has-author');
            firstGimbap.insertAdjacentHTML('afterbegin',
                `<img class="gimbap__author" src="${authorImage}" alt="">`);
        }

        function showArrow (arrow) {
            arrow.classList.add('gimbap__arrow--show');
        }
    });
}
