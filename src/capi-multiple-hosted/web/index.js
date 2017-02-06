import capiMultiple from '../../_shared/js/capi-multiple.js';
import addColourContrastClass from '../../_shared/js/hosted-colours.js';


function generateLogo(logoUrl) {
    return `<div class="hostedbadge">
            <p class="hostedbadge__info" style="background-color: [%BrandColour%];">Advertiser content</p>
            <img class="hostedbadge__logo" src="${logoUrl}" alt="">
        </div>`
}


capiMultiple("hosted", generateLogo)
    .then(() => addColourContrastClass());
