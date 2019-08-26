'use strict';

const inquirer = require('inquirer');
const todoList = require('./todoList');

const question = [
  {
    type: 'confirm',
    name: 'toDelete',
    message: `!!!This will delete all tasks !!!\nAre you sure?`,
    default: false
  }
];

try {
  inquirer.prompt(question).then(answer => {
    if (answer.toDelete) {
      todoList.reset();
      console.log('All tasks are deleted.');
    }
  });
}
 catch (error) {
  console.log(error.message);
}
