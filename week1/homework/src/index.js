'use strict';

// Write the homework code in this file
const http = require('http');

const handleRequest = require('./handleRequest');

const server = http.createServer(handleRequest);

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
