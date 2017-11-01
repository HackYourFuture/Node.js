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
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write("You requested root path.");
    } else if ( request.url === "/state" ) {
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>STATE</title>
                        </head>
                        <body>
                            <h1>${state}</h1>
                        </body>
                    </html>
                `);
    } else if ( request.url === "/add" ) {
        state++;
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>ADD</title>
                        </head>
                        <body>
                            <h1>${state}</h1>
                        </body>
                    </html>
                `);
    } else if ( request.url === "/remove" ) {
        state--;
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>REMOVE</title>
                        </head>
                        <body>
                            <h1>${state}</h1>
                        </body>
                    </html>
                `);
    } else if ( request.url === "/reset" ) {
        state = 10;
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>RESET</title>
                        </head>
                        <body>
                            <h1>${state}</h1>
                        </body>
                    </html>
                `);
    } else {
        response.writeHead(404,{"Content-Type":"text/html"});
        response.write(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>STATE</title>
                        </head>
                        <body>
                            <h3>error code 404: i am very very friendly message and 
                            wanna tell you that there is no such a website</h3>
                        </body>
                    </html>
                `);
             
    }

    response.end();
});


server.listen(port, () => {
    console.log(`The nodejs server is now listening on port ${ port }`)
});