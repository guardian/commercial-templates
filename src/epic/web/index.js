import { getIframeId, getWebfonts, onViewport, resizeIframeHeight } from '../../_shared/js/messages';

// Expects all data required by the javascript in this file
// to be included as data attributes on an element with class name js-dfp-data.
// To get the value of the attribute e.g. data-referrer-url the name parameter should be referrer-url.
function getDataAttribute(name) {
    try {
        return document.getElementsByClassName('js-dfp-data')[0].getAttribute('data-' + name)
    } catch (_) {
        return;
    }
}

// This function gets the referrer url from a data attribute on the Epic button,
// percent encodes the url, and adds it to the acquisitionData GET parameter (acquisition data).
//
// Why is this needed?
// -------------------
// The url of the referring page can be obtained from the %%PATTERN:url%% DFP macro,
// however, this is not percent encoded, and there are known instances where it being
// unescaped prevents the acquisition data being deserialised by support frontend
// e.g. if the referrer url contains a fragment identifier (#)
//
// Why not use the [%URI_ENCODE:variable%] DFP macro?
// --------------------------------------------------
// It only works with variables that are defined in the Native Ad Format; url is not one of these.
//
// Why include the unescaped referrer url as a data attribute and not in the acquisition data?
// -------------------------------------------------------------------------------------------
// If it is included as an unescaped field in the acquisition data and this function call fails,
// then potentially support frontend would not be able to deserialise the acquisition data
// (see previous question for more details).
function addEncodedReferrerUrlToClickThroughLink() {

    const buttons = document.getElementsByClassName('js-epic-single-button');
    if (buttons.length === 0) {
        return;
    }
    const button = buttons[0];

    const href = button.href;
    if (!href) {
        return;
    }

    const referrerUrl = getDataAttribute('referrer-url');
    if (!referrerUrl) {
        return;
    }

    let url;
    try {
        url = new URL(href);
    } catch (_) {
        return;
    }

    let rawAcquisitionData = url.searchParams.get('acquisitionData');
    if (!rawAcquisitionData) {
        return;
    }

    let acquisitionData;
    try {
        acquisitionData = JSON.parse(rawAcquisitionData);
    } catch (_) {
        return;
    }

    acquisitionData['referrerUrl'] = referrerUrl;

    // Acquisition data percent encoded by set() method
    url.searchParams.set('acquisitionData', JSON.stringify(acquisitionData));
    button.href = url.toString();
}

// Taken from https://github.com/guardian/frontend/blob/master/static/src/javascripts/lib/geolocation.js
function getCurrencySymbolForCountryCode(countryCode) {
    const countryGroups: CountryGroups = {
        GBPCountries: {
            name: 'United Kingdom',
            currency: 'GBP',
            countries: ['GB', 'FK', 'GI', 'GG', 'IM', 'JE', 'SH'],
            supportInternationalisationId: 'uk',
        },
        UnitedStates: {
            name: 'United States',
            currency: 'USD',
            countries: ['US'],
            supportInternationalisationId: 'us',
        },
        AUDCountries: {
            name: 'Australia',
            currency: 'AUD',
            countries: ['AU', 'KI', 'NR', 'NF', 'TV'],
            supportInternationalisationId: 'au',
        },
        EURCountries: {
            name: 'Europe',
            currency: 'EUR',
            countries: ['AD', 'AL', 'AT', 'BA', 'BE', 'BG', 'BL', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FO', 'FR',
            'GF', 'GL', 'GP', 'GR', 'HR', 'HU', 'IE', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'ME', 'MF', 'IS', 'MQ', 'MT', 'NL',
            'NO', 'PF', 'PL', 'PM', 'PT', 'RE', 'RO', 'RS', 'SE', 'SI', 'SJ', 'SK', 'SM', 'TF', 'TR', 'WF', 'YT', 'VA', 'AX'],
            supportInternationalisationId: 'eu',
        },
        International: {
            name: 'International',
            currency: 'USD',
            countries: ['AE', 'AF', 'AG', 'AI', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AW', 'AZ', 'BB', 'BD', 'BF', 'BH', 'BI', 'BJ', 'BM',
            'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CC', 'CD', 'CF', 'CG', 'CI', 'CL', 'CM', 'CN', 'CO', 'CR',
            'CU', 'CV', 'CW', 'CX', 'DJ', 'DM', 'DO', 'DZ', 'EC', 'EG', 'EH', 'ER', 'ET', 'FJ', 'FM', 'GA', 'GD', 'GE', 'GH', 'GM',
            'GN', 'GQ', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HT', 'ID', 'IL', 'IN', 'IO', 'IQ', 'IR', 'JM', 'JO', 'JP',
            'KE', 'KG', 'KH', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LK', 'LR', 'LS', 'LY', 'MA', 'MD', 'MG',
            'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MR', 'MS', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI',
            'NP', 'NU', 'OM', 'PA', 'PE', 'PG', 'PH', 'PK', 'PN', 'PR', 'PS', 'PW', 'PY', 'QA', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD',
            'SG', 'SL', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN',
            'TO', 'TT', 'TW', 'TZ', 'UA', 'UG', 'UM', 'UY', 'UZ', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WS', 'YE', 'ZA', 'ZM', 'ZW'],
            supportInternationalisationId: 'int',
        },
        NZDCountries: {
            name: 'New Zealand',
            currency: 'NZD',
            countries: ['NZ', 'CK'],
            supportInternationalisationId: 'nz',
        },
        Canada: {
            name: 'Canada',
            currency: 'CAD',
            countries: ['CA'],
            supportInternationalisationId: 'ca',
        },
    };

    let countryGroup;
    const availableCountryGroups = Object.keys(countryGroups);
    availableCountryGroups.forEach(cg => {
        if (countryGroups[cg].countries.includes(countryCode)) {
            countryGroup = cg;
        }
    });
    if (!countryGroup) {
        return;
    }

    const extendedCurrencySymbol = {
        GBPCountries: '£',
        UnitedStates: '$',
        AUDCountries: '$',
        Canada: 'CA$',
        EURCountries: '€',
        NZDCountries: 'NZ$',
        International: '$',
    };

    return extendedCurrencySymbol[countryGroup];
}

function changeCurrencySymbolBasedOnLocation() {
    const countryCode = getDataAttribute('country-code');
    if (!countryCode) {
        return;
    }

    const currency = getCurrencySymbolForCountryCode(countryCode);
    if (!currency) {
        return;
    }

    const elements = document.getElementsByClassName('js-currency-symbol');
    for (var i = 0; i < elements.length; i++) {
        const element = elements[i];
        // https://stackoverflow.com/questions/4784568/set-content-of-html-span-with-javascript
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        element.appendChild(document.createTextNode(currency));
    }
}

addEncodedReferrerUrlToClickThroughLink()
changeCurrencySymbolBasedOnLocation()

getIframeId()
    .then(() => getWebfonts())
    .then(() => {
        let lastWidth;
        onViewport(({ width }) => {
            if (width !== lastWidth) {
                lastWidth = width;
                resizeIframeHeight();
            }
        })
    })