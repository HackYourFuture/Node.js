/* eslint-disable no-constant-condition */
'use strict';

const fs = require('fs');
const readAndParseTodos = require('./readAndparse');
let removeAll = () => {
  let parsedTodos = readAndParseTodos();
  parsedTodos.length = 0;
  fs.writeFileSync('todos.json', '[]');
}

module.exports = removeAll;