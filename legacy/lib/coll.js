exports.mapcat = function mapcat(coll, fn) {
    return coll.reduce((res, input) => res.concat(fn(input)), []);
}
