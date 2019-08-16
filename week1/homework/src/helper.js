class Util {
  static handleError(response) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Not found' }));
  }
  static sendFile(response, state) {
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify(state));
  }
}

module.exports = Util;
