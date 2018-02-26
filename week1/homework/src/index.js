'use strict';

const http = require('http');

let state = 10;
const PORT = 8080;
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server started at: ${stateUrl}`);
});

function handleRequest(request, response) {
  console.log('on request', request.url);
  switch (request.url) {
    case '/':
      response.setHeader('Content-Type', 'text/html');
      response.write('<h1>Main Page</h1>');
      break;
    case '/state':
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1>Current state of the application is: ${state}</h1>`);
      break;
    case '/add':
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1>1 is added to the current state: ${state + Number(1)}</h1>`);
      state = state + 1;
      break;
    case '/subtract':
      response.setHeader('Content-Type', 'text/html');
      response.write(`<h1>1 is subtracted from the current state: ${state - '1'}</h1>`);
      state = state - 1;
      break;
    case '/reset':
      response.setHeader('Content-Type', 'text/html');
      state = 10;
      response.write(`<h1>Current state of the application is reseted: ${state}</h1>`);
      break;
    default:
      response.setHeader('Content-Type', 'text/html');
      response.write('<h1>Error 404 "Page not found"</h1>');
  }
  response.end();
}
/* /state
 * response: the current state in a HTML format
 * When the server starts, this should return '10'
 */
const stateUrl = 'http://localhost:8080/state';

/* /add
 * Response: "OK" in HTML format
 * This should add 1 to the current state
 */
// const addUrl = 'http://localhost:8080/add';

/* /subtract
 * Response: "OK" in HTML format
 * This should subtract 1 ƒrom the current state
 */
// const subtractUrl = 'http://localhost:8080/subtract';

/* /reset
 * Response: "OK" in HTML format
 * This should set the state back to '10'
 */
// const resetUrl = 'http://localhost:8080/reset';

/* Any other URL
 * Response: return error code 404: 'Not found' with a friendly message and do
 * not change the state variable
 */
// const badUrl = 'http://localhost:8080/bad';
