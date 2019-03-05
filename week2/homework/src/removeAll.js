'use strict';

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    File System
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const fs = require('fs');

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    CRUD 'deletes all items'
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const tasksText = fs.readFileSync('./toDos.json', 'utf8');
let tasksList = JSON.parse(tasksText);
const removeAll = () => {
  tasksList = '[]';
  fs.writeFile('./toDos.json', tasksList, err => {
    if (err) throw err;
  });
  console.log('To-Dos list is reset');
};

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    Module Exports
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

module.exports = removeAll;
