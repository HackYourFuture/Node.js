'use strict';

const { createServer } = require('./server');

const PORT = 3000;

createServer().listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}/`);
});
