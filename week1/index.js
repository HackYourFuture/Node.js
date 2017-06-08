const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
let counter = 10;
let requestLog = [];

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    console.log('The new received http request is: ', request.url);

    response.write(`<a href="/add"><button>Add</button></a> | `)
    response.write(`<a href="/remove"><button>Remove</button></a> | `)
    response.write(`<a href="/reset"><button>Reset</button></a> | `)
    response.write(`<a href="/state"><button>State</button></a>`)

    switch (request.url) {
        case '/favicon.ico':
            response.end();
        case '/state':
        case '/':
            console.log(`Current counter value: ${counter} \n`)
            response.write(`<h2>Counter current value is:  ${counter} </h2>`, 'utf8');
            requestLog.push(request.url)
            break;
        case '/add':
            console.log(`Counter value after ADD: ${counter} \n`)
            counter += 1;
            response.write(`<h2>The counter was successfully increased by 1. <br> Counter new value is: ${counter} </h2>`, 'utf8');
            requestLog.push(request.url)
            break;
        case '/remove':
            console.log(`Counter value after REMOVE: ${counter} \n`)
            counter -= 1;
            response.write(`<h2>The counter was successfully decreased by 1. <br> Counter new value is: ${counter} </h2>`, 'utf8');
            requestLog.push(request.url)
            break;
        case '/reset':
            counter = 10;
            console.log(`Counter value after RESET: ${counter} \n`)
            response.write(`<h2>Counter value was reseted to: ${counter}</h2>`, 'utf8');
            requestLog.push(request.url)
            break;
        default:
            response.statusCode = 404;
            response.write(`<h2 style="color: red">Your request is invalid, 
            please click one of the options to continue...<h2>`);
            console.error('Error \n')
    }
    response.end();
    console.log(`Requests Log: \n ${requestLog}  \n`)
});

server.listen(port, hostname, () =>
    console.log(`Server running at http://${hostname}:${port}/`)
);
