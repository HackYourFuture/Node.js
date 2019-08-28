'use strict';

const { loadToDos, saveToDo, logScreen } = require('./Util');

const resetToDos = async () => {
  const todos = await loadToDos();
  todos.length = 0;
  saveToDo(todos).then(() => logScreen('All to-dos has removed successfully!', 'green'));
};

module.exports = resetToDos;
