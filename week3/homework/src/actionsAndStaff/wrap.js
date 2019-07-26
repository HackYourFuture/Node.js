'use strict';

const handleError = require('./handleError');

function wrap(func, responseStatus) {
  return async (request, response) => {
    try {
      response.status(responseStatus ? responseStatus : 200).json(await func(request, response));
    } catch (error) {
      response.status(error.statusCode || 500).json(handleError(error));
    }
  };
}

module.exports = wrap;
