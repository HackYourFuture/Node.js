'use strict';

const { loadToDos, logScreen } = require('./Util');

const readToDo = async order => {
  const todos = await loadToDos();
  const todo = todos.find(todo => todo.index === order);
  if (todo) logScreen(todo.index + '. ' + todo.body, 'white');
  else logScreen("To-do wasn't found", 'red');
};

module.exports = readToDo;
