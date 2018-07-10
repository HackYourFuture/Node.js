'use strict';

const chalk = require('chalk');
const helpMessages = require('./helpMessages');
const storeTodos = require('./storeTodos');

const args = process.argv.slice(2);

function addTodo(allTodos) {
  const userTodoInput = args[1];
  if (userTodoInput === undefined) {
    console.log(
      chalk.red('Error while adding a todo, see this:\n'),
      helpMessages.add
    );
  } else {
    allTodos.push({
      task: userTodoInput,
      done: 'not done'
    });
    storeTodos(allTodos);
    console.log(`added todo: '${chalk.cyan(userTodoInput)}'`);
  }
}

module.exports = addTodo;
