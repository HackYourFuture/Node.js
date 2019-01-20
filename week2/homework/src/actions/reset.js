'use strict';

const fs = require('fs');

let reset = () => {
  fs.writeFileSync('todos.txt', '');
};
module.exports = reset;