const fs = require('fs');

function getTemplates() {
    const src = './build/';

    const directories = fs.readdirSync(src).filter(file => {
        if (file.startsWith('.')) {
            return false;
        }

        const stat = fs.fstatSync(fs.openSync(`${src}/${file}`, 'r'));
        
        return stat.isDirectory();
    });

    return {
        templates: directories
    };
}

module.exports = getTemplates;