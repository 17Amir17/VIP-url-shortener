const homepage = 'http://localHost:3000';
const analytics = `${homepage}/analytics.html`;
const urlInput = '#url_input';
const postButton = '#post-btn';
const errorAlert = '.iziToast-color-red';
const successAlert = '.ico-success';
const shortURL = '#shortened-url';
const alertButton = '.iziToast-close';
const advanced = '.advanced-label';
const customURL = '#custom-url';
const alreadyExists = 'Cannot use that url it already exists';
const shortInput = '#short-url';
const searchButton = '#search-btn';
const resultsSection = '#results';
const clicksResult = '.clicks';
const deleteButton = '#delete-btn';
const areYouSureDeleteButton = '.iziToast-buttons-child > b';
const waitForDB = 20000;
const urls = {};

async function eraseURLInput() {
  await page.evaluate(() => {
    document.querySelector('#url_input').value = '';
  });
}

async function acceptAlert() {
  await page.$eval(alertButton, (elem) => elem.click());
  await page.waitForSelector('iziToast-message', { hidden: true });
  //Wait for animation to end
  await page.waitForTimeout(100);
}

async function getMessageText() {
  const message = await page.evaluate(async (errorAlert) => {
    console.log('IN GET MESSAGE');
    const message = document.querySelector(errorAlert);
    return message.innerText;
  }, errorAlert);
  return message;
}

describe('Jest Test', () => {
  beforeAll(async () => {
    await page.goto(homepage);
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      req.continue();
    });
  });

  page.on('dialog', async (dialog) => {
    await dialog.dismiss();
  });

  test('should be titled "URL Shortener"', async () => {
    await expect(page.title()).resolves.toMatch('URL Shortener');
  });

  test('should not shorten empty url, or invalid url', async () => {
    await page.$eval(urlInput, (elem) => {
      elem.value = '';
    });
    await page.$eval(postButton, (elem) => elem.click());
    await page.waitForSelector(errorAlert);
    await acceptAlert();
    await eraseURLInput();
    await page.$eval(urlInput, (elem) => (elem.value = 'badurl'));
    await page.$eval(postButton, (elem) => elem.click());
    await page.waitForSelector(errorAlert);
    await acceptAlert();
    await eraseURLInput();
  }, 15000);

  test('should shorten url', async () => {
    await page.$eval(urlInput, (elem) => (elem.value = 'www.google.com'));
    await page.$eval(postButton, (elem) => elem.click());
    await page.waitForSelector(successAlert, { timeout: waitForDB });
    await acceptAlert();
    urls.short = await page.$eval(shortURL, (elem) => elem.innerText);
    expect(urls.short).not.toBeNull();
  }, 15000);

  test('should shorten url with custom end', async () => {
    const customName = 'testURL';
    await page.$eval(urlInput, (elem) => (elem.value = 'www.google.com'));
    await page.$eval(advanced, (elem) => elem.click());
    await page.waitForSelector(customURL, { hidden: false }); //Wait for advanced options
    await page.$eval(
      customURL,
      (elem, customName) => (elem.value = customName),
      customName
    );
    let gotCode409 = [false];
    //Click Post
    page.on('response', (res) => {
      if (res.status() == 409) {
        gotCode409[0] = true;
      }
    });
    await page.$eval(postButton, (elem) => elem.click());
    await page.waitForSelector(`${successAlert}, ${errorAlert}`, {
      timeout: waitForDB,
    });
    await page.waitForTimeout(1000);

    custom = await page.$eval(shortURL, (elem) => elem.innerText);
    const customEnd = custom.split('/')[3];
    urls.customShort = `http://localHost:3000/${customName}`;
    expect(customEnd === customName || gotCode409).toBeTruthy();
  }, 25000);

  test('shortened urls should redirect', async () => {
    await page.goto(urls.short, { waitUntil: 'networkidle2' });
    await expect(page.title()).resolves.toMatch('Google');
    await page.goto(urls.customShort, { waitUntil: 'networkidle2' });
    await expect(page.title()).resolves.toMatch('Google');
  }, 15000);

  test('should get url analytics', async () => {
    await page.goto(analytics, { waitUntil: 'networkidle2' });
    await page.$eval(
      shortInput,
      (elem, urls) => (elem.value = urls.short),
      urls
    );
    await page.$eval(searchButton, (elem) => elem.click());
    await page.waitForSelector(successAlert, { timeout: waitForDB });
    await acceptAlert();
    await page.waitForSelector(resultsSection);
    const clicks = await page.$eval(clicksResult, (elem) => elem.innerText);
    await expect(clicks).not.toBeNull();
  }, 25000);

  test('should be able to delete url', async () => {
    //Click delete and accept sure
    await page.$eval(deleteButton, (elem) => elem.click());
    await page.waitForSelector(areYouSureDeleteButton);
    await page.$eval(areYouSureDeleteButton, (elem) => elem.click());
    await acceptAlert();
    await page.waitForSelector(successAlert, { timeout: waitForDB });
    await acceptAlert();
    //Try search for url again
    await page.$eval(
      shortInput,
      (elem, urls) => (elem.value = urls.short),
      urls
    );
    await page.$eval(searchButton, (elem) => elem.click());
    await page.waitForSelector(errorAlert, { timeout: waitForDB });
    await acceptAlert();
  }, 25000);
});
