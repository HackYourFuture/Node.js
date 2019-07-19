'use strict';

const { readTodos, saveTodos } = './index';

function markAsNotDone(req, res) {
  return new Promise((resolve, reject) => {
    readTodos().then(todos => {
      const todoItem = todos.find(todo => todo.id === req.params.id);
      if (!todoItem) {
        reject(new Error('No item found!'));
      }
      else {
        todoItem.done = 'false';
        saveTodos(todos);
        resolve();
      }
    });
  });
}

module.exports = markAsNotDone();
