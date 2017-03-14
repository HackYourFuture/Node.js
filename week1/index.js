const hostname = '127.0.0.1';
const port = 3000;
var counter = 10;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');

    console.log('The new received http request is: ', request.url)

    switch (request.url) {
        case '/state':
        case '/':
            console.log('Original counter value:', counter, '\n')
            response.write(`<h2>Counter current value is: ` + counter + `</h2>`, 'utf8');
            break;
        case '/add':
            counter += 1;
            console.log('counter value after ADD:', counter, '\n')
            response.write(`<h2>The counter was successfully increased by 1. <br> Counter new value is: ` + counter + `</h2>`, `utf8`);
            break;
        case '/remove':
            counter -= 1;
            console.log('counter value after REMOVE:', counter, '\n')
            response.write(`<h2>The counter was successfully decreased by 1. <br> Counter new value is: ` + counter + `</h2>`, `utf8`);
            break;
        case '/reset':
            counter = 10;
            console.log('Counter value after RESET:', counter, '\n')
            response.write(`<h2>Counter value was reseted to: ` + counter + `</h2>`, `utf8`);
            break;
        default:
            response.statusCode = 404;
            response.write(`<h2 style="color: red">Your request is invalid, please type either add, remove, state or reset to continue...<h2>`);
            console.error('Error \n')
    }
    response.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});