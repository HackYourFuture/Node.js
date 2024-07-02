const { readFile } = require("fs");
const express = require("express");
const app = express();
const PORT = 3000;
const path = {
  root: "/",
  "index.js": "/index.js",
  "style.css": "/style.css",
};
app.get(path.root, (req, res) => {
  handleResponse(res, "index.html", "text/html");
});
app.get(path["index.js"], (req, res) => {
  handleResponse(res, "index.js", "text/javascript");
});
app.get(path["style.css"], (req, res) => {
  handleResponse(res, "style.css", "text/css");
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
function handleResponse(res, fileName, contentType) {
  readFile(fileName, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.contentType = "text/html";
      res.end("Contents you re looking are Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
}
