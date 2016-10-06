const spawn = require('./task');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('uglify-js');

function buildJs(src, minify) {
    return spawn(function*() {
        const bundle = yield rollup.rollup({ entry: src, plugins: [ babel() ] });
        const code = bundle.generate({
            format: 'iife',
            exports: 'none',
            sourceMap: false,
            intro: 'if(document.readyState !== "loading") { boot(); } else { document.addEventListener("DOMContentLoaded", boot); }; function boot(){',
            outro: '}'
        }).code;
        return minify ? uglify.minify(code, { fromString: true }).code : code;
        return code;
    });
}

module.exports = buildJs;
