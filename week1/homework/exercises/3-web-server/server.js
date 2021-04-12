/**
 * Exercise 3: Create an HTTP web server
 */

var http = require('http');
const fs=require('fs')


let server = http.createServer(function (req, res) {
	// YOUR CODE GOES IN HERE
	   // Sends a response back to the client
	   switch(req.url){
		   case "/":
			fs.readFile('./index.html','utf8',(err,data)=>{
				if(err) throw err
			
			res.writeHeader(200, {"Content-Type": "text/html"});  
			res.write(data)
			res.end();
			})
			break;
			case "/index.js":
				fs.readFile('./index.js','utf8',(err,data)=>{
					if(err) throw err
			res.writeHeader(200, {"Content-Type": "text/js"});  
			res.write(data)
			res.end();
				})
			break;
			case "/style.css":
				fs.readFile('./style.css','utf8',(err,data)=>{
					if(err) throw err
			res.writeHeader(200, {"Content-Type": "text/css"});  
			res.write(data)
			res.end();
				})
			break;
	   }
	   // Ends the response
  });
  
  server.listen(3000);


//create a server
 // The server starts to listen on port 3000