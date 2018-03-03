'use strict';
const http = require('http');
let state = 10;
function holdState(req, res) {
  console.log('you are in the url:' + req.url);
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Context-type': 'text/html' });
      res.write(`<h1>the home page</h1>`);
      break;
    case '/state':
      res.writeHead(200, { 'Context-type': 'text/html' });
      res.write(`<h1>the state is ${state}</h1>`);
      break;
    case '/add':
      state++;
      res.writeHead(200, { 'Context-type': 'text/html' });
      res.write(`<p><strong>ok</strong> the state is ${state}</p>`);
      break;
    case '/subtract':
      state--;
      res.writeHead(200, { 'Context-type': 'text/html' });
      res.write(`<p><strong>ok</strong> the state is ${state}</p>`);
      break;
    case '/reset':
      state = 10;
      res.writeHead(200, { 'Context-type': 'text/html' });
      res.write(`<p><strong>ok</strong> the state is ${state}</p>`);
      break;
    default:
      res.writeHead(404, { 'Context-type': 'text/html' });
      res.write(`<p><strong>error 404</strong>pleas input the right url</p>`);
      break;
  }
  res.end();
}
const server = http.createServer(holdState);
server.listen(8080, () => {
  console.log('you are listning to the port 8080');
});
