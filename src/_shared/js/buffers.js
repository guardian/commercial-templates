'use strict';

import { dequeue } from './impl/dequeue.js';

export {
    Buffer,
    DroppingBuffer,
    SlidingBuffer
};

function Buffer(n = Infinity) {
    const buffer = dequeue();

    return Object.freeze({
        put: x => {
            if( buffer.length() < n ) {
                buffer.unshift(x);
                return buffer.length();
            }
            return -1;
        },
        take: () => buffer.length() === 0 ? null : buffer.pop(),
        isEmpty() { return buffer.length() === 0; },
        isFull()  { return buffer.length() === n; }
    });
}

function DroppingBuffer(n = Infinity) {
    const buffer = dequeue();

    return Object.freeze({
        put: x => {
            if( buffer.length() < n ) {
                buffer.unshift(x);
            }
            return buffer.length();
        },
        take: () => buffer.length() === 0 ? null : buffer.pop(),
        isEmpty() { return buffer.length() === 0; },
        isFull()  { return false; }
    });
}

function SlidingBuffer(n = Infinity) {
    const buffer = dequeue();

    return Object.freeze({
        put: x => {
            if( buffer.length() === n ) {
                buffer.pop();
            }
            buffer.unshift(x);
            return buffer.length();
        },
        take: () => buffer.length() === 0 ? null : buffer.pop()
        isEmpty() { return buffer.length() === 0; },
        isFull()  { return false; }
    });
}
