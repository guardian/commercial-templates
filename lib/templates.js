const fs = require('fs');

module.exports = () => {
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
};