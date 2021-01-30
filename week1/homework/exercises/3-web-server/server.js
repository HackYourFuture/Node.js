/**
 * Exercise 3: Create an HTTP web server
 */

var http = require('http');
var fs = require('fs');




//create a server
let server = http.createServer(function (req, res) {
  // YOUR CODE GOES IN HERE
  fs.readFile(
    './index.html', (err, html) => {
      if (err) {
        throw err;
      }
      if (req.url === "/") {
        res.writeHeader(200, { "Content-Type": "text/html" })
        res.write("Hello World!!!")
        res.end()
      }
      if (req.url === "/script.js") {
        res.writeHeader(200, { "Content-Type": "text/html" })
        res.write(html);
        res.end()
      }
    });
});
server.listen(3000); // The server starts to listen on port 3000