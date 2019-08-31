'use strict';

const { loadToDos, saveToDo, logScreen } = require('./Util');

const updateToDo = async (order, body) => {
  const todos = await loadToDos();
  const todo = todos.find(todo => todo.index === order);
  if (todo) {
    todos[order - 1] = { index: order, body, complete: '➖' };
    logScreen(`${order}. to-do is updated!`, 'green');
  }
 else logScreen(`${order}. to-do is not in the list`, 'red');
  saveToDo(todos);
};

module.exports = updateToDo;
