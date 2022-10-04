/**
 * Exercise 3: Create an HTTP web server
 */
const fs = require('fs/promises');
const http = require('http');

//create a server
let server = http.createServer(async function (request, response) {
	if (request.url ==='/') {
	// return index.html
		const contents = await fs.readFile('./index.html');
		response.writeHead(200, 'ok', { 'content-type': 'text/html' });
		response.write(contents);

	} else if (request.url === './index.js') {
	// return index.js
		const contents = await fs.readFile('./index.js');
		response.writeHead(200, 'ok', { 'content-type': 'text/javascript' });
		response.write(contents);
	}

	//response.write('Hello World!'); // Sends a response back to the client
	response.end(); // Ends the response
});

server.listen(3000); // The server starts to listen on port 3000
