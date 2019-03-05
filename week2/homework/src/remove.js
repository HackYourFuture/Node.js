'use strict';

/** ---------------------------------------
     Base
 ---------------------------------------- */
const fs = require('fs');

/** ---------------------------------------
     Function for Command
 ---------------------------------------- */
const remove = {
  execute: toDoNumber => {
    const content = fs.readFileSync('To-Do Database.json', 'utf8');
    const toDoIndex = toDoNumber - 1;
    if (!content) {
      console.log('There is nothing to remove !');
    } else {
      fs.readFile('To-Do Database.json', 'utf8', (err, readData) => {
        if (err) throw err;
        const parsedJSON = JSON.parse(readData);
        const arrayLength = parsedJSON.length;
        if (toDoNumber < 0 || toDoNumber > arrayLength - 1) {
          console.log(`To-Do #${toDoNumber} is not available !`);
        } else {
          parsedJSON.splice(toDoIndex, 1);
          fs.writeFile('To-Do Database.json', JSON.stringify(parsedJSON), err => {
            if (err) throw err;
            console.log(`To-Do #${toDoNumber} is removed !`);
          });
        }
      });
    }
  },
};

/** ---------------------------------------
     Exports
 ---------------------------------------- */
module.exports = remove;
