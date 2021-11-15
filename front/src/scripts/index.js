import '../styles/style.css';
import { initAnalyticsListeners } from './analytics/listeners';
import { displayUser } from './dom/login';
import { initListeners } from './listeners/listeners';
import { cookieLogin } from './shortenAPI/userAPI';

if (location.href.endsWith('analytics.html')) {
  //JS for analytics page
  initAnalyticsListeners();
}else {
  //JS for main page
  initListeners();
  cookieLogin().then(user => {if(user)displayUser(user)}, err => {}); //Try login
}
