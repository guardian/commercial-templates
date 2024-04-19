module.exports = async (page, scenario, vp) => {
  await page.waitForTimeout(() => {
    return document.fonts.ready.then(() => {
      console.log('Fonts loaded');
      document.getElementsByTagName('body')[0].style['-webkit-font-smoothing'] = 'none';
      return true;
    });
  });
};