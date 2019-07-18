'use strict';
const fs = require('fs');
const readTodos = require('./readTodos');
const fileName = './src/data.json';

async function deleteTodo(id) {
  const todos = await readTodos();
  const newTodos = todos.filter(item => item.id !== id);
  return fs.writeFile(fileName, JSON.stringify(newTodos, null, 2), error => {
    if (error) {
      console.log(error);
    }
  });
}
module.exports = deleteTodo;
