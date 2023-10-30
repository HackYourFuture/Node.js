/**
 * Exercise 3: Create an HTTP web server
 */
const http = require('http');
const fs = require('fs')
//create a server
let server = http.createServer(function (req, res) {

	if (req.url === '/') {
		res.setHeader('content-type', 'text/html')	
		fs.readFile("./index.html", (err, data) => {
			if (err) {
					res.end('Error reading the file');
			} else {
					res.end(data); // Ends the response
			}
	});
	} else if (req.url === "/index.js") {
 
      fs.readFile("index.js", (err, data) => {
				if (err) {
					res.end(err)
				}else{
					res.setHeader('content-type', "text/javascript")
					res.end(data)
				}
			 });     
}else {
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.end('404 Not Found');
}
});
const port = 3000
server.listen(port, console.log(`server is on ${port}`)); // The server starts to listen on port 3000
