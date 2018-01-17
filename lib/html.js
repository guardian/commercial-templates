const spawn = require('./task');
const hogan = require('hogan.js');

function buildHtml(fs, src, js, dst, { banner = '', footer = '', mode = 'web' } = {}) {
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

        // this is used by frontend to determine whether an advertisement label is required
        // the presence of this div will indicate that no such label should be rendered
        labelRequired: () => (text, render) => {

          const required = text.trim().toLowerCase();
          return `<div id="js-advertisement-label-required-${required}" style="display:none;"></div>`;
        },

        ages: (
            () => {

              min_ages = [];
              for(var age = 18; age < 100; age++) {
                min_ages.push({ age, selected_default: age === 25});
              }

              max_ages = [];
              for(var age = 18; age < 100; age++) {
                max_ages.push({ age, selected_default: age === 45});
              }

            return { min_ages, max_ages };
          }
      )()
    };

    return spawn(function* () {
        const dst = src.replace('src', 'build');
        const template = yield fs.readFile(src, 'utf8');
        const html = (mode === 'amp' ? '' : banner) + hogan.compile(template).render(partials) + footer;
        return fs.writeFile(dst, mode === 'amp' ? html : `${html}\n<script>${js}</script>`);
    });
}

module.exports = buildHtml;
