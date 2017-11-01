//import HTTP from 'http'
//import Path from 'path'
//
//import sendIndexHTML from './responses/sendIndexHTML'
//import sendPage2HTML from './responses/sendPage2HTML'
//import sendStylesCSS from './responses/sendStylesCSS'
//import sendText from './responses/sendText'

const http = require('http');
const port = 3000
let state = 10;


const server = http.createServer( (request, response) => {

    console.log(`I have received a request for path: ${ request.url }`);

    
    
    if ( request.url === "/" ) {
        response.write("You requested root path.");
    } else if ( request.url === "/state" ) {
        response.write(`<h1>${state}</h1>`);
         
    }else if ( request.url === "/add" ) {
        state++;
        response.write(`<h1>${state}</h1>`);
    }else if ( request.url === "/remove" ) {
        state--;
        response.write(`<h1>${state}</h1>`);
    }else if ( request.url === "/reset" ) {
        state = 10;
        response.write(`<h1>${state}</h1>`);
    }else {
        response.write(`return error code 404: Not found with a friendly message`)        
    }

    response.end();
});


server.listen(port, () => {
    console.log(`The nodejs server is now listening on port ${ port }`)
});