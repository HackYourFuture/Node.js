"use strict";

const http = require("http");
const server = http.createServer();

server.on("connection", () => {
    console.log("Connected")
});


const PORT = 8080;

server.listen(PORT, () => {
    console.log("Listening on port", PORT);
});


let state = 10;

server.on("request", (req, res) => {

    res.setHeader("content-type", "text/html");


    function writeState() {
        res.write(`<h1>state = ${state}</h1>`)
    }

    function writeOk() {
        res.write("<h1>ok</h1>");   
    }

    switch (req.url) {
        case "/state":
            writeState();
            break;
        case "/add":
            state++; 
            writeOk();
            writeState();
            break;
        case "/remove":
            state--;
            writeOk();
            writeState();
            break;
        case "/reset":
            state = 10;
            writeOk();
            writeState();
            break;
        default:
            res.write(`
                <h1>404: Page not found</h1>
                <h2>Please enter a valid url</h2>
            `);    
    }

    res.end();
});




