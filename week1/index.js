// Declare global variables
const http = require('http');
//start server 
const server = http.createServer();
// the state which will be increased or decreased on the user request
let state = 10; 
//This port was already chosen by the assignment maker.
const port = 8080;
//Object containing the respons text and the content type.
let responsToSendBack = {
    code:'<html></html>',
    type:'text/html',
    statusCode: 200
};


// Function that checks which URL input we got from the user 
//Initiates the right action based on the user choice
function checkInput (url) {
    switch (url) {
        case '/state':
            stateResponsHtml();
            break;
        case '/add':
            addOne();
            operationsResponseHtml();
            console.log(state);
            break;
        case '/remove':
            subOne();
            operationsResponseHtml();
            console.log(state);
            break;
        case '/reset':
            state = 10;
            operationsResponseHtml();
            break;
        default:
            otherUrls();
    }
}

//Function to increase the state by 1
function addOne (){
    return state++;
};
//Function to decrease the state
function subOne () {
    return state--;
};

//Function to build the response HTML for subtraction and addition
function operationsResponseHtml (){
    responsToSendBack.code = '<html><body><h2>ok</h2></body></html>'
    responsToSendBack.statusCode = 200;
};

//function to build state html respons
function stateResponsHtml () {
    responsToSendBack.code = '<html><body><h2>the current state is ' + state + '</h2></body></html>';
    responsToSendBack.statusCode = 200;
}
//function to build HTML response for any other URL that doesn't exist
function otherUrls () {
    responsToSendBack.code = 
        '<html><body><h2>Apparently, the page you are looking for doesn"t exist :)</h2></body></html>';
    responsToSendBack.statusCode = 404;
};

// Start the HTTP server, start listening for requests
server.listen(port, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('api listening on port', port);
  }
});

// Create a event handler for "request"
server.on('request', function(request, response) {
    //send the URL to be checked for the prober response
    checkInput(request.url);
    response.statusCode = responsToSendBack.statusCode;
    response.setHeader('content-type', responsToSendBack.type);
    response.write(responsToSendBack.code);
    response.end();
});
