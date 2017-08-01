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

        sendMessage('background', {
            scrollType,
            backgroundColour,
            backgroundImage,
            backgroundRepeat,
            backgroundPosition,
            backgroundSize,
            height: `${height}px`
        });
    });
});
