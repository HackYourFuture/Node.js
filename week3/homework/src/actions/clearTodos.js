'use strict';

const saveTodos = './index';

function clearTodos(todos) {
  return new Promise((resolve, reject) => {
    const todos = [];
    saveTodos(todos)
      .then(resolve)
      .catch(error => reject(error));
  });
}
module.exports = clearTodos();
