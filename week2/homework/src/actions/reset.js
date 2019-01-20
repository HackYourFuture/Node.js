'use strict';

const fs = require('fs');
let reset = () => {
  fs.writeFileSync('todos.json', ' ');
};
module.exports = reset;
