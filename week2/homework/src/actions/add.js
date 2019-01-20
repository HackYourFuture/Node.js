'use strict';

const fs = require('fs');
const readAndParseTodos = require('./readAndparse');

let add = (todo) => {
  const parsedTodos = readAndParseTodos()
  console.log(parsedTodos);
  parsedTodos.push({
    todo: todo
  });
  const stringifiedTodos = JSON.stringify(parsedTodos)
  fs.writeFileSync('todos.json', stringifiedTodos);
  console.log(`  you add the new todo :  ${todo}`);
};

module.exports = add;