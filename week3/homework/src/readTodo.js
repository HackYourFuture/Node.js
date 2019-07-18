'use strict';

const readTodos = require('./readTodos');

function readTodo(id) {
  return new Promise(resolve => {
    readTodos().then(todos => {
      const todo = todos.filter(item => item.id === id);
      if (todo == null) {
        console.log(`To-do with ID << ${id} >> does not exist`);
      }
      resolve(todo);
    });
  });
}
module.exports = readTodo;
