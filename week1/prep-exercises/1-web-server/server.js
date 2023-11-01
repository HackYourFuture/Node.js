const http = require('http');
const fsPromises = require('fs').promises;
const path = require('path');

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    try {
      const htmlContent = await fsPromises.readFile(path.join(__dirname, 'index.html'), 'utf-8');
      res.setHeader('Content-Type', 'text/html');
      res.write(htmlContent);
    } catch (error) {
      res.writeHead(500);
      res.end('Internal Server Error!');
    }
  } else if (req.url === '/index.js') {
    try {
      const jsContent = await fsPromises.readFile(path.join(__dirname, 'index.js'), 'utf-8');
      res.setHeader('Content-Type', 'application/javascript');
      res.write(jsContent);
    } catch (error) {
      res.writeHead(500);
      res.end('Internal Server Error!');
    }
  } else if (req.url === '/style.css') {
    try {
      const cssContent = await fsPromises.readFile(path.join(__dirname, 'style.css'), 'utf-8');
      res.setHeader('Content-Type', 'text/css');
      res.write(cssContent);
    } catch (error) {
      res.writeHead(500);
      res.end('Internal Server Error!');
    }
  } else {
    res.writeHead(404);
    res.end('Not Found!');
  }
  res.end();
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
