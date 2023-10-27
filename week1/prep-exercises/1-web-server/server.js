/**
 * Exercise 3: Create an HTTP web server
 */

// it imports HTTP module to create a web server
const http = require("http");
// it imports fs (File System) module to read files
const fs = require("fs").promises;

//creates a new HTTP server.
// When a request (req) comes in, the function is executed, and a response (res) is prepared.
// req (Request): An object containing details about the client's request.
//res (Response): An object for sending the response back to the client.
let server = http.createServer(async function (req, res) {
  //Handling Requests for the Root URL
  // & checks if the client is requesting the root URL (http://localhost:3000/).
  if (req.url === "/") {
    try {
      //* reads the content of the index.html file. await makes sure the function waits until the file is read.
      const data = await fs.readFile("index.html", "utf8");
      //* sets the content type of the response to HTML. This tells the client's browser to interpret the response as HTML.
      res.setHeader("Content-Type", "text/html");
      //*  writes the content of index.html to the response.
      res.write(data);
    } catch (error) {
      res.write("Error reading index.html");
    }
    //* it closes the response, effectively sending it back to the client.
    res.end();
  }
  //  if the client is requesting the JavaScript file (http://localhost:3000/index.js).
  else if (req.url === "/index.js") {
    try {
      const data = await fs.readFile("index.js", "utf8");
      res.setHeader("Content-Type", "application/javascript");
      res.write(data);
    } catch (error) {
      res.write("Error reading index.js");
    }
    res.end();
  } else if (req.url === "/style.css") {
    try {
      const data = await fs.readFile("style.css", "utf8");
      res.setHeader("Content-Type", "text/css");
      res.write(data);
    } catch (error) {
      res.write("Error reading style.css");
    }
    res.end();
  }
});
server.listen(3000); // The server starts to listen on port 3000
