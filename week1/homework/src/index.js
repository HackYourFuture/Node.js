'use strict';

const { createServer } = require('./server');
const PORT = 3050;

createServer(PORT).listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
