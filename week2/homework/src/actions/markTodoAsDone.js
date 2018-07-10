'use strict';

const chalk = require('chalk');
const listTodos = require('./listTodos');
const storeTodos = require('./storeTodos');

function markTodoAsDone(userIndexInput, allTodos) {
  if (userIndexInput > allTodos.length || userIndexInput < 1) {
    console.log(`${chalk.red("didn't find a todo with that index")}`);
    listTodos(allTodos);
  } else {
    const userDoneInput = allTodos[userIndexInput - 1];
    if (userDoneInput.done === 'done') {
      console.log(
        `${chalk.inverse(
          `you've already marked '${userDoneInput.task}' as done`
        )}`
      );
    } else {
      userDoneInput.done = 'done';
      console.log(
        `Successfully marked '${chalk.cyan(userDoneInput.task)}' as done`
      );
      storeTodos(allTodos);
    }
  }
}

module.exports = markTodoAsDone;
