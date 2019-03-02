'use strict';

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    File System
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const fs = require('fs');

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    CRUD 'replace item'
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const update = (index, text) => {
  fs.readFile('toDos.txt', 'utf8', (err, data) => {
    if (err) {
      throw 'Something went wrong.' + err;
    } else {
      data = data.splice(index - 1, 1, `\n${text.join(' ')}`);
      fs.writeFile('toDo.txt', text, 'utf8', err => {
        if (err) {
          throw 'Something went wrong.' + err;
        } else {
          console.log('list has been updated successfully.');
        }
      });
    }
  });
};

/**~~~~~~~~~~~~~~~~~~~~~~~~~
    Module Exports
 ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

module.exports = update;
