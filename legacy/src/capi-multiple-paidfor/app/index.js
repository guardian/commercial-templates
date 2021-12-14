import capiMultiple from './app-capi-multiple.js';
import { clickMacro } from '../../_shared/js/ads';

function generateLogo(logoUrl, brandUrl, customCSS) {
    return `<div class="badge ${customCSS || ''}">
        <div class="badge__label">Paid for by</div>
        <a class="badge__link" href="${clickMacro + brandUrl}">
            <img class="badge__logo" src="${logoUrl}" alt>
        </a>
    </div>`;
}

capiMultiple("paidfor", generateLogo);
