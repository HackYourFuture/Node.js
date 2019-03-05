'use strict';

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    File System
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const fs = require('fs');

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    CRUD 'deletes item'
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const tasksText = fs.readFileSync('./toDos.json', 'utf8');
const tasksList = JSON.parse(tasksText);
const removeLine = index => {
  if (index > tasksList.length || index === 0) {
    console.log('This index is not assigned to a task. type list to see the listed tasks');
  } else if (process.argv.length < 4) {
    console.log('Wrong command type help to check the commands available');
  } else {
    tasksList.splice(index - 1, 1);

    fs.writeFile('./toDos.json', JSON.stringify(tasksList), err => {
      if (err) throw err;
    });
    console.log('Task has been deleted');
  }
};

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    Module Exports
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

module.exports = removeLine;
