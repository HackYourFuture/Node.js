/**
 * handle the response of the server
 * @param {http.ServerResponse} response the response
 * @param {number} status the value of the status code
 * @param {variable or string} state the value of the state or the error
 */

function handleResponse(response, status, state) {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  if (status === 200) {
    response.write(JSON.stringify({ state }));
  }
  else {
    response.write(JSON.stringify({ error: state }));
  }
}

module.exports = {
  handleResponse
};
