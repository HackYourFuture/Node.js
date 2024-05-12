import initialState from '../initialState.js';
import { getToken } from './tokenUtils.js';

/**
 * Initialize the state, including token if present from localStorage.
 * @returns A an initialized state object
 */
function initializeState() {
  const state = { ...initialState };

  const token = getToken();
  if (token) {
    state.token = token;
  }

  return state;
}

export default initializeState;
