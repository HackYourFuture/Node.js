/* eslint-disable no-unused-vars */

"use strict";

let state = 10;

const http = require("http");

const url = "http://localhost:8080";

function handleRequest(request, response) {
    response.setHeader("Content-Type", "text/html");
    switch (url + request.url) {
        case "http://localhost:8080/":
            response.write(`<em><h1>This is the main page</h1></em>`);
            break;
        case stateUrl:
            response.write(`<h1>This is the original state: ${state}</h1>`);
            break;
        case addUrl:
            state++;
            response.write(`<h1>OK</h1>`);
            break;
        case subtractUrl:
            state--;
            response.write(`<h1>OK</h1>`);
            break;
        case resetUrl:
            state = 10;
            response.write(`<h1>Back to the original state: ${state}</h1>`);
            break;
        default:
            response.statusCode = 404;
            const statusCode = 404;
            response.write(`<h1>This page was not found ${statusCode}</h1>`);
    }
    response.end();
}

const server = http.createServer(handleRequest);

server.listen(8080, () => {
    console.log("Server is listening on Port 8080");
})

const stateUrl = 'http://localhost:8080/state';
const addUrl = 'http://localhost:8080/add';
const subtractUrl = 'http://localhost:8080/subtract';
const resetUrl = 'http://localhost:8080/reset';
const badUrl = 'http://localhost:8080/bad';