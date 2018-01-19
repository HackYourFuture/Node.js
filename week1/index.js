const http = require('http');
const port = 8080;
//  create a server, and that server will take care of handling requests
//  for data, and then returning some information.
//pass back header to let the client know what types of files the server will be returning.
const server = http.createServer((request, response) => {
	console.log(request.method, request.url);
	response.writeHeader(200, {
		'content-type': 'text/html'
	});
});
// Start the HTTP server, start listening for requests
server.listen(port, (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log(`Go to http://localhost:${port} on your browser.`);
	}
});

server.on("connection", () => {
	console.log("connected");
});


function htmlMessage(message, response) {
	response.write(
		`<html>
			<head>
			</head>
			<body>
				<h1>${message}</h1>
			</body>
		</html>`
	);
}

let state = 10;
server.on('request', (request, response) => {
	console.log('New http request received', request.url);
	switch (request.url) {
		case "/state":
			htmlMessage(`The state: ${state}`, response);
			break;
		case "/add":
			htmlMessage(`Adding: ${state++}`, response);
			break;
		case "/remove":
			htmlMessage(`Removing: ${state--}`, response);
			break;
		case "/reset":
			htmlMessage(`Reset: ${state = 10}`, response);
			break;
		default:
			response.statusCode = 404;
			htmlMessage(`The page is not found__404`, response);
	}
	response.end();
});
