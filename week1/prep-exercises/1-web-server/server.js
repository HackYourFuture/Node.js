/**
 * Exercise 3: Create an HTTP web server
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function (req, res) {
  const url = req.url;

  // Serve index.html for the root URL
  if (url === '/') {
    fs.readFile('index.html', function(err, data) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } 
  // Serve index.js for the /index.js URL
  else if (url === '/index.js') {
    fs.readFile('index.js', function(err, data) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.end(data);
      }
    });
  }
  // Serve style.css for the /style.css URL
  else if (url === '/style.css') {
    fs.readFile(path.join(__dirname, 'style.css'), function(err, data) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
      }
    });
  }
  // Handle other URLs with a 404 Not Found response
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
});

server.listen(3000); // The server starts to listen on port 3000