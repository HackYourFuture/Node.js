/* eslint-disable indent */
const fs = require('fs');
const chalk = require('chalk');
const log = console.log;
let todoList = [];

const list = () => {
  todoList = JSON.parse(fs.readFileSync('todoList.json'));
  if (todoList.length === 0) {
    console.log(`There is nothing to show on ${todoList}, please add some tasks`);
  }
 else {
    console.log(todoList);
  }
};

const add = todo => {
  try {
    todoList = JSON.parse(fs.readFileSync('todoList.json'));
    console.log(`${todo} is added to your todo list`);
    todoList.push({ todo });

    fs.writeFileSync('todoList.json', JSON.stringify(todoList));
  }
 catch (err) {
    throw Error(err);
  }
};

const remove = index => {
  todoList = JSON.parse(fs.readFileSync('todoList.json'));
  todoList.splice(index - 1, 1);
  console.log(`The item in the ${index} place has been removed`);
  fs.writeFileSync('todoList.json', JSON.stringify(todoList));
};

const reset = () => {
  try {
    todoList = JSON.parse(fs.readFileSync('todoList.json'));
    todoList.length = 0;
    fs.writeFileSync('todoList.json', JSON.stringify(todoList));
  }
 catch (e) {
    console.log('Failed resetting JSON file');
  }
};

const help = () => {
  log(chalk.magenta('Welcome to this small cli version 0.0.1'));
  log(chalk.bgCyan.bold('Commands:'));
  log(chalk.yellow('help') + ' => Executes all the available commands');
  log(chalk.yellow('list') + " => show currents to-do's");
  log(chalk.yellow('add --todo="(your task)"') + '  => adds a task to your list');
  log(
    chalk.yellow('remove --todo= --task number--') + " => removes the task that you're targeting"
  );
  log(chalk.yellow('reset') + ' => resets the todolist');
};
module.exports = {
  add,
  remove,
  list,
  reset,
  help
};
