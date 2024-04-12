import logger from './logger.js';

/**
 * A wrapper function for `fetch` with before and after logging
 * @param {*} url Same as for fetch
 * @param {*} options Same as for fetch
 * @returns Same as for fetch
 */
async function fetchAndLog(url, options = { method: 'GET' }) {
  logger.debug('fetch', `${options.method} ${url}`);
  const response = await fetch(url, options);
  logger.debug('status', response.status);
  return response;
}

export default fetchAndLog;
