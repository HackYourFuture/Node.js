var fs = require('fs');
var http = require('http');

var port = 8080;
var server = http.createServer(handleRequest);

function handleRequest (req, res) {
	// console.log(req.url);
	switch (req.url) {
		case '/':
			fs.readFile(__dirname + '/index.html', 'utf-8', function (error, data) {
				if (error) {
					res.writeHead(500);
					res.write('Could not open file');
				} else {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write(data);
				}
				res.end();
			});			
			console.log('root');
			break;
		default :
			console.log("url: " + req.url + ", method: " + req.method);
			res.writeHead(200, {'Content-Type': 'application/json'});
			// res.write('{"1":"make tea","2":"do dishes","3":"go shopping"}');
			// res.write('{}');
			res.end();
	}
}

server.listen(port, function (error) {
	if (error) {
		console.log(error);
	} else {
		console.log('listening on port 8080');
	}

});