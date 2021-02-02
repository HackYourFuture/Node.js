/**
 * Exercise 3: Create an HTTP web server
 */

var http = require('http');
const fs = require('fs');

//create a server
let server = http.createServer(function (req, res) {
  // YOUR CODE GOES IN HERE
  if (req.url === '/' || req.url === '/index.html') {
    let data = fs.readFileSync('./index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data); // Sends a response back to the client
  } else if (req.url === '/index.js') {
    let data = fs.readFileSync('./index.js');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(data); // Sends a response back to the client
  } else if (req.url === '/style.css') {
    let data = fs.readFileSync('./style.css');
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(data); // Sends a response back to the client
  } else {
    res.write('404, there is an error, link is broken');
  }
  res.end(); // Ends the response
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server initialized successfully');
});
