import { errorToast, successToast } from '../dom/toast';
import { getStats } from '../shortenAPI/api';
import { showLoader, hideLoader } from '../dom/loader';
import { displayAnalytics } from '../dom/displayAnalytics';
const searchInput = document.querySelector('#short-url');
export function onSearchClick(event) {
  showLoader();
  const shortURL = getURLCode(searchInput.value);
  getStats(shortURL).then(
    (data) => {
      try {
        if (data.data === false) errorToast('URL not found');
        else {
          successToast('Found URL!');
          displayAnalytics(data.data);
        }
      } catch (error) {
        errorToast('Something went wrong');
      } finally {
        hideLoader();
      }
    },
    (err) => {
      const message = err.response
        ? err.response.data.message
        : 'something went wrong';
      hideLoader();
      errorToast(message || 'something went wrong');
    }
  );
}

function getURLCode(url) {
  try {
    return url.substring(url.lastIndexOf('/') + 1);
  } catch (error) {
    return false;
  }
}
