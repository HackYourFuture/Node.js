'use strict';

/** ~~~~~~~~~~~~~~~~~~~~~~~~~
    File System
 ~~~~~~~~~~~~~~~~~~~~~~~~~~ */

const fs = require('fs');

/** ~~~~~~~~~~~~~~~~~~~~~~~~~
    CRUD 'shows list'
 ~~~~~~~~~~~~~~~~~~~~~~~~~~ */

const list = () =>
  fs.readFile('toDos.txt', 'utf8', err => {
    if (err) throw 'Something went wrong.' + err;
  });

/** ~~~~~~~~~~~~~~~~~~~~~~~~~
    Module Exports
 ~~~~~~~~~~~~~~~~~~~~~~~~~~ */

module.exports = list;
