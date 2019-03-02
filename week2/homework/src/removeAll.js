'use strict';

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    File System
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const fs = require('fs');

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    CRUD 'deletes all items'
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const removeAll = () => {
  fs.readFile('toDos.txt', 'utf8', (err, data) => {
    if (err) {
      throw 'Something went wrong.' + err;
    } else {
      data.splice(0, userInput.length);
    }
  });
  fs.writeFile('toDo.txt', data, 'utf8', err => {
    if (err) {
      throw 'Something went wrong.' + err;
    } else {
      console.log('list has been deleted successfully.');
    }
  });
};

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    Module Exports
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

module.exports = removeAll;
