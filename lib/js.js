const spawn = require('./task');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('uglify-js');

function buildJs(src) {
    return spawn(function*() {
        const bundle = yield rollup.rollup({ entry: src, plugins: [ babel() ] });
        const code = bundle.generate({
            format: 'iife',
            exports: 'none',
            sourceMap: false,
            intro: 'document.addEventListener("DOMContentLoaded", function(){',
            outro: '})'
        }).code;
        return uglify.minify(code, { fromString: true }).code;
    });
}

module.exports = buildJs;
