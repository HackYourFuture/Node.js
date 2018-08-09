function sendJsonResponse(response, state){
  response.writeHead('200', {'Content-Type': 'application/json'});
  response.end(JSON.stringify({'state': state}));

}

module.exports = sendJsonResponse;
