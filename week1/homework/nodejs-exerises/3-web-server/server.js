const http = require('http');
const fs = require('fs');
const path = require('path');

let server = http.createServer(function (req, res) {
      if (req.url === '/') {
        fs.readFile(path.join(__dirname,'index.html'), (err, content) => {
          res.writeHead(200, {'Content-Type' : 'text/html'})
          res.write(content);
          res.end()
        })
      }
        if (req.url === '/script.js') {
          fs.readFile(path.join(__dirname,'script.js'), (err, content) => {
            res.writeHead(200, {'Content-Type' : 'application/javascript')
            res.write(content);
            res.end()
          })
        }
        if (req.url === '/style.css') {
          fs.readFile(path.join(__dirname,'style.css'), (err, content) => {
            res.writeHead(200, {'Content-Type' : 'text/css')
            res.write(content);
            res.end()
          })
        }});

      const PORT = process.env.PORT || 3000
      server.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // The server listens on port 3000