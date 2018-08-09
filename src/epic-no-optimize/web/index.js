import {areImagesLoaded, isDocumentLoaded} from '../../_shared/js/messages';
import {timeout} from "../../_shared/js/impl/promises";
import {read} from "../../_shared/js/dom";

function getAcquisitionData() {
    // data passed by parent as GET parameters
    let referrerPageViewId;
    let referrerUrl;
    try {
        const optimizeEpicUrl = new URL(window.location.href);
        referrerPageViewId = optimizeEpicUrl.searchParams.get('pvid');
        referrerUrl = optimizeEpicUrl.searchParams.get('url');
    } catch(_) {}

    return {
        componentType: 'ACQUISITIONS_EPIC',
        source: 'GUARDIAN_WEB',
        componentId: 'epic_within_iframe_yes_js',
        abTest: {
            name: 'iframe_or_not',
            variant: 'iframe'
        },
        referrerPageViewId: referrerPageViewId,
        referrerUrl: referrerUrl,
    };
}

function enrichClickThroughURL(acquisitionData) {

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

    // Acquisition data percent encoded by set() method
    clickThroughUrl.searchParams.set('acquisitionData', JSON.stringify(acquisitionData));
    button.href = clickThroughUrl.toString();
}

function useLocalCurrencySymbol() {
    const currencySymbol = document.querySelector('.js-currency-symbol');
    if (!currencySymbol) {
      return;
    }

    try {
        const optimizeEpicUrl = new URL(window.location.href);
        const localCurrencySymbol = optimizeEpicUrl.searchParams.get('lcs');
        if (localCurrencySymbol) {
            currencySymbol.innerHTML = localCurrencySymbol;
        }
    } catch (_) {};
}

// channel for messages between Optimize Epic and Guardian frontend
const OPTIMIZE_EPIC_CHANNEL = 'OPTIMIZE_EPIC';

// messages in this channel (incoming / outgoing) should have the following schema:
// { channel: 'OPTIMIZE_EPIC', messageType: string, data: ?any }

// outgoing event types
const EPIC_INITIALIZED = 'EPIC_INITIALIZED';
const EPIC_HEIGHT = 'EPIC_HEIGHT';

// incoming event types
const FONTS = 'FONTS';

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
    getIframeHeight().then(height => {
        postMessage(EPIC_INITIALIZED, {
            height
        });
    });
}

function startCommunication() {
    self.addEventListener('resize', () => {
        postIframeHeightMessage();
    });

    postEpicInitializedMessage();
}

function init() {
    useLocalCurrencySymbol();
    enrichClickThroughURL(getAcquisitionData());
    startCommunication();
}

init();
