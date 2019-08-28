'use strict';

const { loadToDos, logScreen } = require('./Util');
const chalk = require('chalk');

const searchToDos = async term => {
  const todos = await loadToDos();
  const filtered = todos.filter(todo => todo.body.toLowerCase().includes(term));
  if (filtered.length === 0) return logScreen('\nNothing found!\n', 'red');
  filtered.forEach(todo => {
    if (todo.complete === '✔')
      logScreen(todo.index + '. ' + todo.body + '. ' + chalk.green('  ') + '  \n', 'white');
    else logScreen(todo.index + '. ' + todo.body + '. ' + chalk.red('  ') + '  \n', 'white');
  });
};

module.exports = searchToDos;
