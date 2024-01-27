/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer(async function (req, res) {
  if (req.url === '/') {
    // Read and send HTML file
    try {
      const htmlContent = await fs.readFile(path.join(__dirname, 'index.html'), 'utf-8');
      res.setHeader('Content-Type', 'text/html');
      res.write(htmlContent);
      res.end();
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  } else if (req.url === '/index.js') {
    // Read and send JavaScript file
    try {
      const jsContent = await fs.readFile(path.join(__dirname, 'index.js'), 'utf-8');
      res.setHeader('Content-Type', 'application/javascript');
      res.write(jsContent);
      res.end();
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
