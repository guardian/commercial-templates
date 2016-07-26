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

function sendMessage(type, data) {
    // TODO Allow localhost:9000 when developing
    // and m.code.dev-theguardian.com when testing
    window.top.postMessage({ type, data }, `${location.protocol}//www.theguardian.com`);
}
