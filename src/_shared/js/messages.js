export function reportClick(node) {
    let dataLinkName = []
    while( node ) {
        const dln = node.getAttribute('data-link-name');
        if( dln ) {
            dataLinkName.unshift(dln);
        }
        node = node.parentNode;
    }
    sendMessage('click', { linkName: dataLinkName.join(' | ') });
}

function sendMessage(type, data) {
    // TODO Allow localhost:9000 when developing
    // and m.code.dev-theguardian.com when testing
    window.top.postMessage({ type, data }, `${location.protocol}//www.theguardian.com`);
}
