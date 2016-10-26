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
    'Object.assign',
    'Promise',
    'requestAnimationFrame'
]
const options = {
    banner: `
        <base target="_blank" href="https://www.theguardian.com">
        <script src="https://polyfill.guim.co.uk/v2/polyfill.min.js?features=${features.join(',')}"></script>
    `,
    src: 'src',
    dst: 'build',
    minify: args.minify
};

console.log('\x1b[32m%s\x1b[0m', `\n==> Building ${options.minify ? "with" : "without"} minification... Let's do this!`);
build(options)
.then(() => console.log("... that was fast :)"))
.catch((ex) => console.log("... damn Daniel!" + ex));
