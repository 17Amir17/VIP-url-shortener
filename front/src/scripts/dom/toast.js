import iziToast from 'izitoast';

export function successToast(message, timeout = 3000) {
  iziToast.success({
    message,
    timeout,
    position: 'bottomRight',
  });
}

export function errorToast(message, timeout = 3000) {
  iziToast.error({
    message,
    timeout,
    position: 'bottomRight',
  });
}

export function warningToast(message, timeout = 3000) {
  iziToast.warning({
    message,
    timeout,
    position: 'bottomRight',
  });
}
