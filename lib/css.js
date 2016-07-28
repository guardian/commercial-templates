const spawn = require('./task');
const csso = require('csso');
const Promise = require('bluebird');
const renderSass = Promise.promisify(require('node-sass').render);

function buildCss(fs, src, dst) {
    return spawn(function*() {
        const exists = yield fs.statAsync(src).then(() => true).catch(() => false);
        const css = exists ? compressCss(yield compileSass(src)) : '';
        return fs.writeFileAsync(dst, css);
    });
}

function compileSass(file) {
    return spawn(function* () {
        const sass = yield renderSass({
            file,
            sourceMap: false,
            includePaths: ['_shared/scss']
        });
        return sass.css.toString();
    });
}

function compressCss(css) {
    return csso.minify(css).css;
}

module.exports = buildCss;
