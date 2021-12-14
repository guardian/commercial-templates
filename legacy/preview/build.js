const rollup = require('rollup').rollup;
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const uglify = require('rollup-plugin-uglify');
const minify = require('uglify-js').minify;

console.log('\x1b[32m%s\x1b[0m', '\n==> Building preview...')

rollup({
  entry: './preview/src/js/main.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    babel({
      exclude: ['./node_modules/**']
    }),
    nodeResolve({
        jsnext: false,
        module: false,
        main: true
    }),
    commonjs(),
    uglify({}, minify)
  ]
})
.then((bundle) => {
  bundle.write({
    dest: './preview/public/main.js',
    format: 'iife',
    moduleName: 'main'
  });
})
.then(() => console.log('... preview has been built :)\n'))
.catch((error) => {
  console.error(error);
});