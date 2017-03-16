var fs = require('fs');
var express = require('express')

var app = express();

app.get('/todos', function(req, res) {
	res.send({label:'sometodo'})
})

var port = 8080;

app.listen(port, function(err) {
	if (err) return console.error(err)
	console.log('Listing to port', port)
})
