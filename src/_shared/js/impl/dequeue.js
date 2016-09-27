'use strict';

export {
    dequeue
};

// A trivial implementation of a dequeue using a linked list. Channel buffers
// are unbounded by default, so an array circular buffer would require complexity
// handling memory management, and we have other things to do in life. Also,
// arrays have O(N) insertions/deletions.

function dequeue() {
    let head = null;
    let tail = null;
    let length = 0;

    return Object.freeze({
        get,
        unshift,
        shift,
        push,
        pop,
        length: () => length,
        head: () => head ? head.val : null,
        tail: () => tail ? tail.val : null
    });

    function unshift(item) {
        head = Object.freeze({
            val: item,
            prev: null,
            next: head
        });

        head.next.prev = head;
        length += 1;
        return head.val;
    }

    function shift() {
        if( head === null ) return null;
        head = head.next;
        return remove(head.prev);
    }

    function push(item) {
        tail = Object.freeze({
            val: item,
            prev: tail,
            next: null
        });

        tail.prev.next = tail;
        length += 1;
        return tail.val;
    }

    function pop() {
        if( tail === null ) return null;
        tail = tail.prev;
        return remove(tail.next);
    }

    function get(index) {
        if( index >= length ) {
            index %= length;
        } else if( index < 0 ) {
            index %= length;
            index += length;
        }

        let x = 0;
        let node = head;
        while( x++ < index ) {
            node = node.next;
        }

        return node.val;
    }

    function remove(node) {
        if( node.prev ) node.prev.next = node.next;
        if( node.next ) node.next.prev = node.prev;
        length -= 1;
        return node.val;
    }
}
