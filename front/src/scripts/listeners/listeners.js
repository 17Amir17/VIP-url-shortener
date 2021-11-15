import { onPostClick } from './postClick';
import { onAdvancedClick } from './advanedToggle';
import { onCopyClick } from './copyClick';
import { onAnalyticsClick } from './analyticsClick';

const postButton = document.querySelector('#post-btn');
const advancedLabel = document.querySelector('.advanced-label');
const copyButton = document.querySelector('#copy-btn');
const analyticsButton = document.querySelector('#analytics-btn');

export function initListeners() {
  postButton.addEventListener('click', onPostClick);
  advancedLabel.addEventListener('click', onAdvancedClick);
  copyButton.addEventListener('click', onCopyClick);
  analyticsButton.addEventListener('click', onAnalyticsClick);
}
