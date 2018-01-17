"use strict";

const http = require("http");

const server = http.createServer((req, res) => {
    console.log("Creating server");
});

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

    if (req.url === "/state") {
        res.write(`<h1>state = ${state}</h1>`);
    }
    else if (req.url === "/add") {
        res.write("<h1>ok</h1>");
        state++;
        res.write(`<h1>state = ${state}</h1>`);
    }
    else if (req.url === "/remove") {
        res.write("<h1>ok</h1>");
        state--;
        res.write(`<h1>state = ${state}</h1>`);
    }
    else if (req.url === "/reset") {
        res.write("<h1>ok</h1>");
        state = 10;
        res.write(`<h1>state = ${state}</h1>`);
    }
    else {
        res.write(`
            <h1>404: Page not found</h1>
            <h2>Please enter a valid url</h2>
        `);
    }

    res.end();
});

