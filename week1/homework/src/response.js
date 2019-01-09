function sendResponse(response, state, statuscode) {
  response.statusCode = statuscode;
  response.setHeader('Content-type', 'application/json');
  response.write(JSON.stringify(state));
  response.end();
}
module.exports = {
  sendResponse
}