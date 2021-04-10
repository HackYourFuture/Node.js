/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const fs = require('fs');

//create a server
let server = http.createServer(function (req, res) {
  // YOUR CODE GOES IN HERE
  fs.readFile('./index.html', (err, data) => {
    if (err) throw err;

    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }

    if (req.url === '/index.js') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('Hello World!');
    }
  });
});

server.listen(5000); // The server starts to listen on port 3000

// PORT 3000 DIDN'T WORK ON MY LAPTOP
