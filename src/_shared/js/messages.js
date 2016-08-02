const devMode = '[%DevMode%]';
const rootElement = document.documentElement;

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

    rootElement.classList.add('wf-loading');
    return sendMessage('get-styles', { selector }).then(styleSheets => {
        // add stylesheets to the document
        const frag = document.createDocumentFragment();
        styleSheets.map(sheet => {
            const style = document.createElement('style');
            style.textContent = sheet;
            return style;
        }).forEach(style => frag.appendChild(style));
        document.head.appendChild(frag);

        // advertises fonts are available
        rootElement.classList.remove('wf-loading');
        rootElement.classList.add('wf-active');
    }).catch(() => {
        rootElement.classList.remove('wf-loading');
        rootElement.classList.add('wf-inactive');
    });
}

export function sendMessage(type, value) {
    const id = generateId();

    return new Promise((resolve, reject) => {
        self.addEventListener('message', function onMessage({ data, source }) {
            if( source !== window.top ) {
                return;
            }

            try {
                let { id: msgId, error, result } = JSON.parse(data);

                if( msgId !== id ) {
                    return;
                }

                self.removeEventListener('message', onMessage);
                console.log(result);
                if( error === null ) {
                    resolve(result);
                } else {
                    reject(error);
                }
            } catch( ex ) {
                reject(ex);
                return;
            }
        });

        // TODO Allow localhost:9000 when developing
        // and m.code.dev-theguardian.com when testing
        window.top.postMessage(JSON.stringify({ id, type, value }), location.protocol + (devMode === 'true' ? '//localhost:9000' : '//www.theguardian.com'));
    })
}

function generateId() {
    return `${_4chars()}${_4chars()}-${_4chars()}-${_4chars()}-${_4chars()}-${_4chars()}${_4chars()}${_4chars()}`;

    function _4chars() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substr(1);
    }
}
