import loadPage from '../util/loadPage.js';
import logger from '../util/logger.js';
import fetchAndLog from '../util/fetchAndLog.js';
import createRegisterView from '../views/registerView.js';
import createRegisterSuccessPage from './registerSuccessPage.js';
import createLoginPage from './loginPage.js';

function createRegisterPage(state) {
  const updateView = (updates) => {
    state = { ...state, ...updates };
    logger.debug('state', state);
    view.update(state);
  };

  const onSubmit = async (username, password) => {
    try {
      const response = await fetchAndLog('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      logger.debug('response', data);

      loadPage(createRegisterSuccessPage, state);
    } catch (error) {
      state = { ...state, error: error.message };
      updateView(state);
    }
  };

  const onLogin = () => {
    loadPage(createLoginPage, state);
  };

  const view = createRegisterView({ onSubmit, onLogin });

  return view;
}

export default createRegisterPage;
