let registeredListeners = 0;
const listeners = {};

function register(type, callback, _window) {
	if( registeredListeners === 0 ) {
        on(_window || window);
    }

    listeners[type] || (listeners[type] = []);

    if (listeners[type].indexOf(callback) === -1) {
        listeners[type].push(callback);
        registeredListeners += 1;
    }
}

function on(window) {
	window.addEventListener('message', onMessage);
}

function onMessage(event) {
	const data = JSON.parse(event.data);

	if (!data.type || !listeners[data.type]) {
		return;
	}

	listeners[data.type].map(function (callback) {
		respond(null, callback(data));
	});

	function respond(error, result) {
		event.source.postMessage(JSON.stringify({ id: data.id, error: error, result: result }), 'http://localhost:9000');
	}
}

module.exports = {
	register: register
};