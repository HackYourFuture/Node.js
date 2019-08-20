'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const config = require('./config');

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
      fs.writeFileSync(config.DATA_FILE, JSON.stringify([], null, 2));
      console.log('All tasks are deleted.');
    }
  });
}
 catch (error) {
  console.log(error.message);
}
