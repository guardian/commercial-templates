import { getIframeId, sendMessage, onViewport } from '../../_shared/js/messages.js';
import { once } from '../../_shared/js/utils';

const updateBackground = () => {

    const [ scrollType,
        backgroundImage,
        backgroundRepeat,
        backgroundPosition,
        backgroundSize] = [
        'interscroller',
        `url('[%BackgroundImage%]')`,
        'no-repeat',
        'center center',
        '100% 100%',
    ];

    sendMessage('background', {
        scrollType,
        backgroundImage,
        backgroundRepeat,
        backgroundPosition,
        backgroundSize
    });
};

getIframeId()
.then(() => {
    onViewport(once(updateBackground));
});
