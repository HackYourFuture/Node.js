'use strict';

const chalk = require('chalk');
const helpMessages = require('./helpMessages');

function listTodos(allTodos) {
  if (allTodos.length === 0) {
    console.log('no todos yet, start by adding one');
    console.log(helpMessages.add);
  } else {
    console.log('your todos are:');
    allTodos.forEach((todo, index) => {
      console.log(
        `  ${chalk.cyan(index + 1)}- ${todo.task} ${
          todo.done === 'done'
            ? chalk.green.bold(todo.done)
            : chalk.magenta.bold(todo.done)
        }`
      );
    });
  }
}

module.exports = listTodos;
