const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const { JSDOM } = require('jsdom');
const manipulateDOM = require('./index.js');

const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
        try {
            const indexPath = path.join(__dirname, 'index.html');
            const data = await fs.readFile(indexPath, 'utf8');

            // Create a new JSDOM instance
            const dom = new JSDOM(data);
            const { document } = dom.window;

            // Perform DOM manipulation
            manipulateDOM(document);

            // Send the modified HTML as response
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(dom.serialize());
        } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error reading or processing index.html');
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

server.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000/');
});
