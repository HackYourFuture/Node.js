// /**
//  * Exercise 3: Create an HTTP web server
//  */

const http = require('http');
const fs = require('fs');


const html = fs.readFileSync("./index.html", "utf-8");


let server = http.createServer(function (req, res) {

  let path = req.url;
  if (path === "/" || path.toLowerCase() === "/ali") {
    res.end(html.replace("{{%content%}}","Hi there, Ali is here"));
  } else if (path.toLowerCase() === "/carmen") {
    res.end(html.replace("{{%content%}}","Hi there, Carmen is here"));
  } else if (path.toLowerCase() === "/ahmed") {
    res.end(html.replace("{{%content%}}","Hi there, Ahmed is here"));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Error 404: Page not found");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
