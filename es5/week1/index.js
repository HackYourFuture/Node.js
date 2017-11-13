// To run this file: node index.js
// Then in your browser: http://localhost:8080
var http = require('http');
var port = 3001;
var server = http.createServer();
let state = 10;//the one the user will be manipulating via the path option available

// Start the HTTP server, start listening for requests
server.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('api listening on port', port);
  }
});

// Create a event handler for "request"
// this is an alternative way
server.on('request', function (request, response) {

  function statusOk() { //Request path is valid => status code 200
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
  }

  function statusNotFound() { //Request path is unvalid => status code 404
    response.writeHead(404, {
      'Content-Type': 'text/html'
    });
  }

  switch (request.url) {
    case '/':
      statusOk()
      response.write(`<html><body><h1>You my friend are in the root path (${request.url})</h1></body></html>`);
      break;
    case '/state':
      statusOk()
      response.write(`<html><body><h1>The variable <code><em>state</em></code> is now ${state}</h1></body></html>`);
      break;
    case '/add':
      statusOk()
      state++;
      response.write(`<html><body><h1>OK</h1>
                        <p>the variable <code><em>state</em></code> is set from ${state - 1} to ${state}</p> 
                        </body></html>`);
      break;
    case '/remove':
      statusOk()
      state--;
      response.write(`<html><body><h1>OK</h1>
                        <p>the variable <code><em>state</em></code> is set from ${state + 1} to ${state}</p> 
                        </body></html>`);

      break;
    case '/reset':
      statusOk()
      state = 10;
      response.write(`<html><body><h1>OK</h1>
                        <p>The variable <code><em>state</em></code> is reset to ${state}</p>
                        </body></html>`);
      break;
    default:
      statusNotFound()
      response.writeHead(404, {
        'Content-Type': 'text/html'
      });
      response.write(`<html><body><h1>This path (${request.url}) is not found!!`);
      break;
  }



  response.end();
});