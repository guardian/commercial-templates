let parentBody = window.top.document.body;
parentBody.style.backgroundImage='url(%%VIEW_URL_UNESC%%[%PageSkinFileName%])';
parentBody.style.backgroundAttachment='fixed';
parentBody.style.backgroundPosition='50% 0';
parentBody.style.backgroundRepeat='no-repeat no-repeat';
parentBody.onclick=function(e) {
    const target = e.target;
    if (target.nodeName.toLowerCase() === 'body') {
        window.open('%%CLICK_URL_UNESC%%[%ClickDestination%]');
    }
    return true;
};

window.top.postMessage('truskinRendered', '*');
