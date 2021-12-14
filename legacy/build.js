const build = require('./lib/build');
const args = require('yargs').argv;

// options
let features = [
    'Array.prototype.includes',
    'Array.from',
    'Element.prototype.classList',
    'Element.prototype.closest',
    'Element.prototype.matches',
    'fetch',
    'matchMedia',
    'Object.assign',
    'Promise',
    'requestAnimationFrame',
    'URL',
];

let options = {
    banner: `
<base target="_blank">
<script src="https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?rum=0&features=${encodeURIComponent(features.join(','))}&clearCache=2"></script>
    `,
    src: 'src',
    dst: 'build',
    minify: args.minify ? true : false
};

console.log('\x1b[32m%s\x1b[0m', `\n==> Building ${options.minify ? "with" : "without"} minification... Let's do this!`);
build(options)
.then(() => console.log("... that was fast :)"))
.catch((ex) => console.log("... damn Daniel!" + ex));
