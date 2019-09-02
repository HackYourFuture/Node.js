'use strict';

// TODO: Write the homework code in this file
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ test: 'It is working!' }));
  res.end();
});

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
