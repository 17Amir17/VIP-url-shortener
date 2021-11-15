import { onDeleteClick } from './onDeleteClick';
import { onSearchClick } from './onSearchClick';

const search = document.querySelector('#search-btn');
const deleteBtn = document.querySelector('#delete-btn');

export function initAnalyticsListeners() {
  search.addEventListener('click', onSearchClick);
  deleteBtn.addEventListener('click', onDeleteClick);
}
