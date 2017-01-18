import capiMultiple from '../../_shared/js/capi-multiple.js';
import { clickMacro } from '../../_shared/js/ads';

const OVERRIDES = {
    logos: ['[%Article1Logo%]', '[%Article2Logo%]', '[%Article3Logo%]', '[%Article4Logo%]'],
    links: ['[%Article1LogoUrl%]', '[%Article2LogoUrl%]', '[%Article3LogoUrl%]', '[%Article4LogoUrl%]']
};

function buildLogo(card, cardNumber, cardInfo) {
    let logoUrl = cardInfo.logoUrl || OVERRIDES.logos[cardNumber];
    let brandUrl = cardInfo.brandUrl || OVERRIDES.links[cardNumber];

    if( !logoUrl || !brandUrl ) return;

    card.insertAdjacentHTML('beforeend', generateLogo(logoUrl, brandUrl));
}

function generateLogo(logoUrl, brandUrl) {
    return `<div class="badge badge--branded">
        Paid for by
        <a class="badge__link" href="${clickMacro + brandUrl}">
            <img class="badge__logo" src="${logoUrl}" alt>
        </a>
    </div>`;
}

capiMultiple("paidfor", buildLogo);
