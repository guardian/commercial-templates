const fs = require('fs');
const mapcat = require('../../../../lib/coll').mapcat;

function getTemplates() {
    const src = './build/';

    let directories = fs.readdirSync(src)
    .filter(file => {
        if (file.startsWith('.')) {
            return false;
        }

        const stat = fs.fstatSync(fs.openSync(`${src}/${file}`, 'r'));

        return stat.isDirectory();
    });

    directories = mapcat(directories, dir => [
        `${dir}/web`,
        `${dir}/app`,
        `${dir}/amp`
    ])
    .filter(dir => fs.existsSync(`${src}/${dir}`));

    return {
        templates: directories
    };
}

module.exports = getTemplates;
