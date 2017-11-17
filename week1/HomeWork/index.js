let http = require('http');
const port = 3000;
var state = 10; 

let server = http.createServer( (request, response) => {

   if(request.url === "/state") {
	   response.write(String(state));
   }
   else if(request.url === "/add") {
	   state++;
	   response.write(String(state));
   }
   else if(request.url === "/remove") {
	   state--;
	   response.write(String(state));
   }
   else if(request.url === "/reset") {
	   state = 10;
	   response.write(String(state));
   }
   else{
	   response.write("Not found! , Please check the url path");
   }
   
   response.end()

});

server.listen(port , ()=>{
	console.log(`The nodejs server is now listening on ${port}`);
});
