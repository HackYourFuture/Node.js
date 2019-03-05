'use strict';

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    File System
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const fs = require('fs');

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    CRUD 'shows list'
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const tasksText = fs.readFileSync('./toDos.json', 'utf8');
const tasksList = JSON.parse(tasksText);

const list = () => {
  if (tasksList.length == 0) {
    console.log('to-Dos list is yet empty. Add tasks first');
  } else {
    tasksList.forEach(task => {
      console.log(task);
    });
  }
};

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    Module Exports
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

module.exports = list;
