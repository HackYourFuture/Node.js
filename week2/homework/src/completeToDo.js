'use strict';

const { loadToDos, saveToDo, logScreen } = require('./Util');
const completeToDo = async order => {
  const todos = await loadToDos();
  const todo = todos.find(todo => todo.index === order);
  if (todo) {
    todos[order - 1].complete = '✔';
    logScreen(`${order}. to-do is completed!`, 'green');
  }
 else {
    logScreen(`${order} .to-do is not in the list`, 'red');
  }
  saveToDo(todos);
};

module.exports = completeToDo;
