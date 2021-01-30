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

/*

  //read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        //Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      //Succesful response
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});





//create a server
const server = http.createServer((req, res) => {
  // YOUR CODE GOES IN HERE
  if (req.url === "/") {
    fs.readFile("./index.html", (error, file) => {
      if (error) {
        throw error;
      } else {
        res.setHeader("Content-Type", "text/html");
        res.write(file); // Sends a response back to the client
        res.end(); // Ends the response
      }
    });
  } else if (req.url === "/index.js") {
    fs.readFile("./index.js", (error, file) => {
      if (error) {
        throw error;
      } else {
        res.setHeader("Content-Type", "text/javascript");
        res.write(file);
        res.end();
      }
    });
  } else if (req.url === "/style.css") {
    fs.readFile("./style.css", (error, file) => {
      if (error) {
        throw error;
      } else {
        res.setHeader("Content-Type", "text/css");
        res.write(file);
        res.end();
      }
    });
  }
});
*/
