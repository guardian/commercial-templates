import { getIframeId, sendMessage } from '../../_shared/js/messages.js';

getIframeId()
.then(() => {

    const [ scrollType,
            backgroundColour,
            backgroundImage,
            backgroundRepeat,
            backgroundPosition,
            backgroundSize ] = [
        'fixed',
        '#f6f6f6',
        `url('[%BackgroundImage%]')`,
        'no-repeat',
        'center center',
        'cover'
    ];

    sendMessage('background', {
        scrollType,
        backgroundColour,
        backgroundImage,
        backgroundRepeat,
        backgroundPosition,
        backgroundSize
    });
});