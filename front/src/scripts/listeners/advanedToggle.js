const advancedDiv = document.querySelector('.advanced');

export function onAdvancedClick(event) {
  //Toggle advanced functionalities
  advancedDiv.hidden = !advancedDiv.hidden;
  advancedDiv.classList.toggle('hidden');
  event.target.innerText = advancedDiv.hidden
    ? 'Click here for more options ⚙'
    : 'Click here to hide ⚙';
}
