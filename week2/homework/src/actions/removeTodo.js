'use strict';

const chalk = require('chalk');
const listTodos = require('./listTodos');
const storeTodos = require('./storeTodos');

function removeTodo(userIndexInput, allTodos) {
  if (
    userIndexInput > allTodos.length ||
    userIndexInput < 1 ||
    !userIndexInput
  ) {
    console.log(
      `${chalk.red(
        "didn't find a todo with that index, or no index was specified"
      )}`
    );
    listTodos(allTodos);
  } else {
    const oldTodo = allTodos[userIndexInput - 1].task;
    allTodos.splice(userIndexInput - 1, 1);
    console.log(`successfully removed '${chalk.cyan(oldTodo)}'`);
    storeTodos(allTodos);
  }
}

module.exports = removeTodo;
