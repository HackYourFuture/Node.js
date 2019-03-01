'use strict';

/** ---------------------------------------
     Base
 ---------------------------------------- */
const fs = require('fs');

/** ---------------------------------------
     Function for Command
 ---------------------------------------- */
const reset = {
  execute: () => {
    const content = fs.readFileSync('To-Do Database.json', 'utf8');
    switch (content) {
      case '':
        console.log('There is nothing to remove !');
        break;
      default:
        fs.writeFile('To-Do Database.json', '', err => {
          if (err) throw err;
          console.log('To-Dos Removed !');
        });
    }
  }
};

/** ---------------------------------------
     Exports
 ---------------------------------------- */
module.exports = reset;
