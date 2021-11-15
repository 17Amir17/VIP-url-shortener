const resultDisplay = document.querySelector('#shortened-url');

export function displayResults(res) {
  resultDisplay.href = res.data.url;
  resultDisplay.innerText = res.data.url;
  resultDisplay.closest('section').classList.remove('hidden');
}
