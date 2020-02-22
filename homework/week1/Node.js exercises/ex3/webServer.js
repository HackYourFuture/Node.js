var http = require('http');
const fs = require('fs');

//create a server
let server = http.createServer(function(req, res) {
    res.setHeader('Content-Type', 'text/html')
    res.writeHead(200, { 'Content-Type': 'script.js' });
    res.write("<html><head><style>body {color: brown;text-align: center;width: 80%;margin: 50px auto auto auto;font-size: 3rem;}</style><title>My First Web Server</title></head><body><div id='content'></div><scriptsrc='script.js'></script></body></html>"); //send a response back to the client


    if (req.url === '/script.js') {
        res.write("<script>document.getElementById('content').appendChild(document.createTextNode('Welcome to Server-land!'));</script>");
    } else {
        res.write("<script>document.getElementById('content').appendChild(document.createTextNode(' Hello, anyone there?'));</script>");
    }
    res.end(); //end the response
});

server.listen(3000); //the server listens on port 3000