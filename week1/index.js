// Then in your browser: http://localhost:8000
let http = require('http');

//I added this package to deal with files.
let fs = require('fs');

//I think this is not the best way to add style file, but it a good example to use 'fs' pakage.
let style = fs.readFileSync("style.css")

// This is the magic number :-)
const port = 8000;
let state = 10;
let server = http.createServer();
let info;

// Start the HTTP server, start listening for requests
server.listen(port, function (error) {
	if (error) {
		console.log(error);
	} else {
		console.log('api listening on port', port);
	}
});

// Create a event handler for "request" and calling render function. 

server.on('request', function (request, response) {
	response.setHeader('content-type', 'text/html');
	switch (request.url) {
		case '/':
			info = 'Create HTML server';
			renderHtml();
			break;
		case '/add':
			state++;
			info = 'Add one to counter';
			renderHtml();
			break;
		case '/remove':
			state--;
			info = 'Substract one from counter';
			renderHtml();
			break;
		case '/reset':
			state = 10;
			info = 'Reset counter';
			renderHtml();
			break;
		default:
			info = 'Error code 404: Not found';
			renderHtml();


	}
//this function is responsible to show HTML.
	function renderHtml() {	
		response.write('<html><title>Hallo NodeJs</title>' + style + '<head></head><body><h1>' + info + 
					   '</h1><h1 id="counter">' + state + '</h1></body></html>');
	}
	response.end();
});
