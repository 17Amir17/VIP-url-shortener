import { requestLogin, requestRegister } from '../shortenAPI/userAPI';

const Swal = require('sweetalert2');
export function login() {
  let registered = false;
  Swal.fire({
    title: 'Submit your Github username',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="username">' +
      '<input id="swal-input2" class="swal2-input" type="password" placeholder="password">',
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: 'Login',
    denyButtonText: 'Register',
    showLoaderOnConfirm: true,
    allowOutsideClick: false,
    preConfirm: () => {
      //login button
      const username = document.getElementById('swal-input1').value;
      const password = document.getElementById('swal-input2').value;
      return requestLogin(username, password)
        .then((response) => {
          if (!(response === true)) {
            throw new Error(response.message);
          } else {
            register = true;
          }
          return response;
        })
        .catch((error) => {
          Swal.showValidationMessage(`Bad username or password`);
        });
    },
    preDeny: () => {
      //register button
      const username = document.getElementById('swal-input1').value;
      const password = document.getElementById('swal-input2').value;
      return requestRegister(username, password)
        .then((response) => {
          if (!(response === true)) {
            Swal.fire({
              title: `Username already exists`,
              icon: 'warning',
            });
            throw new Error(response.message);
          }
          return response;
        })
        .catch((error) => {});
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `Success`,
      });
    } else if (result.isDenied) {
      if (registered) {
        Swal.fire({
          title: `Success`,
        });
      }
    }
  });
}

function register() {}
