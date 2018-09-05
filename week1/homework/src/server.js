'use strict';

const http = require('http');

function createServer(port) {
    let state = 10;

    const server = http.createServer((request, response) => {
        response.setHeader('Content-Type', 'application/json', 'charset = utf - 8');

        if (request.url === '/state') {

            response.write(JSON.stringify({ state }, null, 3));
        } else if (request.url === '/add') {
            state += 1;
            response.write(JSON.stringify({ state }));
        } else if (request.url === '/subtract') {
            state -= 1;
            response.write(JSON.stringify({ state }));
        } else if (request.url === '/reset') {
            state = 10;
            response.write(JSON.stringify({ state }));
        } else {
            const error = 'Not found';
            response.writeHead(404);
            response.write(JSON.stringify({ error }));
        }

        response.end();
    });
    return server;
}

module.exports = { createServer };