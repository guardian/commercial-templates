import capiMultiple from '../../_shared/js/capi-multiple.js';
import { clickMacro } from '../../_shared/js/ads';

function generateLogo(logoUrl, brandUrl, customCSS) {
    return `<div class="badge ${customCSS || ''}">
        Paid for by
        <a class="badge__link" href="${clickMacro + brandUrl}">
            <img class="badge__logo" src="${logoUrl}" alt>
        </a>
    </div>`;
}

capiMultiple("paidfor", generateLogo);
