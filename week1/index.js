'use strict';

const http = require("http");

const server = http.createServer(() => {

	// console.log("Creating a new server");
});

server.on('connection', () => {

	// console.log("Connected");

});

server.on('clientError', (err, socket) => {

	if (err)

		socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.on('request', (req, res) => {

	console.log("request", req.url);

	let state = 10;

	if (req.url === "") {


		req.url = window.location = "http://username.wix.com/sitename#/!page-url/123456";

		console.log("request", req.url);
		res.setHeader('content-type', 'text/html');
		res.write(`<h1> ${req.url} </h1>`);
		res.end();


	}


	if (req.url === "/state") {

		req.url = state;
		console.log("request", req.url);
		res.setHeader('content-type', 'text/html');
		res.write(`<h1> ${req.url} </h1>`);



	}

	else if (req.url === "/add") {

		state += 1;
		res.setHeader('content-type', 'text/html');
		res.write(`<h1> OK : ${state} </h1>`);

	}


	else if (req.url === "/remove") {

		state -= 1;
		res.setHeader('content-type', 'text/html');
		res.write(`<h1> OK : ${state} </h1>`);

	}

	else if (req.url === "/reset") {

		req.url = state;
		res.setHeader('content-type', 'text/html');
		res.write(`<h1> OK : ${req.url} </h1>`);

	}
	else if (req.url === "/") {

		res.status(404).send();

	}


	res.end();


});

const PORT = 4000;


server.listen(PORT, () => {

	// console.log("listening on", PORT);

});
