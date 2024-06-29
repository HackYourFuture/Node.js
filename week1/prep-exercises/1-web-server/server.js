/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

let server = http.createServer(async function (req, res) {
  
	try{
		if(req.url === '/'){
			res.writeHead(200,{'Content-Type':'text/html'});
			let data	= await fs.readFile(path.join(__dirname,'index.html'));
			res.end(data);

	}else if(req.url ==='/index.js'){
		res.writeHead(200,{'Content-Type':'text/javascript'});
		let data = await fs.readFile(path.join(__dirname,'index.js'));
		res.end(data);

	}else if (req.url === '/style.css') {
		// Serve the CSS file
		const data = await fs.readFile(path.join(__dirname, 'style.css'));
		res.writeHead(200, {'Content-Type': 'text/css'}); 
		res.end(data);
	} 
	else{
		res.writeHead(404,{'Content-Type':'text/html'});
		res.end('<h1>404 Not Found</h1>');
	
	}
}
catch(err){
	res.writeHead(500,{'Content-Type':'text/html'});
	res.end('<h1>500 Internal Server Error</h1>');
}
	
});

server.listen(3000,()=>{
	console.log('Server is listening on port 3000');

}); // The server starts to listen on port 3000
