
"use strict"


let state = 10;
let http = require("http");
let server = http.createServer();

server.on("connection", () => {
    console.log("server is connected")
})

server.on("request", (request, response) => {
    console.log("requesting", request.url)
    function setResponse(header) {
        response.setHeader("Content-Type", "Text-html");
        response.write(header);
        response.end();
    }
    switch (request.url) {
        case "/add" : state++; setResponse(`<h1>${state}</h1>`); break;
        case "/remove": state--; setResponse(`<h1>${state}</h1>`); break;
        case "/reset": state = 10; setResponse(`<h1>${state}</h1>`); break;
        case "/state": state; setResponse(`<h1>${state}</h1>`); break;
        default: setResponse(`<h1>Error 404, page not found</h1>`); break;    
    }
})
const port = 8080;
server.listen(port, () => {
    console.log("Listening on", port)
})