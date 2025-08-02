/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const fs = require("fs").promises;
const path = require("path");

//create a server
const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/") {
      const html = await fs.readFile(
        path.join(__dirname, "index.html"),
        "utf-8"
      );
      res.setHeader("Content-Type", "text/html");
      res.write(html);
      res.end();
    } else if (req.url === "/index.js") {
      const js = await fs.readFile(path.join(__dirname, "index.js"), "utf-8");
      res.setHeader("Content-Type", "application/javascript");
      res.write(js);
      res.end();
    } else if (req.url === "/style.css") {
      const css = await fs.readFile(path.join(__dirname, "style.css"), "utf-8");
      res.setHeader("Content-Type", "text/css");
      res.write(css);
      res.end();
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.write("404 Not Found");
      res.end();
    }
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.write("Internal Server Error");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
}); // The server starts to listen on port 3000
