'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
	let state = 10;
	const increment= (i)=>{ i++;return i;};
	const decrement= (i)=> {i--;return i;};
	let director = new Object;
	director['/state'] = {'state':state};
	director['/'] = {'state':state};
	director['/reset'] = {'state':state};
	director['/add'] = {'state':increment(state)};
	director['/subtract'] = {'state':decrement(state)};

	function displayContent(request, response){
		response.writeHead(200, { 'Content-Type': 'application/json'});
		response.write(JSON.stringify(request, null, 2));
		response.end();
	}
	function displayError(request, response){
		response.writeHead(404, { 'Content-Type': 'application/json'});
		response.write(JSON.stringify({ 'error': 'Not found' }, null, 2));
		response.end();
	}
	const server = http.createServer((request, response) => {
		// TODO: Write your homework code here
		if(request.url in director){
			displayContent(director[request.url], response);
		}else{
			displayError(request,response);
		}    
	}); 
	return server;
}

module.exports = {
	createServer
};
