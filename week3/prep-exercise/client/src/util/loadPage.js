import logger from './logger.js';

/**
 * Load an application page
 * @param {*} pageFactoryFn Factory function for the page to load
 * @param {*} state State object to be passed to the page
 */
function loadPage(pageFactoryFn, state) {
  logger.debug('loadPage', pageFactoryFn.name.replace('create', ''));
  logger.debug('state', state);
  const appRoot = document.getElementById('app-root');
  appRoot.innerHTML = '';

  const page = pageFactoryFn(state);
  appRoot.appendChild(page.root);
}

export default loadPage;
