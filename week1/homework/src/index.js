'use strict';

'use strict';
const http = require('http');
//const path = require('path');
let state = 10;

const PORT = 3000;

function handleRequest(req, res) {
    console.log('on request', req.url);
    switch (req.url) {
        case '/':
            res.setHeader('Content-Type', 'text/html')
            res.write(`<h3>OK<h3> ${state}`);
            break;
        case '/add':
            state++;
            res.setHeader('Content-Type', 'text/html')
            res.write(`<h3>OK<h3> ${state}`);
            break;
        case '/subtract':
            state--;
            res.setHeader('Content-Type', 'text/html')
            res.write(`<h3>OK<h3> ${state}`);
            break;
        case '/reset':
            state = '';
            res.setHeader('Content-Type', 'text/html')
            res.end(`<h3>OK<h3> ${state}`);
            break;
        default:

            /* const extension = path.extname(req.url);
             if (extension === '') {
                 res.statusCode = 302;
                 res.setHeader('Location', '/');
             } else {*/
            res.statusCode = 404;
            res.write(res, 'File not found');
            break;
    }

    res.end();
}
const server = http.createServer(handleRequest);
server.listen(PORT, () => {
    console.log(`Server started http://localhost:${PORT}`);
});


/*II. WAY with If ...else
'use strict';
const http = require('http');

const PORT = 8080;

function handleRequest(req, res) {
    let state = 10;
    console.log('on request', req.url);
    res.setHeader('Content-Type', 'text/html');
    if (req.url === '/') {

        res.write(`<h3>OK<h3> ${state}`);
    }
    else if (req.url === '/add') {
        state++;
        res.write(`<h3>OK<h3> ${state}`);

    } else if (req.url === '/subtract') {
        state--;
        res.write(`<h3>OK<h3> ${state}`);

    }
    else if (req.url === '/reset') {
        state = '';
        res.write(`<h3>OK<h3> ${state}`);

    } else {
        res.statusCode = 404;
        res.write(res, 'File not found');

    }



    res.end();
}
const server = http.createServer(handleRequest);
server.listen(PORT, () => {
    console.log(`Server started http://localhost:${PORT}`);
});
*/