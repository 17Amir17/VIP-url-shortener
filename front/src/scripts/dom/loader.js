import loader from '../../../assets/loader.svg';
import iziToast from 'izitoast';

export function showLoader() {
  iziToast.show({
    title: 'Loading',
    message: 'Please wait...',
    position: 'center', // position the loader in the middle of the page
    class: 'izitoast_loader', // to target the loader when you want to close it
    overlay: true, // make sure nothing is clickable in the background
    image: loader, // URI to an animated loader svg. examples: https://github.com/SamHerbert/SVG-Loaders
    timeout: false, // prevent it from closing until you want it to.
  });
}

export function hideLoader() {
  try {
    const loaderElem = document.querySelector('.izitoast_loader');
    if (loaderElem) iziToast.hide({}, loaderElem);
  } catch (e) {
    console.log(e);
  }
}
