'use strict';

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    File System
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const fs = require('fs');

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    CRUD 'adds item to list'
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const add = text => {
  fs.readFile(
    'toDos.txt',
    'utf8',
    (err,
    data => {
      if (err) {
        throw 'Something went wrong.' + err;
      } else {
        text += data;
      }
    }),
  );

  fs.writeFile('toDo.txt', text, 'utf8', err => {
    if (err) {
      throw 'Something went wrong.' + err;
    } else {
      console.log('Item has been added successfully.');
    }
  });
};

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    Module Exports
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

module.exports = add;
