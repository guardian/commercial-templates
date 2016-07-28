const spawn = require('./task');

function buildHtml(fs, src, js, dst) {
    return spawn(function* () {
        const dst = src.replace('src', 'build');
        const html = yield fs.readFileAsync(src);
        return fs.writeFileAsync(dst, `${html}\n<script>${js}</script>`);
    });
}

module.exports = buildHtml;
