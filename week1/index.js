// Declare global variables
const http = require('http');
//start server 
const server = http.createServer();
// the state which will be increased or decreased on the user request
//This port was already chosen by the assignment maker.
const port = 8080;
console.log(process.argv)

// Function that checks which URL input we got from the user 
//Initiates the right action based on the user choice
function checkInput (url) {
    let responsToSendBack = {
                type:'text/html',
                statusCode: 200
            };
    if(responsToSendBack.state == undefined) {
        responsToSendBack.state = addOne();
    };
    console.log(responsToSendBack.state)
     
    switch (url) {
        case '/state':
            responsToSendBack.code = stateResponsHtml(responsToSendBack.state)
            break;
        case '/add':
            responsToSendBack.state = addOne(responsToSendBack.state);
            responsToSendBack.code = '<html><body><h2>ok</h2></body></html>'
            break;
        case '/remove':
            responsToSendBack.state = subOne(responsToSendBack.state);
            operationsResponseHtml();
            break;
        case '/reset':
            responsToSendBack.state = 10;
            operationsResponseHtml();
            break;
        default:
            otherUrls();
    }
    return responsToSendBack;
}

//Function to increase the state by 1
function addOne (num){
    if(typeof num === 'number'){
        console.log('got here')
        return num+=1;
    }else {
        return num = 10;
    }
    
};
//Function to decrease the state
function subOne (num) {
    return num-=1;
};

//function to build state html respons
function stateResponsHtml (data) {
    let responseHtml = '<html><body><h2>the current state is ' + data + '</h2></body></html>';
    return responseHtml;
}
//function to build HTML response for any other URL that doesn't exist
function otherUrls () {
    responsToSendBack.code = 
        '<html><body><h2>Apparently, the page you are looking for doesn"t exist :)</h2></body></html>';
    responsToSendBack.statusCode = 404;
};

function saver (){
    let num = 10;
    return num;
}

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
    
    //return everything to here and pass it around
    
    
    //send the URL to be checked for the prober response
    let preparingResponse = checkInput(request.url);
    console.log(preparingResponse)
    response.statusCode = preparingResponse.statusCode;
    response.setHeader('content-type', preparingResponse.type);
    response.write(preparingResponse.code);
    response.end();
});
