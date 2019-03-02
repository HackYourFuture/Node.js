'use strict';

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    File System
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const fs = require('fs');

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    CRUD 'deletes item'
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const removeLine = index => {
  fs.readFile('toDos.txt', 'utf8', (err, data) => {
    if (err) {
      throw 'Something went wrong.' + err;
    } else {
      data.splice(index - 1, 1);
    }
  });
  fs.writeFile('toDo.txt', data, 'utf8', err => {
    if (err) {
      throw 'Something went wrong.' + err;
    } else {
      console.log('Item has been deleted successfully.');
    }
  });
};

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    Module Exports
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

module.exports = { removeLine };
