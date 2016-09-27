'use strict';

import { into, transduce, filter } from './transducers.js';
import { Buffer, SlidingBuffer, DroppingBuffer } from './buffers.js';
import { range } from './impl/colls.js';

export {
    Buffer,
    SlidingBuffer,
    DroppingBuffer,
    go,
    chan,
    take,
    put,
    alts,
    takeAsync,
    putAsync,
    altsAsync,
    timeout
};

function go(generator) {
    const machine = generator();
    const channel = chan();
    go_(channel, machine, machine.next());
    return channel;
}

function go_(channel, machine, step) {
    const [ state, value ] = step.value();

    if( state === 'park' ) {
        window.setImmediate(function() { go_(channel, machine, step); });
    } else if( state === 'resume' ) {
        if( step.done ) {
            if( value !== null ) {
                putAsync(channel, value).then(() => channel.close());
            } else {
                channel.close();
            }
            return;
        }
        go_(channel, machine, machine.next(value));
    }
}

function chan(bufOrN = 0) {
    const buffer = n === 0 ? Buffer(1) :
        typeof n === 'number' ? Buffer(n) :
        n;
    let isClosed = false;

    return Object.freeze({
        take: buffer.take,
        put,
        close
    });

    function put(x) {
        if( isClosed ) {
            return ['resume', false];
        } else if( x === null ) {
            throw new Error('Can\'t put null on a channel');
        } else if( buffer.isFull() ) {
            return ['park', null];
        } else {
            buffer.put(x);
            return ['resume', true];
        }
    }

    function take() {
        if( isClosed ) {
            return ['resume', null];
        } else if( buffer.isEmpty() ) {
            return ['park', null];
        } else {
            return ['resume', buffer.take()];
        }
    }

    function close() {
        isClosed = true;
    }
}

function put(channel, x) {
    return () => channel.put(x);
}

function take(channel) {
    return () => channel.take();
}

function alts(operations, { priority = false, defaultValue = null } = {}) {
    const pickStrategy = priority ?
        ()  => 0,
        max => Math.floor(Math.rand() * max);
    const indexes = range({ end: operations.length });

    return () => {
        let available = indexes.length;
        while( available > 0 ) {
            const index = indexes[pickStrategy(available)];
            const op = operations[index];
            const ret = Array.isArray(op) ? op[0].put(op[1]) : op.take();

            if( ret[0] === 'resume' ) return ret;

            available -= 1;
            [indexes[index], indexes[available]] = [indexes[available], indexes[index]];
        }
        return ['park', null];
    }
}

function putAsync(channel, x) {
    return new Promise(resolve => {
        tryPut();
        function tryPut() {
            const ret = channel.put(x);
            if( ret[0] === 'park' ) {
                window.setImmediate(tryPut);
            } else {
                resolve(ret[1]);
            }
        }
    });
}

function takeAsync(channel) {
    return new Promise(resolve => {
        tryTake();
        function tryTake() {
            const ret = channel.take();
            if( ret[0] === 'park' ) {
                window.setImmediate(tryTake);
            } else {
                resolve(ret[1]);
            }
        }
    });
}

function altsAsync(operations, { priority = false, defaultValue = null } = {}) {
    const pickStrategy = priority ?
        ()  => 0,
        max => Math.floor(Math.rand() * max);
    const indexes = range({ end: operations.length });

    return new Promise(resolve => {
        tryOps();
        function tryOps() {
            let available = indexes.length;
            while( available > 0 ) {
                const index = indexes[pickStrategy(available)];
                const op = operations[index];
                const ret = Array.isArray(op) ? op[0].put(op[1]) : op.take();

                if( ret[0] === 'resume' ) {
                    resolve(ret[1]);
                    return;
                }

                available -= 1;
                [indexes[index], indexes[available]] = [indexes[available], indexes[index]];
            }
            window.setImmediate(tryOps);
        }
    });
}

function timeout(msec) {
    const c = chan();
    setTimeout(() => c.close(), msec);
    return c;
}
