const spawn = require('./task');
const mapcat = require('./coll').mapcat;
const buildCss = require('./css');
const buildJs = require('./js');
const buildHtml = require('./html');

const fs = require('fs-extra');
const path = require('path');

const types = ['web', 'app', 'amp'];

function build(options) {
    const { src, dst, minify } = options;
    let directories = fs.readdirSync(src)
        .filter(file => {
            if( file === '_shared' || file.startsWith('.')) return false;
            const stat = fs.fstatSync(fs.openSync(`${src}/${file}`, 'r'));
            return stat.isDirectory();
        });

    // create symbolic links to the test files
    directories.forEach( (dir) => {
      fs.mkdirsSync(`${dst}/${dir}`);

      const srcTestFile = path.resolve(`${src}/${dir}/test.json`);
      const destTestFile = path.resolve(`${dst}/${dir}/test.json`);

      if (fs.existsSync(srcTestFile)) {
        fs.symlinkSync(srcTestFile, destTestFile);
      }

			types.forEach((type)=> {
				const srcDeployFile = path.resolve(`${src}/${dir}/${type}/ad.json`);
				const destDeployFile = path.resolve(`${dst}/${dir}/${type}/ad.json`);

				if (fs.existsSync(srcDeployFile)) {
					fs.mkdirsSync(`${dst}/${dir}/${type}`);
					fs.symlinkSync(srcDeployFile, destDeployFile);
				}
			});
    });

    directories = mapcat(directories, (dir) => [
        `${dir}/web`,
        `${dir}/app`,
        `${dir}/amp`
    ].filter(dir => fs.existsSync(`${src}/${dir}`)));

    directories.forEach( (dir) => {
      fs.mkdirs(`${dst}/${dir}`);
    });

    return Promise.all(mapcat(directories, (dir) => {

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
