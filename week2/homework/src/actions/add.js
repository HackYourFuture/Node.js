'use strict';

const fs = require('fs');
const readAndParseTodos = require('./readAndparse');
const todo = process.argv[3];
let add = () => {
  const parsedTodos = readAndParseTodos();
  parsedTodos.push({
    todo: todo
  });
  const stringifiedTodos = JSON.stringify(parsedTodos);
  fs.writeFileSync('todos.json', stringifiedTodos);
  console.log(`  you add the new todo : \n -- ${todo}`);
};

module.exports = add;
