/**
 * Exercise 3: Create an HTTP web server
 */
// res. - responce - ответ клиенту

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

//create a server
let server = http.createServer(async function (req, res) {
  // YOUR CODE GOES IN HERE
      console.log(`Request: ${req.method} ${req.url}`);
  
	try {
        if (req.url === '/') {
            // Serve HTML file
            const html = await fs.readFile(__dirname + '/index.html', 'utf8');
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end(html);
        } else if (req.url === '/index.js') {
            // Serve JavaScript file
            const js = await fs.readFile(__dirname + '/index.js', 'utf8');
            res.setHeader('Content-Type', 'application/javascript');
            res.writeHead(200);
            res.end(js);
        } else {
            // 404 for other requests
            res.writeHead(404);
            res.end('Not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.writeHead(500);
        res.end('Server error');
    }
});

server.listen(3000, () => { // ДОБАВИЛ функцию обратного вызова
 	console.log(`Server running at http://localhost:3000`); // ДОБАВИЛ сообщение о запуске

});