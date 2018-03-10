'use strict';
const http = require('http');

let state = 10;

let htmlOK = '<!DOCTYPE><html><head><title>Diana Site</title></head><body><div><h1>OK</h1></div></body>';
let htmlError = '<!DOCTYPE><html><head><title>Diana Site</title></head><body><div><h1>Error 404: page not found!</h1></div></body>';

function onRequest(request, response) {
    console.log('==request.url==', request.url);
    if (request.url == '/' || request.url == '/state') {
        response.writeHead(200, { "Content-type": "text/html" });
        response.write('<!DOCTYPE><html><head><title>Diana Site</title></head><body><div><h1>The state is: <span style = "color: red;">' + state + '</span></h1></div></body>');
        response.end();
    } else if (request.url == '/add') {
        response.writeHead(200, { "Content-type": "text/html" });
        state++;
        response.write(htmlOK);
        response.end();
    } else if (request.url == '/subtract') {
        response.writeHead(200, { "Content-type": "text/html" });
        state--;
        response.write(htmlOK);
        response.end();
    } else if (request.url == '/reset') {
        response.writeHead(200, { "Content-type": "text/html" });
        state = 10;
        response.write(htmlOK);
        response.end();
    } else {
        response.writeHead(404, { "Content-type": "text/html" });
        response.write(htmlError);
        response.end();
    }
}


http.createServer(onRequest).listen(3000);
console.log("Server is listening...");

