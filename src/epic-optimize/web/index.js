import { areImagesLoaded, isDocumentLoaded } from '../../_shared/js/messages';
import {timeout} from "../../_shared/js/impl/promises";
import {read} from "../../_shared/js/dom";

function enrichClickThroughURL() {

    const button = document.querySelector('.js-epic-single-button');
    if (!button) {
        return;
    }

    let clickThroughUrl;
    try {
        clickThroughUrl = new URL(button.href);
    } catch (_) {
        return;
    }

    let referrerPageViewId;
    let referrerUrl;
    try {
        const optimizeEpicUrl = new URL(window.location.href);
        referrerPageViewId = optimizeEpicUrl.searchParams.get('pvid');
        referrerUrl = optimizeEpicUrl.searchParams.get('url')
    } catch(_) {}
    
    let acquisitionData;
    try {
        acquisitionData = JSON.parse(clickThroughUrl.searchParams.get('acquisitionData'));
    } catch (_) {
        acquisitionData = {};
    }

    const inferredAcquisitionData = {
        componentType: 'ACQUISITIONS_EPIC',
        componentId: 'optimize_epic',
        referrerPageViewId: referrerPageViewId,
        referrerUrl: referrerUrl,
        source: 'GUARDIAN_WEB',
    };

    // Argument ordering ensures pre-existing acquisition data takes precedence over inferred data.
    const updatedAcquisitionData = Object.assign({}, inferredAcquisitionData, acquisitionData);

    // Acquisition data percent encoded by set() method
    clickThroughUrl.searchParams.set('acquisitionData', JSON.stringify(updatedAcquisitionData));
    button.href = clickThroughUrl.toString();
}

// Taken from https://github.com/guardian/frontend/blob/master/static/src/javascripts/lib/geolocation.js
// function getCurrencySymbolForCountryCode(countryCode) {
//     const countryGroups: CountryGroups = {
//         GBPCountries: {
//             name: 'United Kingdom',
//             currency: 'GBP',
//             countries: ['GB', 'FK', 'GI', 'GG', 'IM', 'JE', 'SH'],
//             supportInternationalisationId: 'uk',
//         },
//         UnitedStates: {
//             name: 'United States',
//             currency: 'USD',
//             countries: ['US'],
//             supportInternationalisationId: 'us',
//         },
//         AUDCountries: {
//             name: 'Australia',
//             currency: 'AUD',
//             countries: ['AU', 'KI', 'NR', 'NF', 'TV'],
//             supportInternationalisationId: 'au',
//         },
//         EURCountries: {
//             name: 'Europe',
//             currency: 'EUR',
//             countries: ['AD', 'AL', 'AT', 'BA', 'BE', 'BG', 'BL', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FO', 'FR',
//             'GF', 'GL', 'GP', 'GR', 'HR', 'HU', 'IE', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'ME', 'MF', 'IS', 'MQ', 'MT', 'NL',
//             'NO', 'PF', 'PL', 'PM', 'PT', 'RE', 'RO', 'RS', 'SE', 'SI', 'SJ', 'SK', 'SM', 'TF', 'TR', 'WF', 'YT', 'VA', 'AX'],
//             supportInternationalisationId: 'eu',
//         },
//         International: {
//             name: 'International',
//             currency: 'USD',
//             countries: ['AE', 'AF', 'AG', 'AI', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AW', 'AZ', 'BB', 'BD', 'BF', 'BH', 'BI', 'BJ', 'BM',
//             'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CC', 'CD', 'CF', 'CG', 'CI', 'CL', 'CM', 'CN', 'CO', 'CR',
//             'CU', 'CV', 'CW', 'CX', 'DJ', 'DM', 'DO', 'DZ', 'EC', 'EG', 'EH', 'ER', 'ET', 'FJ', 'FM', 'GA', 'GD', 'GE', 'GH', 'GM',
//             'GN', 'GQ', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HT', 'ID', 'IL', 'IN', 'IO', 'IQ', 'IR', 'JM', 'JO', 'JP',
//             'KE', 'KG', 'KH', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LK', 'LR', 'LS', 'LY', 'MA', 'MD', 'MG',
//             'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MR', 'MS', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI',
//             'NP', 'NU', 'OM', 'PA', 'PE', 'PG', 'PH', 'PK', 'PN', 'PR', 'PS', 'PW', 'PY', 'QA', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD',
//             'SG', 'SL', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN',
//             'TO', 'TT', 'TW', 'TZ', 'UA', 'UG', 'UM', 'UY', 'UZ', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WS', 'YE', 'ZA', 'ZM', 'ZW'],
//             supportInternationalisationId: 'int',
//         },
//         NZDCountries: {
//             name: 'New Zealand',
//             currency: 'NZD',
//             countries: ['NZ', 'CK'],
//             supportInternationalisationId: 'nz',
//         },
//         Canada: {
//             name: 'Canada',
//             currency: 'CAD',
//             countries: ['CA'],
//             supportInternationalisationId: 'ca',
//         },
//     };

