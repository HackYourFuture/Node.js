'use strict';

const { createServer } = require('./server');
const PORT = 3000;

createServer(3000).listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
