import { getIframeId, sendMessage, onViewport } from '../../_shared/js/messages.js';

getIframeId()
.then(() => {
    onViewport(({ height }) => {
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

        // for the height, we need to account for the height of the location bar, which
        // may or may not be there. 70px padding is not too much.
        sendMessage('background', {
            scrollType,
            backgroundColour,
            backgroundImage,
            backgroundRepeat,
            backgroundPosition,
            backgroundSize,
            height: `${height + 70}px`
        });
    });
});
