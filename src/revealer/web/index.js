import { getIframeId, sendMessage } from '../../_shared/js/messages.js';

getIframeId()
.then(() => {

    const [ scrollType, backgroundColour, backgroundImage, backgroundRepeat, backgroundPosition ] = [
        'fixed',
        '#f6f6f6',
        `url('[%BackgroundImage%]')`,
        'no-repeat',
        'center center'
    ];

    sendMessage('background', {
        scrollType,
        backgroundColour,
        backgroundImage,
        backgroundRepeat,
        backgroundPosition
    });
});