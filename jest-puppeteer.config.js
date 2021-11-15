module.exports = {
  launch: {
    headless: true, // Redirect test only works with headless on true
    slowMo: 0,
    args: ['--disable-web-security'],
    defaultViewport: {
      width: 800,
      height: 400,
    },
  },
};
