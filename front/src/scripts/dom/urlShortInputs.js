const urlInput = document.querySelector('#url_input');
const customURL = document.querySelector('#custom-url');
const schemeSelect = document.querySelector('#scheme');

export function getBody() {
  //Get data from user input
  let url = urlInput.value;
  //Remove http:// dupe
  if (url.indexOf('http') === -1) url = schemeSelect.value + url;
  const body = { url };
  if (customURL.value) body.short = customURL.value;
  return body;
}

export function clearValues() {
  urlInput.value = '';
  customURL.value = '';
}
