/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const PORT = process.env.PORT || 3000;

let server = http.createServer(async function (req, res) {
  try {
   
    switch (req.url) {
      case "/":
        await handleResponse(res, "index.html", "text/html");
        break;
      case "/index.js":
        await handleResponse(res, "index.js", "text/javascript");
        break;
      case "/style.css":
        await handleResponse(res, "style.css", "text/css");
        break;
      default:
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
    res.writeHead(200, { "Content-Type": contentType });
    const data = await fs.readFile(fileName,(err,data)=>{
      if(err){
        console.log(err);
      }else{
      res.end(data);
    }
    } );
   
  } catch (err) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end("Contents you are looking for are Not Found");
  }
}
function handleUnknownPath(res) {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("Error 404: Page Not Found");
}