//     const availableCountryGroups = Object.keys(countryGroups);
//     const countryGroup = availableCountryGroups.find(cg => countryGroups[cg].countries.includes(countryCode));
//     if (!countryGroup) {
//         return;
//     }

//     const extendedCurrencySymbol = {
//         GBPCountries: '£',
//         UnitedStates: '$',
//         AUDCountries: '$',
//         Canada: 'CA$',
//         EURCountries: '€',
//         NZDCountries: 'NZ$',
//         International: '$',
//     };

//     return extendedCurrencySymbol[countryGroup];
// }

// function changeCurrencySymbolBasedOnLocation() {
//     const currencySymbol = document.querySelector('.js-currency-symbol');
//     if (!currencySymbol) {
//       return;
//     }

//     const countryCode = getDataAttribute('country-code');
//     if (!countryCode) {
//         return;
//     }

//     const currency = getCurrencySymbolForCountryCode(countryCode);
//     if (!currency) {
//         return;
//     }

//     currencySymbol.innerHTML = currency;
// }

// addEncodedReferrerUrlToClickThroughLink()
// changeCurrencySymbolBasedOnLocation()

// channel for messages between Optimize Epic and Guardian frontend
const OPTIMIZE_EPIC_CHANNEL = 'OPTIMIZE_EPIC';

// messages in this channel (incoming / outgoing) should have the following schema:
// { channel: 'OPTIMIZE_EPIC', messageType: string, data: ?any }

// outgoing event types
const EPIC_INITIALIZED = 'EPIC_INITIALIZED';
const EPIC_HEIGHT = 'EPIC_HEIGHT';

// incoming event types
const RESIZE_TRIGGERED = 'RESIZE_TRIGGERED';

function postMessage(messageType, data) {
    // TODO: target origin
    window.top.postMessage(JSON.stringify({ channel: OPTIMIZE_EPIC_CHANNEL, messageType, data }), '*');
}

function getIframeHeight() {
    // TODO: think about failure case
    return timeout(Promise.all(areImagesLoaded().concat(isDocumentLoaded())), 3000)
        .then(() => read(() => document.querySelector('.js-root-element').getBoundingClientRect().height))
}

function postIframeHeightMessage() {
    getIframeHeight().then(height => postMessage(EPIC_HEIGHT, { height }));
}

function postEpicInitializedMessage() {
    postMessage(EPIC_INITIALIZED);
}

function startCommunication() {
    self.addEventListener('message', function(event) {
        let data;
        try {
            data = JSON.parse(event.data);
        } catch (_) {
            return;
        }
        if (data.channel === OPTIMIZE_EPIC_CHANNEL && data.messageType === RESIZE_TRIGGERED) {
            console.log('got RESIZE_TRIGGERED message inside epic');
            postIframeHeightMessage();
        }
    });

    postMessage(EPIC_INITIALIZED);
}

function init() {
    enrichClickThroughURL();
    startCommunication();
}

init();
