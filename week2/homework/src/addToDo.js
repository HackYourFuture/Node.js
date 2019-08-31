'use strict';

const { loadToDos, saveToDo, logScreen } = require('./Util');

const addToDo = async(body, complete) => {
  const todos = await loadToDos();
  todos.push({ index: 1, body, complete });
  saveToDo(todos).then(() => logScreen('New to-do added!', 'green'));
};

module.exports = addToDo;
