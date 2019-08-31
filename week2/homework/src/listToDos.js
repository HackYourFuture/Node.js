'use strict';

const { loadToDos, logScreen } = require('./Util');
const chalk = require('chalk');

const listToDos = async() => {
  const todos = await loadToDos();
  logScreen('\nYour to-dos\n', 'yellow');
  if (todos.length === 0) return logScreen('\nThere is not any to-do\n', 'red');
  todos.forEach(todo => {
    if (todo.complete === '✔')
      logScreen(todo.index + '. ' + todo.body + '. ' + chalk.green('  ') + '  \n', 'white');
    else logScreen(todo.index + '. ' + todo.body + '. ' + chalk.red('  ') + '  \n', 'white');
  });
};

module.exports = listToDos;
