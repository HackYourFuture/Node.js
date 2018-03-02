'use strict';
let state = 10;
const http = require('http');
function handleRequest(request, response) {
    console.log('on request', request.url);
    switch (request.url) {
        case '/state':
            const stateUrl = 'http://localhost:8080/state';
            response.setHeader('Content-Type', 'text/html');
            response.write(`<br><strong> state is ${state} </strong><br>`);
            break;

        case '/add':
            const addUrl = 'http://localhost:8080/add';
            state++;
            response.setHeader('Content-Type', 'text/html');
            response.write(`<h1>OK</h1>`);
            response.write(`<br><strong> state is  ${state} </strong><br>`);
            break;

        case '/subtract':
            const subtractUrl = 'http://localhost:8080/subtract';
            state--;
            response.setHeader('Content-Type', 'text/html');
            response.write(`<h1>OK</h1>`);
            response.write(`<br><strong> state is  ${state} </strong><br>`);
            break;

        case '/reset':
            const resetUrl = 'http://localhost:8080/reset';
            state = 10;
            response.setHeader('Content-Type', 'text/html');
            response.write(`<h1>OK</h1>`);
            response.write(`<br><strong> state is  ${state} </strong><br>`);
            break;

        default:
            const badUrl = 'localhost:8080/bad';
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/html');
            response.write(`<strong>ERROR </strong> Please use only <em>'state' 'reset' 'add' or 'subtract'! </em>`);
            response.write(`<br><strong> state is  ${state} </strong><br>`);
            break;
    }
    response.end();

}
const server = http.createServer(handleRequest);
server.listen(8080, () => {
    console.log('Server is running');
})




