'use strict';

const http = require('http');

const PORT = 3000;

const DEFAULT_STATE = 10;

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = DEFAULT_STATE;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here

    const url = request.url;
    const method = request.method;

    let resObj = null;

    switch (method) {
      case 'GET':
        resObj = handleGetRequest(url, state);
        break;

      case 'POST':
        resObj = handlePostRequest(url, state);
        break;

      default:
        resObj = createResponseObj(500, null, 'Unknown request method: "' + request.method + '"');
      // break;
    }
    if (resObj.data.state !== undefined) {
      state = resObj.data.state;
    }
    response.writeHead(resObj.statusCode, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify(resObj.data));
  });

  return server;
}

function createResponseObj(statusCode, state, errorMsg) {
  let resObj = { statusCode: statusCode };

  if (errorMsg !== undefined) {
    resObj.data = { 'error': errorMsg };
  }
  if (state !== undefined && state !== null) {
    resObj.data = { 'state': state };
  }

  return resObj;
}

function handleGetRequest(url, state) {
  let resObj = null;

  switch (url) {
    case '/state':
      resObj = createResponseObj(200, state);
      break;

    case '/add':
      state++;
      resObj = createResponseObj(200, state);
      break;

    case '/subtract':
      state--;
      resObj = createResponseObj(200, state);
      break;

    case '/reset':
      state = DEFAULT_STATE;
      resObj = createResponseObj(200, state);
      break;

    default:
      resObj = createResponseObj(404, null, 'Not found');
    // break;
  }

  return resObj;
}

function handlePostRequest(url, state) {
  let resObj = null;

  switch (url) {


    default:
      resObj = createResponseObj(404, null, 'Not found');
    // break;
  }

  return resObj;
}

module.exports = {
  createServer
};
