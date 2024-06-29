const http = require('http');
const fs = require('fs');

// Create a server
let server = http.createServer(function (req, res) {
  // Handle requests based on URL
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the home page');
    res.end();
  } else if (req.url === '/index.js') {
    fs.readFile('index.js', 'utf8', function(err, data) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Error reading file');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(data);
        res.end();
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
});

server.listen(3000);
console.log("Listening on port 3000");
