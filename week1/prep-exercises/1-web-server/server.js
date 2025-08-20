/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const fs = require("fs").promises;

//create a server
let server = http.createServer(async function (req, res) {
  try {
    if (req.url === "/") {
      const html = await fs.readFile("index.html");
      res.setHeader("Content-Type", "text/html");
      res.write(html);
      res.end();
    } else if (req.url === "/index.js") {
      const js = await fs.readFile("index.js");
      res.setHeader("Content-Type", "application/javascript");
      res.write(js);
      res.end();
    } else if (req.url === "/style.css") {
      const css = await fs.readFile("style.css");
      res.setHeader("Content-Type", "text/css");
      res.write(css);
      res.end();
    } else {
      res.statusCode = 404;
      res.write("Not Found");
      res.end();
    }
  } catch (error) {
    res.statusCode = 500;
    res.write("Server error");
    res.end();
  }
});

server.listen(3000); // The server starts to listen on port 3000

