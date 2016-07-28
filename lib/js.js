const spawn = require('./task');
const rollup = require('rollup');
// const uglify = require('rollup-plugin-uglify');
const babel = require('rollup-plugin-babel');

function buildJs(src) {
    return spawn(function*() {
        const bundle = yield rollup.rollup({ entry: src, plugins: [ babel() ] });
        return bundle.generate({
            format: 'iife',
            exports: 'none',
            sourceMap: false,
            intro: 'document.addEventListener("DOMContentLoaded", () => {',
            outro: '})'
        }).code;
    });
}

module.exports = buildJs;
