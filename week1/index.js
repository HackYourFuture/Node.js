// Determine the port and the initial value of state
var state = 10;
var port = 8080;

// Start the HTTP server
var http = require('http');
var server = http.createServer(handleRequest);


// This function is the handler for "response"
// It sends the requested information to the user
function handleResponse(response, statusCode, h1Text, pText) {
    response.writeHead(statusCode, {'content-type': 'text/html'});
    response.write('<html><head></head><body><h1>' + h1Text + '</h1><p>' + pText + '</p></body></html>');
    response.end();// End the response.
}

// This function is the handler for "request"
// It understands the request, processes it
// and then sends it to the handler for "response"
function handleRequest(request, response) {
    console.log('New http request received', request.url);
    var statusCode = 200;// Set the default status code.
    var h1Text = 'OK';// Set the default text of the response title.
    var pText = 'This site will manipulate the value of state.';// Set the default text of the response message.
    switch (request.url) {
        case '/':
            h1Text = 'Welcome!';
            break;
        case '/state':
            h1Text = 'state';
            pText = 'The current value of state is: ' + state + '.';
            break;
        case '/add':
            state++;
            pText = '1 was added to state.';
            break;
        case '/remove':
            state--;
            pText = '1 was subtracted from state.';
            break;
        case '/reset':
            state = 10;
            pText = 'The value of state was reset to 10.';
            break;
        default:
            statusCode = 404;
            h1Text = 'Oops!';
            pText = "We can't seem to find the page you're looking for.";
                       }
    handleResponse(response, statusCode, h1Text, pText);// Call the "response" handler.
}

// Start listening for requests
server.listen(port, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('api listening on port', port);
    }
});