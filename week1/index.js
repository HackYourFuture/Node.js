import HTTP from 'http'
import Path from 'path'

import sendIndexHTML from './responses/sendIndexHTML'
import sendPage2HTML from './responses/sendPage2HTML'
import sendStylesCSS from './responses/sendStylesCSS'
import sendText from './responses/sendText'

var state = 10;
var http = require('http');

var port = 8080;

var server = http.createServer();

server.on('request', (req, res) => {
    console.log('request', req.url);
    if (req.url === '/state') {
        console.log(state);
    }
    else if (req.url === '/add') {
        state += 1;
        
    }
    else if (req.url === '/remove') {
        state -= 1;
    }
    else if (req.url === '/reset') {
        state = 10;
    }
    
    else {
      //  res.writeHead(404, { "Content-Type": "text/plain" });
       // res.write("404 Not found");
        //res.end();
    }


    res.setHeader('content-type', 'text/html');

    res.write('<h1>'+state+'</h1>');
    res.end();
}
);
server.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('api listening on port', port);
    }
});