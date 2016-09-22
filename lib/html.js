const spawn = require('./task');
const hogan = require('hogan.js');

function buildHtml(fs, src, js, dst, { banner = '', footer = '' } = {}) {
    const partials = {
        svg: () => (text, render) => {
            const svgName = text.trim();
            try {

                const svg = fs.readFileSync(`src/_shared/svgs/${svgName}.svg`, 'utf8');
                return svg
                    .replace('<svg ', `<svg aria-hidden="true" class="icon icon--${svgName}" `)
                    .replace(/\r?\n|\r/g, '');

            } catch (_) {
                return '';
            }
        }
    };

    return spawn(function* () {
        const dst = src.replace('src', 'build');
        const template = yield fs.readFileAsync(src, 'utf8');
        const html = banner + hogan.compile(template).render(partials) + footer;
        return fs.writeFileAsync(dst, `${html}\n<script>${js}</script>`);
    });
}

module.exports = buildHtml;
