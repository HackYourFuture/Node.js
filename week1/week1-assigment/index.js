' use strict '

let state = 10;
const http = require('http');
const server = http.createServer();
const PORT = 8080;

server.listen(PORT, () => {
    console.log('listening on', PORT);
});

server.on('connection', () => {
    console.log('connected')
});

server.on('request', (req, res) => {
    console.log('request', req.url);
    function switchStates(x) {
        res.setHeader('content-type', 'text/html')
        res.write('<h2>The state value is: ' + x + '</h2>');
        res.end();
    }
    switch (req.url) {
        case '/state':
            state;
            switchStates(state)
            break;
        case '/add':
            state++
            switchStates(state)
            break;
        case '/remove':
            state--
            switchStates(state)
            break;
        case '/reset':
            state = 10;
            switchStates(state)
            break;
        default:
            let message = state + ' . Error code 404: Not found';
            res.setHeader('content-type', 'text/html')
            res.write('<h2>The state value is: ' + message + '</h2>');
            res.end();

    }

})