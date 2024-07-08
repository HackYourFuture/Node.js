const http = require('http');
const fs = require('fs');
const path = require('path');
let server = http.createServer( function (req, res) {
	if (req.url === '/' || req.url === '/index.html') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, function(err, data) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/index.js') {
        const filePath = path.join(__dirname, 'index.js');
        fs.readFile(filePath, function(err, data) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
	
});

server.listen(3000 , ()=>{console.log('server i listen on port http://localhost:3000');}); // The server starts to listen on port 3000