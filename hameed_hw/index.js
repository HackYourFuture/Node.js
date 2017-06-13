// Create an http server that can add and subtract from a number, which we will call the "state".
// To run this file: node .
// Then in your browser: http://localhost:3000
let http = require('http');
// declare the state variabel which start from 10
let state = 10
let server = http.createServer();
// give the port a number
const port = 3000;
//To listen to the port and console the state of this port 
server.listen(port, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('api listening on port', port);
  }
});
// creat a response for the request url
server.on('request', function(request, response) {
  //console.log(response);
  console.log('New http request received', request.url);
  //use switch to determine the request url case and prosses the resultes
  switch (request.url) {
  	// /state 
	// response: the current state in a html format 
	// when the server starts, this should return "10"
  	//in this case we just show the curent state value 
  case '/state':
    console.log('state is ' + state);
    showState(state);
    break;
	// This should add 1 to the current state
  case '/add':
     state++;
    console.log('state is ' + state);
    response.setHeader('content-type', 'text/html');
 	showState(state);
    break;
    // This should subtract 1 ƒrom the current state
  case '/remove':
     state--;
    console.log('state is ' + state);
    showState(state);
    break;
    // This should set the state back to 10
     // I didnt want to start with error so I did the first step as reset and show the state.
  case '/reset':
  case '/':
     state = 10;
    console.log('state is ' + state);
    showState(state);
    break;
    // Any other URL
    // Response: return error.
  default:
  	console.log('error code 404: Not found');
  	setError('error code 404: Not found',response);
  }
  // this function take the state value and make some html tages to show it.
  //  I did some extra button to make the request url faster.
  function showState(state){
  	response.setHeader('content-type', 'text/html');
 	response.write(`
    <html>
      <body>
        <h1 style="color:blue;background-color:powderblue;text-align:center;">
        Current state is : ${state}</h1>
        <a href="http://localhost:3000/add"><button id="add">add</button></a>
		<a href="http://localhost:3000/remove"><button id="remove">remove</button></a>
		<a href="http://localhost:3000/reset"><button id="reset">reset</button></a>
      </body>
    </html>`);
  response.end();
  }
  // this function take the default case wich is wrong url requstes 
    function setError(error, response) {
    response.statusCode = 404;
  	response.setHeader('content-type', 'text/html');
	  response.write(`
	    <html>
	      <body>
	        <h1 style="color:red;background-color:gray;text-align:center;"> ${error}</h1>
	        <a href="http://localhost:3000/state">Pleas check the state here</a>
	        <p>or use a good url in our case like (add, remove, or reset)</p>
	      </body>
	    </html>`);
	  response.end();
  }
});