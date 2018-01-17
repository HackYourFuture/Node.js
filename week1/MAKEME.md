> Please help us improve and share your feedback! If you find better tutorials or links, please share them by opening a Pull Request.

# HackYourFuture Node.js - Homework week 1

## Assignment:
Create an http server that can add and subtract from a number, which we will call the "state". Please see in `index.js` in this folder as starting material. Pay extra attention to line 21, which contains some hints for this week `console.log('New http request received', request.url);`

Rule 1: DO NOT USE EXPRESS.JS
Rule 2: you can use other packages, but you HAVE to also make a version WITHOUT any NPM packages (http, of course, is not NPM but a node native package)
```js
// The state
var state = 10; 
```

Endpoints criteria
```js
'use strict';

// To run this file: node index.js
// Then in your browser: http://localhost:8080
let http = require('http');
let port = 8080;
let state = 10;
let server = http.createServer();

// Start the HTTP server, start listening for requests
server.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('api listening on port', port);
    }
});

// Create a event handler for "request"
// this is an alternative way
server.on('request', function (request, response) {
    console.log(request.url);

    if (request.url === '/state') {
        response.setHeader('content-type', 'text/html');
        response.write('<h1>'+ state +'</h1>');
    } else if (request.url === "/add") {
        state ++;
        response.setHeader('content-type', 'text/html');
        response.write('<h1>' + state + '</h1>');
    } else if (request.url === "/remove") {
        state --;
        response.setHeader('content-type', 'text/html');
        response.write('<h1>' + state + '</h1><');
    } else if (request.url === "/reset") {
        state = 10;
        response.setHeader('content-type', 'text/html');
        response.write('><h1>' + state + '</h1>');
    } else {
        response.setHeader('content-type', 'text/html');
        response.write('<h1>' + 'error code' + response.state +': Not found kindly check the URL' + '</h1>');
    }

    response.end();
});
```

## Reading
### Callbacks: 
Video: https://www.youtube.com/watch?v=pTbSfCT42_M
Read: http://callbackhell.com/

### Require/exporting
Video: https://www.youtube.com/watch?v=e1Ln1FrLvh8
Read: http://openmymind.net/2012/2/3/Node-Require-and-Exports/

### http, http listen
- Video basic: https://www.youtube.com/watch?v=pYOltVz7kL0
- Video routing: https://www.youtube.com/watch?v=_D2w0voFlEk (please focus on request.url, not request.method)
- Read: [Node JS documentation about http](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
- Read Advanced: 

refresh on command line
Video Mac/linux: 
Video PC: -- ()

While not strictly homework, we’ve created another playlist if you’d like to learn more or review (and as JavaScript developers, you should). https://www.lynda.com/SharedPlaylist/78e6513f51bb4102b03349460491b4e3
