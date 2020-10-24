/**
 * Exercise 3: Create an HTTP web server
 */

let http = require('http');
let fs = require('fs');

//create a server
let server = http.createServer(function (req, res) {
	// YOUR CODE GOES IN HERE
	//res.writeHead(200, {'Content-Type': 'text/html'});
  	//res.write('Hello World!');
  	//res.end();
	
	if(req.url === '/'){
		let file = fs.readFileSync('./index.html');
		res.writeHead (200, { 'Content-Type': 'text/html' });
		res.write(file);
	}
	else if (req.url === '/index.js'){
		let file = fs.readFileSync('./index.js');
		res.writeHead (200, { 'Content-Type': 'application/json' });
		res.write(file);
	}
	else if (req.url === '/style.css'){
		let file = fs.readFileSync('./style.css');
		res.writeHead (200, { 'Content-Type': 'text/css' });
		res.write(file);
	}
	res.end(); // Ends the response
});

server.listen(3000); // The server starts to listen on port 3000