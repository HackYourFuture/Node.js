'use strict'

const http = require('http');

const HTML= (`
<html>
  <head>
    <title>My First Web Server</title>
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>
  <body>
    <h1>Hello, anyone there?</h1>
    <div id="content"></div>
    <script src="script.js"></script>
  </body>
</html>`);


//create a server
let server = http.createServer(function(req, res) {
  if (req.url==='/script.js') {
    res.setHeader('Content-Type','text/javascript')
    let jsElement = (`document.getElementById('content').appendChild(document.createTextNode('Welcome to Server-land!'))`)
    res.write(jsElement)
  } else if (req.url === '/') {
    res.setHeader('Content-Type','text/html')
    res.write(HTML);
  } else if (req.url == '/style.css') {
    res.setHeader('Content-Type','text/css')
    res.write(`#content { color: blue }`)
  }
  res.end(); //end the response
});

server.listen(3000); //the server listens on port 3000

