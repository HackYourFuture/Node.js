// To run this file: node index.js
// Then in your browser: http://localhost:8000
let http = require('http');

//I added this package to deal with files.
let fs = require('fs');

//I think this not the best way to add style file, but it a good example to use 'fs' pakage.
var style = fs.readFileSync("style.css")

// This is the magic number :-)
const port = 8000;

let status = 10;

//Define all my page content as object.
var htmlObject = {
	
	title: "<title>hallo NodeJs</title>",
	acswerOk: "Your request is return: OK"
	
}



var server = http.createServer();

// Start the HTTP server, start listening for requests
server.listen(port, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('api listening on port', port);
  }
});

// Create a event handler for "request"
// this is an alternative way
server.on('request', function(request, response) {
	response.setHeader('content-type', 'text/html');
  switch(request.url){
	  case '/add':
		  response.write('<html>' + htmlObject.title + style + '<head></head><body><h1>Hello world</h1>'+ '<h1>'+ ++status+'</h1>' +</body></html>'+ );
		  break;
	  default:
		 response.write(('<html>' + htmlObject.title + style + '<head></head><body><h1>Hello world</h1></body></html>'+ '<h1 id="counter">'+ status +'</h1>'))
		  
				}
  
//  response.write('<html>' + header.title + style + '<head></head><body><h1>Hello world</h1></body></html>');
  response.end();
	
	
//	function addCounter(
//	)
});
	
	// 31687853995- 684423693 puk18079461 ref: 56621175