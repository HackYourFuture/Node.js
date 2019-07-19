'use strict';
const { readTodos, saveTodos } = './index';

function updateTodo(req, res) {
  return new Promise((resolve, reject) => {
    readTodos()
      .then(todos => {
        const todoItem = todos.find(todo => todo.id === req.params.id);
        if (!todoItem) {
          reject(new Error('No item found!'));
        }
        else {
          const { todo } = req.body;
          todoItem.description = todo.description;
          saveTodos(todos);
          resolve();
        }
      })
      .catch(error => reject(error));
  });
}
module.exports = updateTodo();
