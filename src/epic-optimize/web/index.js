import { areImagesLoaded, isDocumentLoaded } from '../../_shared/js/messages';
import {timeout} from "../../_shared/js/impl/promises";
import {read} from "../../_shared/js/dom";

function getAbTestData() {
    try {
        const propertyId = 'UA-51507017-5';
        // FIXME: await for gaData to be defined
        const testName = Object.keys(gaData[propertyId].experiments)[0];
        const variantName = gaData[propertyId].experiments[testName];
        return {
            name: testName,
            variant: variantName,
        }
    } catch(err) {
        console.log(err)
        return;
    }
}

function getAcquisitionData() {

    // data passed by parent as GET parameters
    let referrerPageViewId;
    let referrerUrl;
    try {
        const optimizeEpicUrl = new URL(window.location.href);
        referrerPageViewId = optimizeEpicUrl.searchParams.get('pvid');
        referrerUrl = optimizeEpicUrl.searchParams.get('url');
    } catch(_) {};

    const abTestData = getAbTestData();
    const componentId = abTestData ? (data.name + '_' + data.variant) : 'optimize_epic';

    return {
        componentType: 'ACQUISITIONS_EPIC',
        source: 'GUARDIAN_WEB',
        componentId: componentId,
        abTest: abTestData,
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
    return 
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

function postEpicInitializedMessage(acquisitionData) {
    postMessage(EPIC_INITIALIZED, { 
        abTest: acquisitionData.abTest, 
        componentId: acquisitionData.componentId,
    });
}

function startCommunication(acquisitionData) {
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

    postEpicInitializedMessage(acquisitionData);
}

function init() {
    const acquisitionData = getAcquisitionData();
    enrichClickThroughURL(acquisitionData);
    useLocalCurrencySymbol();
    startCommunication(acquisitionData);
}

init();
