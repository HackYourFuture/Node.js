'use strict';

const { createServer } = require('./server');

createServer().listen(3001, () => {
  console.log(`Server listening on http://localhost:3001`);
});
