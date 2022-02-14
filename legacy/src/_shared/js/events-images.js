// Generates the HTML for a picture element with responsive sources
export function generatePicture({ url, classes = [], alt = '' }) {
    let image = `<img class="${classes.join(' ')}" src="${url}" alt="${alt}">`;
    return image;
}