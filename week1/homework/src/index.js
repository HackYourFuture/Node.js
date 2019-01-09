'use strict';

const {
  createServer
} = require('./server');

const PORT = 3010;

createServer().listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
