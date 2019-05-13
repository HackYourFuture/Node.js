/**
 * handle the response of the server
 * @param {*} response the response
 * @param {number} status the value of the status code
 * @param {variable or string} value the value of the state or the error
 */

function handleResponse(response, status, value) {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  if (status === 200) {
    response.write(JSON.stringify({ state: value }));
  }
  else {
    response.write(JSON.stringify({ error: value }));
  }
}

module.exports = {
  handleResponse
};
