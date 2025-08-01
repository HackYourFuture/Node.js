/**
 * Exercise 3: Create an HTTP web server
 */

import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";
const port = 3000;

const CONTENT_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create a server
const server = http.createServer(async (req, res) => {
  // YOUR CODE GOES IN HERE
  try {
    if (req.method === "GET") {
      let filePath;
      let contentType = "text/plain";
      if (req.url === "/") {
        filePath = path.join(__dirname, "index.html");
        contentType = CONTENT_TYPES[".html"];
      } else if (req.url === "/index.js") {
        filePath = path.join(__dirname, "index.js");
        contentType = CONTENT_TYPES[".js"];
      } else if (req.url === "/style.css") {
        filePath = path.join(__dirname, "style.css");
        contentType = CONTENT_TYPES[".css"];
      }
      const data = await fs.readFile(filePath);
      res.setHeader("Content-Type", contentType);
      res.write(data); // Sends a response back to the client
      res.end(); // Ends the response
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "Text/plain" });
    res.end(`Server Error: ${error.message}`);
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); // The server starts to listen on port 3000
