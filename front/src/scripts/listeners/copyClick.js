import iziToast from 'izitoast';
const anchor = document.querySelector('#shortened-url');
export function onCopyClick(event) {
  //Copy textto clipboard
  navigator.clipboard.writeText(anchor.href);
  iziToast.success({
    message: 'Coppied to clipboard!',
    timeout: 1500,
  });
}
