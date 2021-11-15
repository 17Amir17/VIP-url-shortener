import { showLoader, hideLoader } from '../dom/loader';
import { successToast, errorToast } from '../dom/toast';
import { getBody, clearValues } from '../dom/urlShortInputs';
import { displayResults } from '../dom/urlShortResults';
import { postURL } from '../shortenAPI/api';

export function onPostClick(event) {
  //Request a new shortened url
  const body = getBody();

  // Validate data
  if (!legitUrl(body.url) || (body.short && body.short.length > 50)) {
    hideLoader();
    errorToast('Bad URL');
    return;
  }

  //Show loader and request shortened link
  showLoader();
  postURL(body).then(
    (res) => {
      displayResults(res);
      clearValues();
      hideLoader();
      successToast('Shortened URL!');
    },
    (err) => {
      const message = err.response
        ? err.response.data.message
        : 'something went wrong';
      hideLoader();
      errorToast(message);
    }
  );
}

function legitUrl(url) {
  if (url.length > 1000) return false;
  if (!url.includes('.')) return false;
  try {
    url = new URL(url);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}
