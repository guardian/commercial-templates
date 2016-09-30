const build = require('./lib/build');
const args = require('yargs').argv;

// options
const options = {
    banner: '<base target="_top" href="https://www.theguardian.com">',
    src: 'src',
    dst: 'build',
    minify: args.minify
};

console.log('\x1b[32m%s\x1b[0m', `\n==> Building ${options.minify ? "with" : "without"} minification... Let's do this!`);
build(options)
.then(() => console.log("... that was fast :)"))
.catch((ex) => console.log("... damn Daniel!" + ex));
