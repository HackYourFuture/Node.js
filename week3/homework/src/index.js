'use strict';

// TODO: Write the homework code in this file
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
