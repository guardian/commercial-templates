export function range({ start = 0, end = 100, step = 1 }) {
    let coll = [];
    let val = start;
    while(val < end) {
        coll.push(val);
        val += step;
    }
    return coll;
}
