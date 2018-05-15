import { getIframeId, getWebfonts, onViewport, resizeIframeHeight } from '../../_shared/js/messages';

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

    const referrerUrl = button.getAttribute('data-referrer-url');
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

addEncodedReferrerUrlToClickThroughLink()

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