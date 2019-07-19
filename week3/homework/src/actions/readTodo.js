'use strict';

const fs = require('fs');
const path = '../todos.json';

function readTodo(req, res) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, todos) => {
      if (error) {
        reject(error);
      }
      else {
        const parsedTodos = JSON.parse(todos);
        const todo = parsedTodos.filter(todo => todo.id === req.params.id);
        resolve(todo);
      }
    });
  });
}
module.exports = readTodo;
