const spawn = require('./task');
const mapcat = require('./coll').mapcat;
const buildCss = require('./css');
const buildJs = require('./js');
const buildHtml = require('./html');

const Promise = require('bluebird');

// Promisify file system API
const fs = Promise.promisifyAll(require('fs'));

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
        return [
            buildCss(fs, `${src}/${dir}/index.scss`, `${dst}/${dir}/index.css`),
            spawn(function*() { return buildHtml(fs, `${src}/${dir}/index.html`, yield buildJs(`${src}/${dir}/index.js`, minify), `${dst}/${dir}/index.html`, options) })
        ];
    }));
}

module.exports = build;
