'use strict';

// Write the homework code in this file

const http = require('http');
const path = require('path');
const stateUrl = 'http://localhost:8080/state';
const addUrl = 'http://localhost:8080/add';
const subtractUrl = 'http://localhost:8080/subtract';
const resetUrl = 'http://localhost:8080/reset';
const badUrl = 'http://localhost:8080/bad';
const port = 8080;

let state = 10;

function htmlOutput(response, stateCase) {
    response.setHeader('Content-Type', 'text/html');
    response.write(`
    <!html>
    <html>
      <head>
        <title>Hello</title>
        <link href="styles.css" type="text/css" rel="stylesheet"/>
      </head>
      <body>
        <h1>OK!</h1>
        <h2>${stateCase}</h2>
      </body >
    </html >
    `);
}

function handleRequest(request, response) {
    console.log(request.method, request.url);

    switch (request.url) {
        case '/state':
            htmlOutput(response, state);
            break;
        case '/add':
            htmlOutput(response, state + 1);
            break;
        case '/subtract':
            htmlOutput(response, state - 1);
            break;
        case '/reset':
            htmlOutput(response, state);
            break;
        default:
            htmlOutput(response, 'This URL is not available. Please make sure that you have typed the correct URL.');
    }
    response.end();
}


const server = http.createServer(handleRequest);

server.listen(port, () => {
    console.log(`Server started http://localhost:${port}`);
});
