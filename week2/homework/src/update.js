'use strict';

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    File System
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const fs = require('fs');

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    CRUD 'replace item'
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const tasksText = fs.readFileSync('./toDos.json', 'utf8');
const tasksList = JSON.parse(tasksText);
const update = index => {
  if (index > tasksList.length) {
    console.log('The index you entered in not assigned to a task yet');
  } else if (process.argv.length < 5) {
    console.log(' Wrong command type help to check the commands available');
  }
  let task = '';
  for (let i = 4; i <= process.argv.length - 1; i++) {
    task += process.argv[i] + ' ';
  }
  tasksList.splice(index - 1, 1, task);
  console.log(" 'Chosen task is updated successfully' ");
  fs.writeFile('./toDos.json', JSON.stringify(tasksList, null, 2), err => {
    if (err) throw err;
  });
};

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    Module Exports
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

module.exports = update;
