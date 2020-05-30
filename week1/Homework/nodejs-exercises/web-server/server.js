const http = require('http');
const fs = require('fs');
const path = require('path');

//create a server
let server = http.createServer(function (req, res) {

	if (req.url === '/'){
        res.setHeader('Content-Type', 'text/html');
        fs.readFile(path.join(__dirname,'index.html'), (err, content) => {
            res.writeHead(200)
            res.write(content);
            res.end()
        })
    } 
    if (req.url === '/script.js') {
        res.setHeader('Content-Type', 'text/javascript');
        fs.readFile(path.join(__dirname,'script.js'), (err, content) => {
        res.writeHead(200)
        res.write(content);
        res.end()
        })
    }
    if (req.url === '/style.css') {
        res.setHeader('Content-Type', 'text/css');
        fs.readFile(path.join(__dirname,'style.css'), (err, content) => {
        res.writeHead(200)
        res.write(content);
        res.end()
        })
    }

});
const PORT = process.env.PORT || 3000
server.listen(PORT); // The server listens on port 3000
