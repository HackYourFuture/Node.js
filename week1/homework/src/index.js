'use strict';

const { createServer } = require('./server');

const PORT = 4000;

createServer().listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
