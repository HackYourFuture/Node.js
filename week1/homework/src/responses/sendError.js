'use strict';

const sendError = (response, error) => {
  response.setHeader('Content-Type', 'application/json', 'charset = utf-8');
  response.write(JSON.stringify({ error }));
};

module.exports = sendError;
