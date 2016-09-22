const rimraf = require('rimraf');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const targetToClean = './build';

console.log('Time to clean...');
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
