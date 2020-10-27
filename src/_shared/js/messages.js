import { read, write } from './dom';
import { timeout } from './impl/promises';

const rootElement = document.documentElement;

// These are both provided in the response to getIframeId.
let parentOrigin;
let iframeId;

// First thing that happens when a native ad is delivered is that the parent
// frame will send a message with the ID of the corresponding iframe. This is
// because of some f**d-up handling of the name attribute that is supposed to
// do the work. On frontend this message is sent by on-slot-load.js.
function getIframeId(type) {
    return new Promise(resolve => {
        self.addEventListener('message', function onMessage(evt) {
            let json;
            try {
                json = JSON.parse(evt.data);
            } catch(_) { return; }

            const keys = Object.keys(json);
            if( keys.length < 2 || !keys.includes('id') || !keys.includes('host') ) return;

            self.removeEventListener('message', onMessage);
            ({ id: iframeId, host: parentOrigin } = json);

            if( type ) {
                sendMessage('type', type);
            }

            const debugElem = document.createElement("div");
            debugElem.id = 'getIframeId';
            document.body.appendChild(debugElem);

            resolve(json);
        });
    });
}

function onClick(evt) {
    let link = evt.target;
    while( link && link.tagName !== 'A' ) link = link.parentNode;

    if( link ) reportClick(link);
}

function reportClicks() {
    const debugElem = document.createElement("div");
    debugElem.id = 'reportClicks';
    document.body.appendChild(debugElem);

    document.addEventListener('click', onClick);
}

// Will send a concatenated string of all the data-link-name attributes
// from the clicked node all the way up to the root of the document
function reportClick(node) {
    let dataLinkName = [];
    while( node && node !== document.body ) {
        const dln = node.getAttribute('data-link-name');
        if( dln ) {
            dataLinkName.unshift(dln);
        }
        node = node.parentNode;
    }

    if( dataLinkName.length ) {
        sendMessage('click', dataLinkName.join(' | '));
    }
}

function hideIframe() {
    sendMessage('hide', '');
}

function getWebfonts(fontFamilies) {
    const families = [
        'GuardianTextEgyptianWeb',
        'GuardianEgyptianWeb',
        'GuardianTextSansWeb',
        'GuardianSansWeb'
    ];

    const selector = fontFamilies === undefined ?
        '.webfont' :
        fontFamilies.filter(ff => families.includes(ff)).map(ff => `.webfont[data-cache-name="${ff}"]`).join(',')

    return write(() => rootElement.classList.add('wf-loading'))
    .then(() => sendMessage('get-styles', { selector }))
    .then(styleSheets => {

        const debugElem = document.createElement("div");
        debugElem.id = 'fonts-success';
        document.body.appendChild(debugElem);

        // add stylesheets to the document
        const frag = document.createDocumentFragment();
        styleSheets.map(sheet => {
            const style = document.createElement('style');
            style.textContent = sheet;
            return style;
        }).forEach(frag.appendChild, frag);

        return write(() => {
            document.head.appendChild(frag);

            // advertises fonts are available
            rootElement.classList.remove('wf-loading');
            rootElement.classList.add('wf-active');
        });
    }).catch(() => {
        const debugElem = document.createElement("div");
        debugElem.id = 'fonts-catch';
        document.body.appendChild(debugElem);

        return write(() => {
            rootElement.classList.remove('wf-loading');
            rootElement.classList.add('wf-inactive');
        });
    });
}

function resizeIframeHeight(height = -1) {
    return height === -1 ?
        timeout(Promise.all(areImagesLoaded().concat(isDocumentLoaded())), 3000)
        .then(() => {
            return read(() => document.body.getBoundingClientRect().height)
        })
        .then(function(height) {
            return sendMessage('resize', { height });
        }) :
        sendMessage('resize', { height });
}

function isDocumentLoaded() {
    return document.readyState === 'complete' ?
        Promise.resolve() :
        new Promise(resolve => window.addEventListener('load', resolve));
}

function areImagesLoaded() {
    return Array.from(
        document.getElementsByTagName('img'),
        img => img.complete ? Promise.resolve() : new Promise(resolve => img.onload = resolve)
    );
}

function sendMessage(type, value) {
    const id = generateId();

    return timeout(new Promise((resolve, reject) => {
        self.addEventListener('message', function onMessage({ data }) {
            let msgId, error, result;
            try {
                ({ id: msgId, error, result } = JSON.parse(data));
            } catch(_) { return; }

            if( msgId !== id ) {
                return;
            }

            self.removeEventListener('message', onMessage);
            if( error === null ) {
                resolve(result);
            } else {
                reject(error);
            }
        });
        post(id, iframeId, type, value);
    }), 300);
}

let onScroll = listen.bind(null, 'scroll');
let onViewport = listen.bind(null, 'viewport');

function listen(type, callback) {
    const id = generateId();

    self.addEventListener('message', function onMessage({ data }) {
        try {
            let { id: msgId, result } = JSON.parse(data);

            if( msgId !== id ) {
                return;
            }

            if( callback(result) === false ) {
                post(id, iframeId, type, false);
                self.removeEventListener(onMessage);
            }
        } catch( ex ) { /* noop */ }
    });

    post(id, iframeId, type, true);
}

function generateId() {
    return `${_4chars()}${_4chars()}-${_4chars()}-${_4chars()}-${_4chars()}-${_4chars()}${_4chars()}${_4chars()}`;

    function _4chars() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substr(1);
    }
}

function post(id, iframeId, type, value) {
    window.top.postMessage(JSON.stringify({ id, iframeId, type, value }), parentOrigin);
}

export {
    sendMessage,
    getIframeId,
    hideIframe,
    getWebfonts,
    resizeIframeHeight,
    onScroll,
    onViewport,
    reportClicks};
