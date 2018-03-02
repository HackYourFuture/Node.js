'use strict';

// Write the homework code in this file
let http = require('http');
let port = 8080;
let state = 10;


let server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'text/html')
    switch (req.url) {
        case '/' :
        break;
        case '/state':
            res.write(`<h1> OK :${state}</h1>`);
            break;
        case '/add':
            res.write(`<h1> oK :${state + 1}</h1>`);
            break;
        case '/subtract':
            res.write(`<h1> Ok :${state - 1}</h1>`);
            break;
        case '/reset':
        res.write(`<h1 id = 'state'> oK :${state}</h1>`);
break;
default : 
res.statusCode = 403;
res.write('<h1> Not fond</h1>')        
    }
    res.end();


});
server.listen(port, () => {
    console.log('server started on port :' + port)
})