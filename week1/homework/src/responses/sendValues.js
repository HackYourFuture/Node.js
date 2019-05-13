'use strict';

function handleResponse(response, status, value) {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  if (status === 200) {
    response.write(JSON.stringify({ state: value }));
  } else {
    response.write(JSON.stringify({ error: value }));
  }
}

module.exports = handleResponse;
