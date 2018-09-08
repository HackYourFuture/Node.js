'use strict';

const http = require('http');

const sendState = require('./responses/sendState');
const sendError = require('./responses/sendError');

const createServer = port => {
  let state = 10;

  return http.createServer(({ url }, response) => {
    url === '/'
      ? response.writeHead(302, { Location: '/state' })
      : url === '/state'
        ? sendState(response, state)
        : url === '/add'
          ? sendState(response, ++state)
          : url === '/subtract'
            ? sendState(response, --state)
            : url === '/reset'
              ? sendState(response, (state = 10))
              : ((response.statusCode = 404), sendError(response, 'Not found'));
    response.end();
  });
};
module.exports = {
  createServer
};
