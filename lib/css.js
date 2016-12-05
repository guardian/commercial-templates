const spawn = require('./task');
const csso = require('csso');
const Promise = require('bluebird');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const sass = require('node-sass');
const renderSass = Promise.promisify(sass.render);

function buildCss(fs, src, dst, { mode = 'web' } = {}) {
    return spawn(function*() {
        let css;

        css = yield compileSass(src);
        if( mode !== 'amp' ) {
            css = yield postprocessCss(css);
            css = compressCss(css);
        }

        return fs.writeFileAsync(dst, css);
    });
}

function compileSass(file) {
    return spawn(function* () {
        const compiled = yield renderSass({
            file,
            sourceMap: false,
            includePaths: [
                'src/_shared/scss',
                'node_modules/sass-mq'
            ],
            functions: {
                'dfpVar($var)': function (varName) {
                    return new sass.types.String(`[%${varName.getValue()}%]`);
                }
            }
        });
        return compiled.css.toString();
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
