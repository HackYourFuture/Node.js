function sendError(response){
  response.writeHead('404', {'Content-Type': 'application/json'});
  response.end(JSON.stringify({'error': 'Not found'}));
}

module.exports = sendError;
