'use strict';

function handleResponse(response, status, state) {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  if (status === 200) {
    response.write(JSON.stringify({ state }));
  } else {
    response.write(JSON.stringify({ error: state }));
  }
}

module.exports = handleResponse;
