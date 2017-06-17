/*global console*/
"use strict";
//here the global variables
let state = 10;
const port = 3000;
// Start the HTTP server
let  http = require('http');
let  server = http.createServer();
//function to build the response and specifies the data type
function updateResponse(response, message) {
    response.setHeader('content-type', 'text/html');
    response.write('<html><head></head><body><h1>' + message + '</h1></body></html>');
    response.end();
}
//The function will show the error if the user wrote a url that does not exist, this Function Will be called later
function updateError(error, response) {
	response.setHeader('content-type', 'text/html');
	response.write('<html><head></head><body><h1>' + error + '</h1></body></html>');
	response.end();
}
//this Function within the event to check for URL and The state changes accordingly, as does the appropriate message
server.on('request', function makeRequest(request, response) {
	var message;
	switch (request.url) {
		case '/':
		//localhost:3000
			message = 'You got it';
			updateResponse(response, message);
			break;
		case '/state':
		//localhost:3000/state
			message = 'The state is: ' + state;
			updateResponse(response, message);
			break;
		case '/add':
		//localhost:3000/add			
			state++;
			message = 'The state is: ' + state;
			updateResponse(response, message);
			break;
		case '/remove':
		//localhost:3000/remove
			state--;
			message = 'The state is: ' + state;
			updateResponse(response, message);
			break;
		case '/reset':
		//localhost:3000/reset		
			state = 10;
			message = 'you reset The state to: ' + state;
			updateResponse(response, message);
			break;
		default:
		//localhost:3000/ Any other URL
			response.statusCode = 404;
			//function will show the error
			updateError("error: " + response.statusCode +  " (Not found)", response);
	} 
});
// Start the HTTP server,  start listening for requests
server.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('api listening on port', port);
    }
});
