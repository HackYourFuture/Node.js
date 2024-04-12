import createHomePage from './pages/homePage.js';
import createLoginPage from './pages/loginPage.js';
import loadPage from './util/loadPage.js';
import logger from './util/logger.js';
import { getToken } from './util/tokenUtils.js';
import initializeState from './util/initializeState.js';

function loadApp() {
  // Set the desired log level
  logger.setLevel('debug');

  const state = initializeState();

  if (state.token) {
    loadPage(createHomePage, state);
  } else {
    loadPage(createLoginPage, state);
  }
}

window.addEventListener('load', loadApp);
