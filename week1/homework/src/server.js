'use strict';

let state = 10;

function handleRequest(request, response) {
  try {
    switch (request.url) {
      case '/add':
        state++;
        break;
      case '/subtract':
        state--;
        break;
      case '/reset':
        state = 10;
        break;
    }
    const stateJSON = { 'state': state };
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(stateJSON, null, 2));
  }
  catch (err) {
    const errorJSON = { 'error': 'Not found' };
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(errorJSON, null, 2));
  }

  response.end();
}

module.exports = {
  handleRequest
};
