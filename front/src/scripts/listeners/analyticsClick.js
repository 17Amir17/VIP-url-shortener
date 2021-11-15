import iziToast from 'izitoast';
export function onAnalyticsClick(event) {
  iziToast.question({
    timeout: 20000,
    close: false,
    overlay: true,
    displayMode: 'once',
    id: 'question',
    zindex: 999,
    title: 'Hey',
    message: 'Are you sure you want to check analytics?',
    position: 'center',
    color: 'blue',
    buttons: [
      [
        '<button><b>YES</b></button>',
        function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          location.href = 'analytics.html';
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
