/**
 * Exercise 3: Create an HTTP web server
 */

 

/*

 ps:(i have tried to exercise in 2 ways,)

    const http = require("http");
    const fs = require("fs");

//create a server
let server = http.createServer(function (req, res) {
    // YOUR CODE GOES IN HERE
    // reading the html file and setting it's value to content variable in order to send it within our response
    if (req.url === "/") {
        const content = fs.readFileSync("./index.html", "utf8");

        res.writeHead(200 , {"Content-Type" : "text/html"});

        // when i use normal syntax res.write(content); it  works only when i used fs.readFileSync to store the data
        // however when i use fs.readfile then i try to put content just like line 23 it won't work unless i put it like this `${content}` ,
        // would you please explain to me what is the reason for that ?
        res.write(content); // Sends a response back to the client
         res.end(); // Ends the response
    } else if (req.url === "/index.js") {
        const content = fs.readFileSync("./index.js", "utf8");
				res.writeHead(200 , {"Content-Type" : "text/javascript"});
        res.write(content); // Sends a response back to the client
        res.end(); // Ends the response
    } else if (req.url === "/style.css") {
        const content = fs.readFileSync("./node_modules/style.css", "utf8");
				res.writeHead(200 , {"Content-Type" : "text/css"});
        res.write(content); // Sends a response back to the client
         res.end(); // Ends the response
    }
    // handle the case when non-existing url is requested
    else {
			res.writeHead(200 , {"Content-Type" : "text/html"});
        res.write(`<h1>404: page not found</h1>`); // Sends a response back to the client
        res.end(); // Ends the response
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`server running on: ${PORT}`);
}); // The server starts to listen on port 3000*/


//____________________________________________________________________________________________________________________________

const http = require("http");

const fs = require("fs");

const path = require("path");
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
    let extName = path.extname(filePath);
    let contentType = "text/html";

    switch (extName) {
        case ".html":
            contentType = "text/html";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            const notFoundPage = fs.readFileSync(path.join(__dirname, "404.html"), "utf8");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(notFoundPage);
        }

        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});
