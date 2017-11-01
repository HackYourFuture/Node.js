const http = require('http');
const port = 3000;
let state = 10;
let server = http.createServer((request, response)=>{
	
	
	if (request.url === "/add"){
		state +=1
		response.write(`<h1>The state is : </h1><h2>${state}</h2>`)

	}else if (request.url === "/remove"){
		state -=1
		response.write(`<h1>The state is : </h1><h2>${state}</h2>`)
	
	}else if (request.url === "/reset"){
		state = 10
		response.write(`<h1>The state is : </h1><h2>${state}</h2>`)
		
	}else if (request.url === "/state"){
		response.write(`<h1>The state is :</h1><h2>${state}</h2>`)
		
	}else{
		response.write(`<h1> Error 404 Invalid Request!</h1>`)
		
	}
	response.end();
});
server.listen(port, () => {
     console.log(`Node.js web server at port ${ port } is running..`)
});
