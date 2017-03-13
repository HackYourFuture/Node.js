// To run this file: node index.js
// Then in your browser: http://localhost:8080
var http = require('http'),
    server = http.createServer(),
    state = 10,
    print = (res, req, message) => {
        console.log(`Request ${req.url} State = ${state}`);
        res.write(`<html><head><body>${message}</body></head></html>`);
    };

// Create a event handler for "request"
// this is an alternative way
server.on('request', (request, response) => {
    response.writeHead(200, {'content-type': 'text/html'});

    if (request.url === '/') print(response, request, '<h1>Welcome to my Homepage</h1>');
    else if (request.url === '/state') print(response, request, `<h1>Current State : ${state}</h1>`);
    else if (request.url === '/add') {
        state += 1;
        print(response, request, '<h1>OK</h1>');
    } else if (request.url === '/remove') {
        state -= 1;
        print(response, request, '<h1>OK</h1>');
    } else if (request.url === '/reset') {
        state = 10;
        print(response, request, '<h1>OK</h1>');
    } else print(response, request, `<img src="https://goo.gl/uu60ns" alt="Error 404: Page Not Found">`);
    
    response.end();
});

// Start the HTTP server, start listening for requests
server.listen(8080, function(error) {
    if (error) console.log(error);
    else console.log('api listening on port 8080');
});