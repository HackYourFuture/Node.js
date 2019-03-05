'use strict';

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    File System
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const fs = require('fs');

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    CRUD 'adds item to list'
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const tasksText = fs.readFileSync('./toDos.json', 'utf8');
const tasksList = JSON.parse(tasksText);
const add = () => {
  if (process.argv.length < 4) {
    console.log('Wrong command type help to check the commands available');
  } else {
    let newTask = '';
    for (let i = 3; i <= process.argv.length - 1; i++) {
      newTask += process.argv[i] + ' ';
    }
    tasksList.push(newTask);
    console.log('Task has been added');
    fs.writeFile('./toDos.json', JSON.stringify(tasksList, null, 2), err => {
      if (err) throw err;
    });
  }
};

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    Module Exports
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

module.exports = add;
