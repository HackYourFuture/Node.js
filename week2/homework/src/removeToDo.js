'use strict';

const { loadToDos, saveToDo, logScreen } = require('./Util');

const removeToDo = async order => {
  const todos = await loadToDos();
  const filtered = todos.filter(todo => todo.index !== order);
  if (todos.length > filtered.length) logScreen('To-do removed!', 'green');
  else logScreen('To-do not found!', 'red');
  saveToDo(filtered);
};

module.exports = removeToDo;
