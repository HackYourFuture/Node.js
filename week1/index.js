var http = require('http');

var state = 10
var server = http.createServer();
const port = 8888;

server.listen(port, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log(`go to http://localhost: ${port}`);
  }
});
// Create a event handler for "request"
// this is an alternative way
server.on('request', function(request, response) {
  console.log('New http request received', request.url);
  if (request.url == '/state')
    console.log('state is ' + state);

  else if (request.url == '/add') {
    state++
    console.log('state is ' + state);

  } else if (request.url == '/remove') {
    state--
    console.log('state is ' + state);

  } else if (request.url == '/reset') {
    state = 10
    console.log(state);

  } else return console.log('error code 404: Not found ');
  response.setHeader('content-type', 'text/html');
  response.write(`
    <html>
      <head>
      </head>
      <body>
        <h1 style="color:blue;background-color:powderblue;text-align:center;marfin-top:40px;padding:10px">
        Current state is : ${state}</h1>
      </body>
    </html>`);
  response.end();
});
