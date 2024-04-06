/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const fs = require('fs');
const PORT = 3000;

// Create a server
let server = http.createServer(function (req, res) {
  const url = req.url;

  res.setHeader(
    "Content-Type", 
    "text/html; charset=utf-8;"
  );

  switch(url) {
    case '/':
      fs.readFile('./index.html', {}, function(error, data) {
        if (error) {
          res.write("Error reading HTML file");
        } else {
          res.write(data);
        }
        res.end();
      });
      break;

    case '/index.js':
      fs.readFile('./index.js', {}, function(error, data) {
        if (error) {
          res.write("Error reading JavaScript file");
        } else {
          res.setHeader("Content-Type", "text/javascript");
          res.write(data);
        }
        res.end();
      });
      break;

    case '/styles.css':
      fs.readFile('./styles.css', {}, function(error, data) {
        if (error) {
          res.write("Error reading CSS file");
        } else {
          res.setHeader("Content-Type", "text/css");
          res.write(data);
        }
        res.end();
      });
      break;

    default:
      res.write("<h1>!!! 404 !!!</h1>");
      res.end();
  };
});

server.listen(PORT);