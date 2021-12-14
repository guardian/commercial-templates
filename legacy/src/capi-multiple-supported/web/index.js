import capiMultiple from '../../_shared/js/capi-multiple.js';
import { clickMacro } from '../../_shared/js/ads';


function generateLogo(logoUrl, brandUrl, customCSS) {
    return `<div class="badge ${customCSS || ''}">
            Supported by
            <a class="badge__link" href="${clickMacro}https://theguardian.com/[%SeriesURL%]" data-link-name="badge" target="_top">
                <img class="badge__logo" src="${logoUrl}" alt="">
            </a>
            <a href="%%CLICK_URL_UNESC%%https://www.theguardian.com/sponsored-content" class="blink badge__help" data-link-name="about" target="_top">About this content</a>
        </div>`
}

capiMultiple("supported", generateLogo);
