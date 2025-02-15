/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const fs = require('fs'); // To read files from the file system
const path = require('path'); // To handle file paths

// Create a server
let server = http.createServer(function (req, res) {
  // Serve the HTML file when the root URL is requested
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading HTML file.');
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  }
  // Serve the JavaScript file when /index.js is requested
  else if (req.url === '/index.js') {
    fs.readFile(path.join(__dirname, 'index.js'), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading JavaScript file.');
      } else {
        res.setHeader('Content-Type', 'application/javascript');
        res.end(data);
      }
    });
  }
	  // Serve the CSS file when /style.css is requested
		else if (req.url === '/style.css') {
			fs.readFile(path.join(__dirname, 'style.css'), (err, data) => {
				if (err) {
					res.statusCode = 500;
					res.end('Error loading CSS file.');
				} else {
					res.setHeader('Content-Type', 'text/css');
					res.end(data);
				}
			});
		}
		  // If the file is not recognized, send a 404 error
			else {
				res.statusCode = 404;
				res.end('Not Found');
			}
		});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});