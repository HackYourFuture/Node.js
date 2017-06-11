var http = require('http');
var state = 10
var server = http.createServer();
const port = 3000;

server.listen(port, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('api listening on port', port);
    
  }
});

server.on('request', function(request, response) {
  console.log('New http request received', request.url);
  switch (request.url) {
  case '/state':
    console.log('state is ' + state);
    response.setHeader('content-type', 'text/html');
 	response.write(`
  	<document>
    <html>
      <body>
        <h1 style="color:blue;background-color:powderblue;text-align:center;marfin-top:40px;padding:10px">
        Current state is : ${state}</h1>
        <a href="http://localhost:3000/add"><button id="add">add</button></a>
		<a href="http://localhost:3000/remove"><button id="remove">remove</button></a>
		<a href="http://localhost:3000/reset"><button id="reset">reset</button></a>
      </body>
    </html>`);
  response.end();
    break;
  case '/add':
     state++;
    console.log('state is ' + state);
    response.setHeader('content-type', 'text/html');
 	response.write(`
  	<document>
    <html>
      <body>
        <h1 style="color:blue;background-color:powderblue;text-align:center;marfin-top:40px;padding:10px">
        Current state is : ${state}</h1>
        <a href="http://localhost:3000/add"><button id="add">add</button></a>
		<a href="http://localhost:3000/remove"><button id="remove">remove</button></a>
		<a href="http://localhost:3000/reset"><button id="reset">reset</button></a>
      </body>
    </html>`);
  response.end();
    break;
  case '/remove':
     state--;
    console.log('state is ' + state);
    response.setHeader('content-type', 'text/html');
 	response.write(`
  	<document>
    <html>
      <body>
        <h1 style="color:blue;background-color:powderblue;text-align:center;marfin-top:40px;padding:10px">
        Current state is : ${state}</h1>
        <a href="http://localhost:3000/add"><button id="add">add</button></a>
		<a href="http://localhost:3000/remove"><button id="remove">remove</button></a>
		<a href="http://localhost:3000/reset"><button id="reset">reset</button></a>
      </body>
    </html>`);
  response.end();
    break;
  case '/reset':
     state = 10;
    console.log('state is ' + state);
    response.setHeader('content-type', 'text/html');
 	response.write(`
  	<document>
    <html>
      <body>
        <h1 style="color:blue;background-color:powderblue;text-align:center;marfin-top:40px;padding:10px">
        Current state is : ${state}</h1>
        <a href="http://localhost:3000/add"><button id="add">add</button></a>
		<a href="http://localhost:3000/remove"><button id="remove">remove</button></a>
		<a href="http://localhost:3000/reset"><button id="reset">reset</button></a>
      </body>
    </html>`);
  response.end();
    break;
  case '/':
     state = 10;
    console.log('state is ' + state);
    response.setHeader('content-type', 'text/html');
 	response.write(`
  	<document>
    <html>
      <body>
        <h1 style="color:blue;background-color:powderblue;text-align:center;marfin-top:40px;padding:10px">
        Current state is : ${state}</h1>
        <a href="http://localhost:3000/add"><button id="add">add</button></a>
		<a href="http://localhost:3000/remove"><button id="remove">remove</button></a>
		<a href="http://localhost:3000/reset"><button id="reset">reset</button></a>
      </body>
    </html>`);
  response.end();
    break;
  default:
  	console.log('error code 404: Not found ');
  response.setHeader('content-type', 'text/html');
  response.write(`
  	<document>
    <html>
      <body>
        <h1> error code 404: Not found</h1>
        <a href="http://localhost:3000/state">Pleas chick the state here</a>
        <p>or use add, remove, or reset</p>
      </body>
    </html>`);
  response.end();
  }
});