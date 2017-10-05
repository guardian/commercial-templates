const rimraf = require('rimraf');
const fs = require('fs');

const targetToClean = './build';

console.log('\x1b[32m%s\x1b[0m', '\n==> Cleaning... Time to clean...');
clean()
console.log('... all done!');

function clean() {
  fs.readdirSync(targetToClean)
      .filter(file => { return !file.startsWith('.'); })
      .forEach( (file, index) => {
        console.log('Removing ' + file + '...');
        rimraf(targetToClean +'/' + file, {}, err => {
          if (err) return console.error(err)
        });
      });
};
