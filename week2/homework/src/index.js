'use strict';

const app = require('commander');
const help = require('./help');
const listTodos = require('./list');
const reset = require('./reset');
const addTodo = require('./add');
const removeTodo = require('./remove');
const updateTodo = require('./update');

const appendArgs = wordsWithoutQuotes => {
  let result = '';
  for (const item of wordsWithoutQuotes) {
    result += ' ' + item;
  }
  return result.trim();
};

app.version('0.1.0', '-v, --version');

app
  .command('help')
  .description('Display custom help')
  .action(help);

app
  .command('list')
  .description('List all todos')
  .action(listTodos);

app
  .command('add <newTodo> [wordsWithoutQuotes...]')
  .description('Add a new Todo')
  .action((newTodo, wordsWithoutQuotes) => {
    const args = appendArgs(wordsWithoutQuotes);
    newTodo += ' ' + args;
    addTodo(newTodo);
  });

app
  .command('remove <index>')
  .description('Remove todo at specified index')
  .action(index => removeTodo(index));

app
  .command('reset')
  .description('Remove all todos from the list')
  .action(reset);

app
  .command('update <todoIndex> <updatedValue> [wordsWithoutQuotes...]')
  .description('Update a todo at a specified index')
  .action((todoIndex, newValue, wordsWithoutQuotes) => {
    const args = appendArgs(wordsWithoutQuotes);
    newValue += ' ' + args;
    updateTodo(todoIndex, newValue);
  });

app.parse(process.argv);

if (!app.args.length) {
  console.log('You should write a command after index.js See below:');
  help();
}
