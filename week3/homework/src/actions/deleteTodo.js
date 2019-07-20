'use strict';

const { readTodos, saveTodos } = require('./index');

function deleteTodo(req, res) {
  return new Promise((resolve, reject) => {
    readTodos()
      .then(todos => {
        const newTodos = todos.filter(todo => todo.id !== req.params.id);
        saveTodos(newTodos);
        resolve();
      })
      .catch(error => reject(error));
  });
}

module.exports = deleteTodo;
