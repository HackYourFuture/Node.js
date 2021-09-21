/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const fs = require("fs");

const prepareResponse = (res, statusCode, contentType, data) => {
  res.writeHead(statusCode, contentType === false ? undefined : contentType);
  res.write(data);
};
const processTheRequest = (filePath, req, res, fileType) => {
  try {
    const data = fs.readFileSync(filePath, { encoding: "utf8" });
    prepareResponse(res, 200, { "Content-Type": `text/${fileType}` }, data);
  } catch (err) {
    const errorMessage = "Contents you are looking are Not Found";
    prepareResponse(res, 400, false, errorMessage);
  }
};
//create a server
let server = http.createServer(function (req, res) {
  if (req.url === "/") {
    processTheRequest("./index.html", req, res, "html");
  } else if (req.url === "/index.js") {
    processTheRequest("./index.js", req, res, "javascript");
  } else if (req.url === "/style.css") {
    processTheRequest("./style.css", req, res, "css");
  }
  res.end();
});

server.listen(3000); // The server starts to listen on port 3000
