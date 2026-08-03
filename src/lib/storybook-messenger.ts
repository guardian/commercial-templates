import type { Message } from './messenger';

const resetMessengerStyles = (): void => {
	document.body.style.backgroundImage = '';
	document.body.style.backgroundRepeat = '';
	document.body.style.backgroundPosition = '';
	document.body.style.backgroundSize = '';
	document.body.style.backgroundAttachment = '';
	document.body.style.minHeight = '';
};

const renderMessengerMessage = (message: Message): void => {
	if (message.type === 'resize') {
		document.body.style.minHeight = String(message.value.height ?? '');
		return;
	}

	if (message.type !== 'background') {
		return;
	}

	const { value } = message;
	document.body.style.backgroundImage = value.backgroundImage;
	document.body.style.backgroundRepeat = value.backgroundRepeat;
	document.body.style.backgroundPosition = value.backgroundPosition;
	document.body.style.backgroundSize =
		'backgroundSize' in value ? value.backgroundSize : '';
	document.body.style.backgroundAttachment =
		value.scrollType === 'fixed' ? 'fixed' : '';
};

export { renderMessengerMessage, resetMessengerStyles };
