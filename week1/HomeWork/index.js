const http = require('http');
const port = 2000
let state = 10;

const server = http.createServer((request, response) => {

     console.log(`I have received a request for path: ${ request.url }`);
     response.writeHead(200, {
          'Content-Type': 'text/html'
     });
     if (request.url === "/") {
          response.write(`<h1>You requested root path.</h1>`);
     } else if (request.url === "/state") {
          response.write(`<h1>You requested the path: ${ request.url }</h1><h2>State: ${state}</h2>`);
     } else if (request.url === "/add") {
          state += 1;
          response.write(`<h1>You requested the path: ${ request.url }</h1><h2>State: ${state}</h2>`);
     } else if (request.url === "/remove") {
          state -= 1;
          response.write(`<h1>You requested the path: ${ request.url }</h1><h2>State: ${state}</h2>`);
     } else if (request.url === "/reset") {
          state = 10;
          response.write(`<h1>You requested the path: ${ request.url }</h1><h2>State: ${state}</h2>`);
     } else {
          response.writeHead(404, {
               'Content-Type': 'text/html'
          });
}
response.end();
});


server.listen(port, () => {
     console.log(`The nodejs server is now listening on port ${ port }`)
});
