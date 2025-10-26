/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const fs = require('fs')
const path = require('path')

//create 
let server = http.createServer(function (req, res) {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end('Server Error')
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(data)
            }
        })
    } else if (req.url === '/index.js') {
        fs.readFile(path.join(__dirname, 'index.js'), (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end('File not found')
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' })
                res.end(data)
            }
        })
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
    }
})

server.listen(3000); // The server starts on port 3000
