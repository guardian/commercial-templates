const spawn = require('./task');
const mapcat = require('./coll').mapcat;
const buildCss = require('./css');
const buildJs = require('./js');
const buildHtml = require('./html');

// Promisify file system API
const fs = require('fs-extra');

function build(options) {
    const { src, dst, minify } = options;
    let directories = fs.readdirSync(src)
        .filter(file => {
            if( file === '_shared' || file.startsWith('.')) return false;
            const stat = fs.fstatSync(fs.openSync(`${src}/${file}`, 'r'));
            return stat.isDirectory();
        });

    directories = mapcat(directories, (dir) => [
        `${dir}/web`,
        `${dir}/app`,
        `${dir}/amp`
    ].filter(dir => fs.existsSync(`${src}/${dir}`)));

    return Promise.all(mapcat(directories, (dir) => {
        let prefix = '';
        dir.split('/').forEach(dir => {
            if( !fs.existsSync(`${dst}/${prefix}${dir}`) ) {
                fs.mkdirSync(`${dst}/${prefix}${dir}`);
            }
            prefix += `${dir}/`;
        });

        let mode = dir.substr(dir.lastIndexOf('/') + 1);
        let opts = Object.assign({ mode }, options);

        return [
            buildCss(fs, `${src}/${dir}/index.scss`, `${dst}/${dir}/index.css`, opts),
            spawn(function*() { return buildHtml(
                fs,
                `${src}/${dir}/index.html`,
                yield buildJs(`${src}/${dir}/index.js`, opts),
                `${dst}/${dir}/index.html`,
                opts
            ) })
        ];
    }));
}

module.exports = build;
