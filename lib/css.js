const spawn = require('./task');
const csso = require('csso');
const Promise = require('bluebird');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const renderSass = Promise.promisify(require('node-sass').render);

function buildCss(fs, src, dst) {
    return spawn(function*() {
        const exists = yield fs.statAsync(src).then(() => true).catch(() => false);
        let css = '';

        if( exists ) {
            let compiledSass = yield compileSass(src);
            css = yield postprocessCss(compiledSass);
            css = compressCss(css);
        }

        return fs.writeFileAsync(dst, css);
    });
}

function compileSass(file) {
    return spawn(function* () {
        const sass = yield renderSass({
            file,
            sourceMap: false,
            includePaths: [
                'src/_shared/scss',
                'node_modules/sass-mq'
            ]
        });
        return sass.css.toString();
    });
}

function postprocessCss(css) {
    var modernBrowsers = [
        'last 2 versions',
        'Firefox ESR',
        'Safari >= 8',

        'Android >= 4',
        'BlackBerry >= 6',

        '> 2% in US',
        '> 2% in AU',
        '> 2% in GB'
    ];

    return spawn(function* () {
        let result = yield postcss([ autoprefixer({ browsers: modernBrowsers }) ]).process(css);
        return result.css;
    });
}

function compressCss(css) {
    return csso.minify(css).css;
}

module.exports = buildCss;
