/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const PORT = process.env.PORT || 3000;

let server = http.createServer(async function (req, res) {
  try {
    if (req.url === "/") {
      await handleResponse(res, "index.html", "text/html");
    } else if (req.url === "/index.js") {
      await handleResponse(res, "index.js", "text/javascript");
    } else if (req.url === "/style.css") {
      await handleResponse(res, "style.css", "text/css");
    } else {
      handleUnknownPath(res);
    }
  } catch (err) {
    handleUnknownPath(res);
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}); // The server starts to listen on port 3000
async function handleResponse(res, fileName, contentType) {
  try {
    const filePath = path.join(__dirname, fileName);
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end("Contents you are looking for are Not Found");
  }
}
function handleUnknownPath(res) {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("Error 404: Page Not Found");
}
