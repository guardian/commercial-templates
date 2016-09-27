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
        },

        ages: (
            () => {

              min_ages = [];
              for(var age = 18; age < 100; age++) {
                min_ages.push({age: age, selected_default: age === 25});
              }

              max_ages = [];
              for(var age = 18; age < 100; age++) {
                max_ages.push({age: age, selected_default: age === 45});
              }

            return {min_ages: min_ages, max_ages: max_ages};
          }
      )()
    };

    return spawn(function* () {
        const dst = src.replace('src', 'build');
        const template = yield fs.readFileAsync(src, 'utf8');
        const html = banner + hogan.compile(template).render(partials) + footer;
        return fs.writeFileAsync(dst, `${html}\n<script>${js}</script>`);
    });
}

module.exports = buildHtml;
