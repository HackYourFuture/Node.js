'use strict';

const { loadToDos, saveToDo, logScreen } = require('./Util');

const removeToDo = async order => {
  const todos = await loadToDos();
  const keepToDos = todos.filter(todo => todo.index !== order);
  if (todos.length > keepToDos.length) logScreen('To-do removed!', 'green');
  else logScreen('To-do not found!', 'red');
  saveToDo(keepToDos);
};

module.exports = removeToDo;
