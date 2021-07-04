/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const fs = require('fs');
//create a server
let server = http.createServer(function (req, res) {
  // YOUR CODE GOES IN HERE
  if (req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }

  if (req.url === '/index.js') {
    fs.readFile('index.js', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(data);
    });
  }

  if (req.url === '/style.css') {
    fs.readFile('style.css', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  }
});

server.listen(4000); // The server starts to listen on port 3000

// Note: My computer port 3000 was already taken thats why i changed it to port 4000
