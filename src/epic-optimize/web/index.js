import {areImagesLoaded, getWebfonts, isDocumentLoaded} from '../../_shared/js/messages';
import {timeout} from "../../_shared/js/impl/promises";
import {read, write} from "../../_shared/js/dom";

function getAbTestData() {

    const abTestData = new Promise((resolve, reject) => {
        ga(() => {
            try {
                const propertyId = 'UA-51507017-5';
                const testName = Object.keys(gaData[propertyId].experiments)[0];
                const variantName = gaData[propertyId].experiments[testName];
                resolve({
                    name: testName,
                    variant: variantName,
                });
            } catch(err) {
                reject(new Error('error getting AB test data from gaData variable: ' + err))
            }
        });
    });

    const emptyAbTestData = new Promise((_, reject) => {
        window.setTimeout(() => {
            reject(new Error('unable to load Google Analytics within 2 seconds which means no AB test data is available'));
        }, 2000);
    });

    return Promise.race([abTestData, emptyAbTestData]).catch(err => {
        console.log(err);
        return null;
    });
}

function getAcquisitionData() {
    return getAbTestData()
        .then(abTestData => {
            const componentId = abTestData ? (abTestData.name + '_' + abTestData.variant) : 'optimize_epic';

            // data passed by parent as GET parameters
            let referrerPageViewId;
            let referrerUrl;
            try {
                const optimizeEpicUrl = new URL(window.location.href);
                referrerPageViewId = optimizeEpicUrl.searchParams.get('pvid');
                referrerUrl = optimizeEpicUrl.searchParams.get('url');
            } catch(_) {};

            return {
                componentType: 'ACQUISITIONS_EPIC',
                source: 'GUARDIAN_WEB',
                componentId: componentId,
                abTest: abTestData,
                referrerPageViewId: referrerPageViewId,
                referrerUrl: referrerUrl,
            };
        });
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

function postEpicInitializedMessage(acquisitionData) {
    getIframeHeight().then(height => {
        postMessage(EPIC_INITIALIZED, {
            abTest: acquisitionData.abTest,
            componentId: acquisitionData.componentId,
            height
        });
    });
}

function addFonts(fonts) {
    const frag = document.createDocumentFragment();
    fonts.map(font => {
        const style = document.createElement('style');
        style.textContent = font;
        return style;
    }).forEach(frag.appendChild, frag);

    document.head.appendChild(frag);
}

function startCommunication(acquisitionData) {
    self.addEventListener('message', event => {
        // TODO: do we even need this?
        let data;
        try {
            data = JSON.parse(event.data);
        } catch (_) {
            console.log('could not parse JSON');
            return;
        }
        if (data.channel === OPTIMIZE_EPIC_CHANNEL && data.messageType === FONTS) {
            console.log('got fonts data', data.fonts);
            addFonts(data.fonts);
        }
    });

    self.addEventListener('resize', () => {
        postIframeHeightMessage();
    });

    postEpicInitializedMessage(acquisitionData);
}

function init() {

    useLocalCurrencySymbol();

    getAcquisitionData()
        .then(acquisitionData => {
            enrichClickThroughURL(acquisitionData);
            startCommunication(acquisitionData);
        })
        .catch(err => console.log(err));
}

init();
