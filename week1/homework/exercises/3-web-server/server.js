/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

//create a server
const server = http.createServer((req, res) => {
  // YOUR CODE GOES IN HERE
  let filePath = path.join(
    __dirname,
    "",
    req.url === "/" ? "index.html" : req.url
  );
  let extName = path.extname(filePath);
  let contentType = "text/html";

  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
  }

  fs.readFile(filePath, (err, file) => {
    if (err) {
      throw err;
    } else {
      res.setHeader("Content-Type", contentType);
      res.write(file); // Sends a response back to the client
      res.end(); // Ends the response
    }
  });
});

server.listen(3000); // The server starts to listen on port 3000
