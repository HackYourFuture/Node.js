const http = require('http');

const server = http.createServer((req, res) => {
	if (req.url === '/') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(`<html>
		<head>
		<link rel="stylesheet" type="text/css" href="style.css" />
		<title>My First Web Server</title>
		</head>
		<body>
		  <h1>Hello, anyone there?</h1>
		  <div id="content"></div>
		  <script src="script.js"></script>
		</body>
	  </html>
             `);
	} else if (req.url === '/app.js') {
		res.writeHead(200, { 'Content-Type': 'application/javascript' });
		res.write(`document.getElementById('content')
		.appendChild(document.createTextNode('Welcome to Server-land!'));`);
	} else if (req.url === '/style.css') {
		res.writeHead(200, { 'Content-Type': 'text/stylesheet' });
		res.write(`body{ text-align: center; }  #content {color: blue}`);
	}

	res.end();
});
const PORT = 3000;

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});