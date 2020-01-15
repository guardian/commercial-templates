import { getIframeId, sendMessage, onViewport } from '../../_shared/js/messages.js';
import { once } from '../../_shared/js/utils';

const updateBackground = () => {

    const [ leftImage ] = [
        `url('[%LeftImageSrc%]')`,
    ];

    sendMessage('renderPageSkin', {
        leftImage,
    });
};

getIframeId()
.then(() => {
    onViewport(once(updateBackground));
});
