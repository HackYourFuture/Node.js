let http = require('http')
const port = 3000;
let state = 10 ;

let server = http.createServer( (request, response) => {

  if (request.url === "/"){
      response.write("you requested root path");
    } else if (request.url === "/state" ){
      response.write(`your state is ${state}`);
    } else if (request.url === "/add"){
      state += 1;
      response.write(`your state is ${state}`);
    } else if (request.url === "/remove"){
      state -= 1;
      response.write(`your state is ${state}`);
    } else if (request.url === "/reset"){
      state = 10;
      response.write(`your state is ${state}`);
    } else response.write(`${request.url} is not found`);
   response.end()
});

server.listen(port, () =>{
  console.log(`the node server is now listening on the port ${ port }`)
});