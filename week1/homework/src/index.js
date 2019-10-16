'use strict';

const http = require('http');

const handleRequest = require('./server');

const PORT = 3000;

http.createServer(handleRequest).listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
