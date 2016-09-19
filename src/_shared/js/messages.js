import { read, write } from './dom.js';

const devMode = '[%DevMode%]';
const rootElement = document.documentElement;

let iframeId;

// First thing that happens when a native ad is delivered is that the parent
// frame will send a message with the ID of the corresponding iframe. This is
// because of some f**d-up handling of the name attribute that is supposed to
// do the work.
export function getIframeId() {
    return new Promise(resolve => {
        self.addEventListener('message', function onMessage(evt) {
            let json;
            try {
                json = JSON.parse(evt.data);
            } catch(_) { return; }
            const keys = Object.keys(json);
            if( !(keys.length === 1 && keys[0] === 'id' )) return;

            self.removeEventListener('message', onMessage);
            resolve(iframeId = json.id);
        });
    });
}

// Will send a concatenated string of all the data-link-name attributes
// from the clicked node all the way up to the root of the document
export function reportClick(node) {
    let dataLinkName = [];
    while( node ) {
        const dln = node.getAttribute('data-link-name');
        if( dln ) {
            dataLinkName.unshift(dln);
        }
        node = node.parentNode;
    }
    sendMessage('click', dataLinkName.join(' | '));
}

export function getWebfonts(fontFamilies) {
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
        // add stylesheets to the document
        const frag = document.createDocumentFragment();
        styleSheets.map(sheet => {
            const style = document.createElement('style');
            style.textContent = sheet;
            return style;
        }).forEach(style => frag.appendChild(style));

        return write(() => {
            document.head.appendChild(frag);

            // advertises fonts are available
            rootElement.classList.remove('wf-loading');
            rootElement.classList.add('wf-active');
        });
    }).catch(() => {
        return write(() => {
            rootElement.classList.remove('wf-loading');
            rootElement.classList.add('wf-inactive');
        });
    });
}

export function resizeIframeHeight() {
    return new Promise(resolve => {
        if( document.readyState === 'complete' ) {
            resolve();
        } else {
            window.addEventListener('load', resolve);
        }
    })
    .then(() => read(() => window.innerHeight))
    .then(function(height) {
        return sendMessage('resize', { height });
    });
}

export function sendMessage(type, value) {
    const id = generateId();

    return new Promise((resolve, reject) => {
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
    });
}

export function onScroll(callback) {
    const id = generateId();
    const type = 'scroll';

    self.addEventListener('message', function onMessage({ data }) {
        try {
            let { id: msgId, result } = JSON.parse(data);

            if( msgId !== id ) {
                return;
            }

            if( !callback(result) === false ) {
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
    // TODO Allow localhost:9000 when developing
    // and m.code.dev-theguardian.com when testing
    window.top.postMessage(JSON.stringify({ id, iframeId, type, value }), location.protocol + (devMode === 'true' ? '//localhost:7000' : '//www.theguardian.com'));
}
