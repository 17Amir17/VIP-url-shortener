import iziToast from 'izitoast';
import { errorToast, successToast, warningToast } from '../dom/toast';
import { deleteURL } from '../shortenAPI/api';
import { hideResults } from '../dom/displayAnalytics';

export function onDeleteClick(event) {
  iziToast.question({
    timeout: 20000,
    close: false,
    overlay: true,
    displayMode: 'once',
    id: 'question',
    zindex: 999,
    title: 'Hey',
    message: 'Are you sure you want to delete link?',
    position: 'center',
    color: 'red',
    buttons: [
      [
        '<button><b>YES</b></button>',
        function (instance, toast) {
          const id = event.target.dataset.id;
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          warningToast('One moment...');
          deleteURL(id).then(
            (res) => {
              successToast('Url deleted');
              hideResults();
              document.querySelector('#short-url').value = '';
            },
            (err) => {
              errorToast('Something went wrong');
            }
          );
        },
        true,
      ],
      [
        '<button>NO</button>',
        function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        },
      ],
    ],
  });
}
