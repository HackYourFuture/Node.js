/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
var fs = require('fs').promises;
//create a server
let server = http.createServer(async function (req, res) {
  // YOUR CODE GOES IN HERE
  try {
    if (req.url === "/") {
      const data = await fs.readFile("index.html");
      res.writeHead(200, { 'Content-Type': 'text/html' });
	  res.write(data);
      res.end();
    } else if (req.url === "/index.js") {
      const data = await fs.readFile("index.js");
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
	  res.write(data);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end("Contents you are looking are Not Found");
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end();
  }
});

server.listen(3000); // The server starts to listen on port 3000
