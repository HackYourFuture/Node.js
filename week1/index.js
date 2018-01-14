// To run this file: node index.js
// Then in your browser: http://localhost:3000
const http = require('http');
const port = 3000;
let state = 10;
const server = http.createServer((request, response) => {
	console.log(request.method, request.url);
	//console.log(response);
});
// Start the HTTP server, start listening for request
server.listen(port, (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log('api listening on port', port);
	}
});
// Create a event handler for "request"
// this is an alternative way
server.on('request', (request, response) => {
	console.log('New http request received', request.url);
	switch (request.url) {
		case "/state":
			response.setHeader('content-type', 'text/html');
			response.write(`<html><head></head><body><h1>The state :${state}</h1></body></html>`);
			response.end();
			break;
		case "/add":
			response.setHeader('content-type', 'text/html');
			response.write(`<html><head></head><body><h1>Adding: ${state++}</h1></body></html>`);
			response.end();
			break;
		case "/remove":
			response.setHeader('content-type', 'text/html');
			response.write(`<html><head></head><body><h1>Removing: ${state--}</h1></body></html>`);
			response.end();
			break;
		case "/reset":
			response.setHeader('content-type', 'text/html');
			response.write(`<html><head></head><body><h1>reset: ${state = 10}</h1></body></html>`);
			response.end();
			break;
		default:
			response.statusCode = 404;
			response.write(`<html><head></head><body><h1>The page not found__${response.statusCode}</h1></body></html>`); response.end();
			response.end();

	}
});
server.on("connection", () => {
	console.log("connected");
});
