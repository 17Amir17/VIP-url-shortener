import '../styles/style.css';
import { initAnalyticsListeners } from './analytics/listeners';
import { initListeners } from './listeners/listeners';

if (location.href.endsWith('analytics.html')) {
  //JS for analytics page
  initAnalyticsListeners();
}else {
  //JS for main page
  initListeners();
}
