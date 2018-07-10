'use strict';

const chalk = require('chalk');
const listTodos = require('./listTodos');
const storeTodos = require('./storeTodos');

const args = process.argv.slice(2);

function updateTodo(userIndexInput, allTodos) {
  if (userIndexInput > allTodos.length || userIndexInput < 1) {
    console.log(`${chalk.red("didn't find a todo with that index")}`);
    listTodos(allTodos);
  } else if (args[2] === undefined) {
    console.log('enter something todo after the index');
  } else {
    const oldTodo = allTodos[userIndexInput - 1].task;
    const newTodo = allTodos[userIndexInput - 1];
    newTodo.task = args[2];
    newTodo.done = 'not done';
    storeTodos(allTodos);
    console.log(
      `updated '${chalk.red(oldTodo)}' with '${chalk.cyan(args[2])}'`
    );
  }
}

module.exports = updateTodo;
