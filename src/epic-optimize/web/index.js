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
            postIframeHeightMessage();
        }
    });

    postMessage(EPIC_INITIALIZED);
}

function init() {
    enrichClickThroughURL();
    useLocalCurrencySymbol();
    startCommunication();
}

init();
