import loadPage from '../util/loadPage.js';
import logger from '../util/logger.js';
import createRegisterSuccessView from '../views/registerSuccessView.js';
import createLoginPage from './loginPage.js';

function createRegisterSuccessPage(state) {
  const onLogin = () => {
    loadPage(createLoginPage, state);
  };

  const view = createRegisterSuccessView({ onLogin });

  return view;
}

export default createRegisterSuccessPage;
