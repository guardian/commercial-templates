import { getIframeId, getWebfonts } from '../_shared/js/messages.js';

getIframeId().then(() => {
    getWebfonts();
});
