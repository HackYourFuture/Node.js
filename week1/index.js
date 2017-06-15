// Declare global variables
const http = require('http');
//start server 
const server = http.createServer();
//This port was already chosen by the assignment maker.
const port = 8080;
//Object containing the respons text and the content type.
//this response is the basic response.
//it will be passed around by functions and modified untils it's in shape to be returned to the client
let responsToSendBack = {
    code:'<html></html>',
    type:'text/html',
    statusCode: 200,
    state: Number
};

//the original state which will always be 10. 
//not allowed to change so it's a constant
const originalState = 10;

//assign the begin state to the response object in order to modify it based on the users wish
responsToSendBack.state = originalState;



// Function that checks which URL input we got from the user.
//Initiates the right action based on the user choice
//takes two parameters: the url the user typed and the responseToSendBack so we can start modifying it
function checkInput (url,data) {
    switch (url) {
        case '/state':
            data = stateResponsHtml(data);
            break;
        case '/add':
            data.state = addOne(data.state);
            data = operationsResponseHtml(data);
            break;
        case '/remove':
            data.state = subOne(data.state);
            data = operationsResponseHtml(data);
            break;
        case '/reset':
            data.state = originalState;
            data = operationsResponseHtml(data);
            break;
        default:
            otherUrls();
    }
    return data;
}

//Function to increase the state by 1
function addOne (input){
    return input += 1;
};
//Function to decrease the state by 1
function subOne (input) {
    return input -= 1;
};

//Function to build the response HTML for subtraction and addition
//takes the whole response object and return the modified version.
function operationsResponseHtml (input){
    input.code = '<html><body><h2>ok</h2></body></html>'
    input.statusCode = 200;
    return input;
};

//function to build state html response
//take the whole response object and do the neccessery modifications
function stateResponsHtml (data) {
    data.code = '<html><body><h2>the current state is ' + data.state + '</h2></body></html>';
    data.statusCode = 200;
    return data;
}

//function to build HTML response for any other URL that doesn't exist
//if the user ordered a URL that doesn't exist he will get the response object with the modifications of this function
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
    //send the basic respons to the checkInput function to modify it
    let inputToReturn = checkInput(request.url,responsToSendBack);
    response.statusCode = inputToReturn.statusCode;
    response.setHeader('content-type', inputToReturn.type);
    response.write(inputToReturn.code);
    response.end();
});
