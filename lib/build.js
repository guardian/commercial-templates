const spawn = require('./task');
const mapcat = require('./coll').mapcat;
const buildCss = require('./css');
const buildJs = require('./js');
const buildHtml = require('./html');

const Promise = require('bluebird');

// Promisify file system API
const fs = Promise.promisifyAll(require('fs'));

function build({ src, dst }) {
    const directories = fs.readdirSync(src)
        .filter(file => {
            if( file === '_shared' || file.startsWith('.')) return false;
            const stat = fs.fstatSync(fs.openSync(`${src}/${file}`, 'r'));
            return stat.isDirectory();
        });

    return Promise.all(mapcat(directories, (dir) => {
        if( !fs.existsSync(`${dst}/${dir}`) ) {
            fs.mkdirSync(`${dst}/${dir}`);
        }
        return [
            buildCss(fs, `${src}/${dir}/index.scss`, `${dst}/${dir}/index.css`),
            spawn(function*() { return buildHtml(fs, `${src}/${dir}/index.html`, yield buildJs(`${src}/${dir}/index.js`), `${dst}/${dir}/index.html`) })
        ];
    }));
}

module.exports = build;
